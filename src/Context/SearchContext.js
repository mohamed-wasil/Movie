import React, { createContext, useEffect, useState } from 'react'

export const searchContext = createContext();
export default function SearchContextProvider({ children }) {
    const [searchResults, setSearchResults] = useState(null)
    const [searchWords, setSearchWords] = useState(null)
    const [searchType, setSearchType] = useState('movie')
    // tv , movie ,person

    useEffect(()=>{
        
    } , [searchType])
    return <>

        <searchContext.Provider value={ {searchResults , setSearchResults , setSearchType , searchType , setSearchWords ,searchWords}}>
            {children}
        </searchContext.Provider>

    </>
}
