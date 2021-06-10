import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import HeroBannerImage from '../static/images/HeroBannerImage2.png'
import HeroLogo from '../static/icons/Hipster_HeroLogo.svg'
import HotProducts from '../static/icons/Hipster_HotProducts.svg'
import TestDataProducts from '../testdata/products.json'
//import AdvertBannerImage from './static/images/AdvertBannerImage.png'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    if (this.props.config.initialized) {
      this.getProducts();
    }
  }

  componentDidUpdate() {
    if (this.state.products.length == 0) {
      this.getProducts();
    }
  }

  getProducts() {
    if (this.props.config.useTestData) {
      this.setState({ products: TestDataProducts.products })
    }
    else {
      var options = {
        method: "GET",
        url: this.props.config.baseUrl + "/productcatalogservice/products",
        headers: {
          "x-apikey": this.props.config.productKey
        }
      };
      axios(options).then((response) => {
        this.setState({ products: response.data.products })
      });
    }
  }

  render() {
    return (
      <div>
        <div class="gcp-platform">
          <span class="platform-flag">
            {this.props.config.platformName}
          </span>
        </div>
        <main role="main" class="home">
          <section class="jumbotron text-center mb-0 h-jumbotron" style={{color: 'red', backgroundImage: `url(${HeroBannerImage})`}}>
            <div class="container">
              <img src={HeroLogo} alt="icon" class="icon search-icon" />
            </div>
          </section>

          <div class="h-grid py-5 bg-light">
            <div class="container">
              <div class="row h-row">
                <img src={HotProducts} alt="icon" class="icon search-icon" />
              </div>
              <div class="row">
                {this.state.products.map((product, index) => (
                <div class="col-md-4">
                  <div class="h-card card mb-4 box-shadow">
                    <Link to={"/product/" + product.id}>
                      <img alt="" style={{width: "100%", height: "auto"}} src={product.picture} />
                      <div class="card-hover"></div>
                    </Link>
                    <div class="card-body h-card-body">
                      <h5 class="card-title h-card-title">
                        {product.name}
                      </h5>
                      <div class="d-flex justify-content-center align-items-center">
                        <small class="text-muted">
                          {"EUR " + product.priceUsd.units + "." + product.priceUsd.nanos.toString().substring(0, 2)}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

}

export default Home;