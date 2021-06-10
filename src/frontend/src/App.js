import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/header.jsx';
import Home from './components/home.jsx';
import Product from './components/product.jsx';
import Cart from './components/cart.jsx';
import Order from './components/order.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './static/styles/cart.css';
import './static/styles/order.css';
import './static/styles/styles.css';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      cart: {
        items: [],
        shipping_cost: 0,
        total_cost:0,
        total_quantity: 0
      },
      config: {
        useTestData: true,
        platformName: "Google Cloud \n Apigee",
        initialized: false
      }
    };

    fetch("/parameters")
     .then(res => res.json())
     .then((data) => {
       data.parameters.initialized = true;
       this.setState({ config: data.parameters});
     })
     .catch((error) => {
       var myconfig = this.state.config;
       myconfig.initialized = true;
       this.setState({ config: myconfig});
     });

    this.addToCart = this.addToCart.bind(this);
    this.resetCart = this.resetCart.bind(this)
  }

  componentDidMount() {

  }

  resetCart() {
    this.setState({
      "cart": {
        items: [],
        shipping_cost: 0,
        total_cost:0,
        total_quantity: 0       
      }
    });
  }

  addToCart(product, quantity) {
    var cartSize = 0;
    var foundItem = false;
    var cart = this.state.cart;
    cart.total_cost = 0;
    cart.total_quantity = 0;  
    cart.shipping_cost = 4.99;

    cart.items.forEach((item, index) => {
      if (item.Id == product.id) {
        // Found item!
        foundItem = true;
        item.Quantity += quantity;
      }

      cart.total_cost += (parseFloat(item.Price) * parseFloat(item.Quantity))
      cart.total_quantity += item.Quantity;
    });

    if (!foundItem) {
      var price = product.priceUsd.units + "." + product.priceUsd.nanos.toString().substring(0, 2);
      cart.items.push({
        Id: product.id,
        Name: product.name,
        Picture: product.picture,
        Price: price,
        Quantity: quantity
      });

      cart.total_cost += (parseFloat(price) * parseFloat(quantity));
      cart.total_quantity += quantity;
    }

    if (cart.total_cost < 75) 
      cart.total_cost += cart.shipping_cost;
    else
      cart.shipping_cost = parseFloat(0).toFixed(2);

    cart.total_cost = cart.total_cost.toFixed(2);

    this.setState({
      "cart": cart
    });
  }

  render() {
    return  (
      <Router>
        <Header cart_size={this.state.cart.total_quantity}/>

        <div>
          <Switch>
            <Route exact path = "/" render={(props) => <Home {...props} config={this.state.config} />} />
            <Route path = "/product/:id" render={(props) => <Product {...props} config={this.state.config} cart={this.state.cart} addToCart={this.addToCart} />} />
            <Route path = "/cart" render={(props) => <Cart {...props} cart={this.state.cart} />} />
            <Route path = "/order"  render={(props) => <Order {...props} cart={this.state.cart} resetCart={this.resetCart} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

// ReactDOM.render(
//   <Main />,
//   document.getElementById('react-app')
// );


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
