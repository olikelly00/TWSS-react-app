
// This function returns a 'request failed' message and is rendered if the API call was unsuccessful. 

function RequestFailed() {
    return (
        <>
        <h4>It's not you, it's us. 😬</h4>
        <p>Sorry, we're having some trouble getting quotes right now. Please try again later.</p>
        </>
    )
}

export default RequestFailed;