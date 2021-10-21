import React, { useEffect, useState } from 'react'
import { Text, View, Platform, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';

import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

import { styles } from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets()
    const { isFetching, simplePokemonList } = usePokemonSearch()

    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])

    const [term, setTerm] = useState('')

    useEffect(() => {
        
        if ( term.length === 0) {
            return setPokemonFiltered([]);
        }

        // si no es un número.
        if ( isNaN( Number(term) ) ) {
            setPokemonFiltered(
                simplePokemonList.filter( 
                    (poke) => poke.name.toLocaleLowerCase().includes( term.toLocaleLowerCase() ) 
                )
            );  
        //si es un número       
        } else {
            const pokemonById = simplePokemonList.find(poke => poke.id === term );
            setPokemonFiltered(
                ( pokemonById ) ? [pokemonById] : []
            )
        }
         


    }, [term])

    if ( isFetching ) {
        return <Loading />
    }

    return (
        <View style={{ 
            flex: 1,
            // marginTop: (Platform.OS === 'ios') ? top : top + 10,
            marginHorizontal: 20 
        }}>
            
            <SearchInput 
                onDebouce={(value) => setTerm( value )}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: ( Platform.OS === 'ios' ) ? top: top + 20
                }}
            />

            <FlatList 
                    data={ pokemonFiltered }
                    keyExtractor={ (pokemon)=> pokemon.id }
                    showsVerticalScrollIndicator= { false }
                    numColumns={ 2 }

                    // Header
                    ListHeaderComponent={(
                        <Text style= {{ 
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 5,
                            marginBottom: top + 5,
                            paddingBottom: 10,
                            marginTop: ( Platform.OS === 'ios' ) ? top + 60 : top + 65
                        }}>{ term }</Text>
                    )}

                    renderItem={ ({ item }) => (
                        <PokemonCard pokemon={ item }/>
                    )}

                />

        </View>
    )
}

                    