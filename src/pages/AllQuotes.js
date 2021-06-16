import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api'
import {  useEffect } from 'react';

/*const DummyData = [
    { id: 'q1', author: 'minnat', text: 'This is testing data' },
    { id: 'q2', author: 'Vaibha', text: 'Some dummy text book' },
]*/

const AllQuotes = () => {
    const { sendRequest,
        status,
        data: loadedData,
        error } = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest()
    }, [sendRequest])

    if (status === 'pending') {
        return <LoadingSpinner />
    }
    if (error) {
        return <p className='centered'>{error}</p>
    }

    if (status === 'completed' && (loadedData.length === 0 || !loadedData)) {
        return <NoQuotesFound />
    }

    return (
        <QuoteList quotes={loadedData} />
    )
}

export default AllQuotes;