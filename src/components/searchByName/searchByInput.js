import React, {useState} from 'react'

import './searchByInput.scss';

function SearchByInput({setLoading, checkCountry}) {
    const [searchInputValue, setSearchInputValue] = useState('');
    return (
        <div className="app__search">
            <input 
                placeholder='Search a city' 
                type="text" 
                className="app__input" 
                onChange={e => {
                    setSearchInputValue(e.target.value)
                    e.target.value = e.target.value.replace(/[^a-zA-Z- ]/g, '')
                }}/>
            <button 
                className="app__submit" 
                onClick={() => {
                    setLoading(true);
                    checkCountry(searchInputValue);
                }}>SEARCH</button>
        </div>
    )
}

export default SearchByInput