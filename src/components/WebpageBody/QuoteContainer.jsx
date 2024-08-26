import "./QuoteContainer.css"

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


export default QuoteContainer;