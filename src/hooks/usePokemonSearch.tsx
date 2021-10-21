import React, { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {

    const [isFetching, setIsFetching] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    
    const loadPokemons = async () => {
        const res = await pokemonApi.get<PokemonPaginatedResponse>( 'https://pokeapi.co/api/v2/pokemon/?limit=1200');
        mapPokemonList( res.data.results );
        
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
        setSimplePokemonList(newPokemonList);
        setIsFetching(false);
    }

    useEffect(() => {

        loadPokemons()

    }, [])

    return {
        isFetching,
        simplePokemonList,
        
    }
}
