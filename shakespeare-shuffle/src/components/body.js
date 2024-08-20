import React from 'react';
import {useState} from 'react';
import quotes from "../quotes.json";
import "./body.css";

const filterResults = (searchTerm) => {

    return quotes.filter(quote => 
        quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(quote.birth_year).includes(searchTerm) ||
        quote.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export default function WebpageBody() {

    const [search, setSearch] = useState("");
    const [filteredQuotes, setFilteredQuotes] = useState(quotes);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value)
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        const results = filterResults(search)
        setFilteredQuotes(results);
    };

    return (
        <>
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
       
        {filteredQuotes.length > 0 ? (
             <QuoteContainer quotes={filteredQuotes}/>) : (
        
        <NoResults />
        )}
        </section>
        </>
    )
}



export function QuoteContainer({quotes}) {

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

export function NoResults() {
    return (
        <>
        <p>Sorry, we don't have quotes for that yet 😔 Try another search.</p></>
    )
}
