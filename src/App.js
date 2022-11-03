import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Product from './pages/Product'
import Detail from './pages/Detail'
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Product />
          </Route>
          <Route path="/detail/:id?">
            <Detail />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
