import NotFound from "components/NotFound";
import CartFeature from "features/Cart";
import Orders from "features/Orders";

import ProductFeature from "features/products";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import AppHeader from "./components/Header";



function App() {
  return (
    <div className="App">
      <AppHeader />
      <Switch>
        <Route path='/' exact component={ProductFeature} />
        <Route path='/products' component={ProductFeature} />
        <Route path='/cart' component={CartFeature} />
        <Route path='/orders' component={Orders} />
        <Route component={NotFound} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
