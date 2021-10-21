import React, { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20')
    
    const loadPokemons = async () => {
        setIsLoading(true);
        const res = await pokemonApi.get<PokemonPaginatedResponse>( nextPageUrl.current );
        mapPokemonList( res.data.results );
        nextPageUrl.current = res.data.next; // toma los de la siguiente pag para procesarlos luego
        
    }

    const mapPokemonList = ( pokemonList: Result[] ) => {

        const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {

            // separa por slash 
            const urlParts =  url.split('/');
            const id = urlParts[ urlParts.length - 2 ];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`;
            
            return { id, picture, name }
        });

        // se modifica el estado de los viejos pokemones por los nuevos
        setSimplePokemonList([...simplePokemonList, ...newPokemonList ]);
        setIsLoading(false);
    }

    useEffect(() => {

        loadPokemons()

    }, [])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    }
}
