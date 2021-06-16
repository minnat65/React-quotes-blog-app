import QuoteForm from '../components/quotes/QuoteForm'
import { useHistory } from 'react-router-dom'
import { Fragment, useEffect } from 'react';
import { addQuote } from '../lib/api';
import useHttp from '../hooks/use-http'

const NewQuotes = () => {

    const { sendRequest, status} = useHttp(addQuote);
    
    const history = useHistory();

    useEffect(()=> {
        if(status === 'completed'){
            history.push('/quotes');
        }
    }, [status, history])

    const newQuoteHandler = (quoteData) => {
      
        sendRequest(quoteData)
        //history.push('/quotes'); //it will navigate to ALLQuotes page;

        //history.replace('/quotes'); //This will also navigate same as above
        //but replace method will replace the page means we cannot go back to NewQuote page again
    }
    return (
        <Fragment>
            
            <QuoteForm onAddQuote = {newQuoteHandler}/>
        </Fragment>

    )
}

export default NewQuotes;