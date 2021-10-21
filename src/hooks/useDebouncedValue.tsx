import React, { useEffect, useState } from 'react'

export const useDebouncedValue = ( input: string = '', time: number = 500 ) => {
    
    const [debouncedValue, setDebouncedValue] = useState(input)

    //cada vez que el useEffect se dispara 
    // vuelve a crear una nueva instancia de un timeout la anterior la limpia
    useEffect(() => {
        
        const timeout = setTimeout(() => {
            setDebouncedValue( input );
        }, time ) 

        return () => {
            clearTimeout( timeout )
        }

    }, [input])
    
    return debouncedValue
}
