import React from 'react';
import {useEffect, useState} from 'react';
import "./WebpageBody.css";
import QuoteContainer from './QuoteContainer';
import NoResults from './NoResults';
import Loading from './Loading';
import RequestFailed from '../RequestFailed';

// This function returns the main body of the webpage, including the quotes retrieved from the API and a search field for user to filter quotes.

export default function WebpageBody() {

    const [quoteData, setQuoteData] = useState([]); // Full list of quotes from the API.

    const [filteredQuotes, setFilteredQuotes] = useState([]); // Filtered list of quotes according to user search input.

    const [search, setSearch] = useState(""); // User's search, to be rendered on-screen as they type into search bar. 

    const [quotesAreFiltered, setQuotesAreFiltered] = useState(false); // Dictates what to render depending on whether quotes are filter/unfiltered.

    const [loadingState, setLoadingState] = useState(false) // Dictates what to render depending on whether quotes are loading / have loaded.
    
    const [requestFailed, setRequestFailed] = useState(false); //  Dictates what to render if API call was unsuccessful. 
   
    
    // Make request to Quotes API. 
    // If successful, convert response into Javascript data and change any relevant state variables to update the UI. 
    // If unsuccessful, console.log the error and change the relevant state variable to update the UI

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:10000/quotes');
               
                let quoteData = await response.json();
                let quoteArray = JSON.parse(quoteData.payload)

                setQuoteData(quoteArray);
                setFilteredQuotes(quoteArray);
                setQuotesAreFiltered(true);
            } catch (error) {
                console.error('Error fetching quotes:', error);
                setRequestFailed(true);
            }
        };
        fetchData();
    }, []);


// Return an array containing only the quotes with terms matching the users' search. 


const filterResults = (quoteArray, searchTerm) => {
    return quoteArray.filter(quote => 
        quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(quote.birth_year).includes(searchTerm) ||
        quote.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
};


// When the user types in their search terms, they appear in real time on the screen.

const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value)
  }


// When the user submits their search terms, update the loading state, then render the filtered quotes once ready. 

const handleSubmit = (event) => {
    event.preventDefault();
    setLoadingState(true)
    setTimeout(() => {
        const results = filterResults(quoteData, search)
    setFilteredQuotes(results);
    setLoadingState(false)
    }, 1000);

};


// Return the HTML the user will see and interact with. 

    return (
        <section className="webpageBody"> 
            <p>Looking for something in particular? Search our treasure trove of quotes below:</p>
            <form className="searchForm" onSubmit={handleSubmit}> 
            <label>
                <input 
                className="searchBar"
                type="text" 
                name="search" 
                value={search} 
                onChange={(event) => handleSearch(event)}
                    />
            </label>
            <button className="submit-button" type="submit">Search</button>
            </form>
            
            {loadingState && <Loading/>}

            {requestFailed && <RequestFailed />}
          
            
        
            {!loadingState && !requestFailed && (
                quotesAreFiltered ? (
                    filteredQuotes.length > 0 ? (
                        <QuoteContainer quotes={filteredQuotes} />
                    ) : (
                        <NoResults />
                    )
                ) : (
                    <QuoteContainer quotes={quoteData} />
                )
            )}
        </section>
    )
}


