import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Header from './header.jsx';
import axios from 'axios';
import TestDataProducts from '../testdata/products.json'

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: undefined,
      //   product: 
      //   {
      //     "id": "OLJCESPC7Z",
      //     "name": "Vintage Typewriter",
      //     "description": "This typewriter looks good in your living room.",
      //     "picture": "static/img/products/typewriter.jpg",
      //     "priceUsd": {
      //         "currencyCode": "USD",
      //         "units": 67,
      //         "nanos": 990000000
      //     },
      //     "categories": ["vintage"]
      // },
      quantity: 1,
      config: props.config
    };
  }

  componentDidMount() {
    if (this.props.config.initialized) {
      const { id } = this.props.match.params;
      this.getProduct(id);
    }
  }

  componentDidUpdate() {
    if (this.state.product == undefined) {
      const { id } = this.props.match.params;
      this.getProduct(id);
    }
  }

  getProduct(id) {
    if (this.props.config.useTestData) {
      TestDataProducts.products.map((product, index) => {
        if (product.id == id) {
          this.setState({ product: product });
        }
      })   
    }
    else {
      var options = {
        method: "GET",
        url: this.props.config.baseUrl + "/productcatalogservice/products/" + id,
        headers: {
          "x-apikey": this.props.config.productKey
        }
      };
      axios(options).then((response) => {
        this.setState({ product: response.data })
      });      
    }
  }

  render() {
    return (
      // <div {{ with $.platform_css }} class="{{.}}" {{ end }}>
      //   <span class="platform-flag">
      //     {{$.platform_name}}
      //   </span>
      // </div>
      <div>
        <main role="main">
          { this.state.product != undefined &&
          <div class="h-product">
            <div class="row">
              <div class="col">
                <img src={this.state.product.picture} />
              </div>
              <div class="product-info col">
                <div class="product-wrapper">
                  <h2>{this.state.product.name}</h2>

                  <p class="text-muted">
                    {"EUR " + this.state.product.priceUsd.units + "." + this.state.product.priceUsd.nanos.toString().substring(0, 2)}
                  </p>
                  <div>
                    <h6>Product Description:</h6>
                    {this.state.product.description}
                  </div>
                  
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="quantity">Quantity</label>
                    </div>
                    <select name="quantity" id="quantity" class="custom-select form-control form-control-lg" onChange={(e) => this.setState({quantity: e.target.value})}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>10</option>
                    </select>
                    <Link to={"/cart"}>
                      <button class="btn btn-info btn-lg ml-3" onClick={() => { this.props.addToCart(this.state.product, this.state.quantity);}}>Add to Cart</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </main>
      </div>
    )
  }

}

export default Product;