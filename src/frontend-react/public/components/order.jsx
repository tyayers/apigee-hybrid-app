import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Header from './header.jsx';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        order:
        {
          OrderId: "21j4432k",
          ShippingTrackingId: "3j2j24jkjk5673",
          ShippingCost: this.props.cart.shipping_cost,
          total_paid: this.props.cart.total_cost
        }
    };

    this.props.resetCart();
  }

  render() {

    return (
      <div>
        <main role="main" class="order">
          <div class="py-5">
              <div class="container py-3 px-lg-5">
                  <div class="row mt-5 py-2">
                      <div class="col text-center">
                          <img class="order-logo" src="static/icons/Hipster_HeroLogoCyan.svg" alt="icon" />
                          <h3>
                              Your order is complete!
                          </h3>
                          <p>Order Confirmation ID</p>
                          <p class="mg-bt"><strong>{this.state.order.OrderId}</strong></p>
                          <p>Shipping Tracking ID</p>
                          <p class="mg-bt"><strong>{this.state.order.ShippingTrackingId}</strong></p>
                          <p>Shipping Cost</p>
                          <p class="mg-bt"><strong>EUR {this.state.order.ShippingCost}</strong></p>
                          <p>Total Paid</p>
                          <p class="mg-bt"><strong>EUR {this.state.order.total_paid}</strong></p>
                      </div>
                  </div>

              </div>
              <div class="container py-3 px-lg-5">
                  <div class="row py-2 text-center">
                    <Link to={"/"}>
                      <a class="btn btn-info" href="#" role="button" style={{"margin-top": "40px", "margin-bottom": "40px"}}>Keep Browsing</a>
                    </Link>
                  </div>
              </div>
              {/* {{ if $.recommendations }}
                  {{ template "recommendations" $.recommendations }}
              {{ end }} */}
          </div>
      </main>

      </div>
    )
  }

  renderOrder(currency) {

  }

}

export default Order;