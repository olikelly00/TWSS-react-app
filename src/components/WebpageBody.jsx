import React from 'react';
import {useEffect, useState} from 'react';
import "./WebpageBody.css";



// This function returns the main body of the webpage, including the search field for user input and search results / no results message. 

export default function WebpageBody() {

    const [quoteData, setQuoteData] = useState([]);
    const [requestFailed, setRequestFailed] = useState(false);
    const [quotesAreFiltered, setQuotesAreFiltered] = useState(false);
    const [loadingState, setLoadingState] = useState(false)

    const [filteredQuotes, setFilteredQuotes] = useState([]);

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




// This function returns a filered list of quotes based on the user's search terms


const filterResults = (quoteArray, searchTerm) => {
    return quoteArray.filter(quote => 
        quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(quote.birth_year).includes(searchTerm) ||
        quote.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
};


    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value)
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoadingState(true)
        setTimeout(() => {
            const results = filterResults(quoteData, search)
        setFilteredQuotes(results);
        setLoadingState(false)
        }, 2000);

    };

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


// This function returns all the quotes (if no search terms have been given by the user) or any quotes that match the user's search parameters. 

function QuoteContainer({quotes}) {

        return (
        <>
        {quotes.map((quote, index) => (
            <div key={index} className="quoteContainer">
                <div className="quoteItem">
                    <p>{quote.quote}</p>
                    <p className="quoteAuthor"><strong>{quote.author} (b. {quote.birth_year})</strong>, {quote.description}</p>
                    </div>
                </div>

            ))}
            
        </>
        
    )
}

// This function returns a 'no results' message and is rendered if no quotes matching the user's search criteria are found. 

function NoResults() {
    return (
        <>
        <h4>Sorry, we don't have quotes for that yet 😔 </h4>
        <p>Why not try another search?</p></>
    )
}


function Loading() {
    return (
        <>
        <h4>Bear with us.</h4>
        <p>We're putting together our favourite quotes for you.</p>
        </>
    )
}

function RequestFailed() {
    return (
        <>
        <h4>It's not you, it's us. 😬</h4>
        <p>Sorry, we're having some trouble getting quotes right now. Please try again later.</p>
        </>
    )
}