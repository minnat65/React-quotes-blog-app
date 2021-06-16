import { Fragment, useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom'
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner'

const QuotesDetails = () => {
    const params = useParams();

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);
    
    //this hook will give us current url, path and params value
    const match = useRouteMatch();
    
    //const quote = DummyData.find(item => item.id === params.quoteId);
    //const path = `/quotes/${params.quoteId}/comments`;

    const { quoteId } = params;
    useEffect( ()=> {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if(status === 'pending'){
        return <LoadingSpinner />
    }

    if(error){
        return <p className='centered'>{error}</p>
    }

    return (
        <Fragment>

            <HighlightedQuote text={loadedQuote.text} 
            author={loadedQuote.author} 
            id={loadedQuote.id} />
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link to={`${match.url}/comments`} className='btn--flat'>Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    )
}

export default QuotesDetails;