import React, { useState } from 'react';
import '../../css/searchForm.css';

function SearchForm({ setSearchTerm, onSearch }) {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('')

    //Handle form submission
    async function handleSubmit(e) {

        e.preventDefault();
        if (!inputValue.trim()) {
            setError('Please enter a search term.');
            return;
        }
        setError('');
        try {
            if (onSearch) {
                //Handle search form 
                await onSearch(inputValue);
            }
            setInputValue('');
        } catch (error) {
            setError('An error occurred while searching. Please try again.');
        }
    }

    //Handle input change
    function handleChange(e) {
        const value = e.target.value;
        setInputValue(value);
        setSearchTerm(value);
        setError('');
    }

    return (
        <div id="search-form">
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                <input
                    name='searchTerm'
                    placeholder='Enter title'
                    value={inputValue}
                    onChange={handleChange}
                />
                <button type='submit'>Search</button>
            </form>
        </div>
    );
}


export default SearchForm;
