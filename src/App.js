import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout'
import AllQuotes from './pages/AllQuotes';
import NewQuotes from './pages/NewQuotes';
import QuotesDetails from './pages/QuotesDetails';
import NotFound from './pages/NotFound';
import React, {Suspense} from 'react';
import LoadingSpinner from './components/UI/LoadingSpinner';

//read react lazy concept. used for optimazation.
//const NewQuotes = React.lazy( () => import('./pages/NewQuotes'));

function App() {
  return (
    <div>
      <Layout>
        <Suspense fallback={ <div className='centered'> <LoadingSpinner /> </div>}>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes' />
          </Route>
          <Route path='/quotes' exact>
            <AllQuotes />
          </Route>
          <Route path='/new-quotes'>
            <NewQuotes />
          </Route>
          <Route path='/quotes/:quoteId' >
            <QuotesDetails />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
