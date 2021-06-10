import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Header from './header.jsx';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items:
        [
          {
            Id: 1,
            Picture: "static/img/products/air-plant.jpg",
            Name: "Air Plant",
            Quantity: 1,
            Price: 1
          }
        ],
        shipping_cost: 1,
        total_cost: 1
    };
  }

  render() {

    return (
      <div>
        <main role="main" class="cart">
          <div class="cart-bg">
              <div class="container py-3 px-lg-5 py-lg-5">
                  {this.renderCart()}
              </div>
              {/* {{ if $.recommendations}}
                  {{ template "recommendations" $.recommendations }}
              {{ end }} */}
          </div>
        </main>
      </div>
    )
  }

  renderCart(currency) {

    if (this.props.cart.items.length == 0) {
      return(
        <div>
          <h3>Your shopping cart is empty!</h3>
          <p>Items you add to your shopping cart will appear here.</p>
          <a class="btn btn-info" href="/" role="button">Browse Products &rarr; </a>
        </div>
      );
    }
    else {
      return(
        <div>
        <div class="row mb-3 py-2">
          <div class="col">
              <h3>{this.props.cart.items.length} item(s) in your cart</h3>
          </div>
          <div class="col text-right">
            <form method="POST" action="/cart/empty">
                <a href="/"  class="btn btn-info btn-lg ml-3">Empty cart</a>
                <Link to={"/"}>
                  <button class="btn btn-info btn-lg ml-3">Keep browsing</button>
                </Link>
            </form>
          </div>
        </div>

        {this.props.cart.items.map((item, index) => (
          <div class="product-item">
            <div class="row pt-2 mb-2">
                <div class="col text-right image">
                  <a href="product/{{.Item.Id}}"><img class="img-fluid"
                      src={item.Picture} /></a>
                </div>
                <div class="col text-left text">
                  <h4>{item.Name}</h4>
                  <p><small class="text-muted">SKU: #{item.Id}</small></p>
                  <div class="details">
                    Quantity: {item.Quantity}<br/>
                    <strong>
                        {/* {{ renderMoney .Price }} */}
                        {"EUR " + item.Price}
                    </strong>
                  </div>
                </div>
            </div>
          </div>
        ))}
        <div class="row pt-2 my-3">
          <div class="col text-center order-summary">
            <p class="text-muted my-0">Shipping Cost: <strong>{"EUR " + this.props.cart.shipping_cost}</strong></p>
            Total Cost: <strong>{"EUR " + this.props.cart.total_cost}</strong>
          </div>
        </div>

          <div class="row py-3 my-2 checkout">
              <div class="col-12 col-lg-8 offset-lg-2">
                <h3 class="text-center">Checkout</h3>

                <div class="form-row">
                    <div class="col-md-5 mb-3">
                            <label for="email">E-mail Address</label>
                            <input type="email" class="form-control" id="email"
                                name="email" value="someone@example.com" required />
                        </div>
                    <div class="col-md-5 mb-3">
                        <label for="street_address">Street Address</label>
                        <input type="text" class="form-control"  name="street_address"
                            id="street_address" value="1600 Amphitheatre Parkway" required />
                    </div>
                    <div class="col-md-2 mb-3">
                        <label for="zip_code">Zip Code</label>
                        <input type="text" class="form-control"
                            name="zip_code" id="zip_code" value="94043" required pattern="\d{4,5}" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-5 mb-3">
                            <label for="city">City</label>
                            <input type="text" class="form-control" name="city" id="city"
                                value="Mountain View" required />
                        </div>
                    <div class="col-md-2 mb-3">
                        <label for="state">State</label>
                        <input type="text" class="form-control" name="state" id="state"
                            value="CA" required />
                    </div>
                    <div class="col-md-5 mb-3">
                        <label for="country">Country</label>
                        <input type="text" class="form-control" id="country"
                            placeholder="Country Name"
                            name="country" value="United States" required />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                        <label for="credit_card_number">Credit Card Number</label>
                        <input type="text" class="form-control" id="credit_card_number"
                            name="credit_card_number"
                            placeholder="0000-0000-0000-0000"
                            value="4432-8015-6152-0454"
                            required pattern="\d{4}-\d{4}-\d{4}-\d{4}" />
                    </div>
                    <div class="col-md-2 mb-3">
                        <label for="credit_card_expiration_month">Month</label>
                        <select name="credit_card_expiration_month" id="credit_card_expiration_month"
                            class="form-control">
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">January</option>
                        </select>
                    </div>
                    <div class="col-md-2 mb-3">
                        <label for="credit_card_expiration_year">Year</label>
                        <select name="credit_card_expiration_year" id="credit_card_expiration_year"
                            class="form-control">
                              {/* {{ range $i, $y := $.expiration_years}}<option value="{{$y}}"
                                  {{if eq $i 1 -}}
                                      selected="selected"
                                  {{- end}}
                              >{{$y}}</option>{{end}} */}
                        </select>
                    </div>
                    <div class="col-md-2 mb-3">
                        <label for="credit_card_cvv">CVV</label>
                        <input type="password" class="form-control" id="credit_card_cvv"
                            name="credit_card_cvv" value="672" required pattern="\d{3}" />
                    </div>
                </div>
                <div class="form-row center-contents last-row">
                  <Link to={"/order"}>
                    <button class="btn btn-info" type="submit">Place order</button>
                  </Link>
                </div>
              </div>
          </div>
        </div>
      );
    }
  }

}

export default Cart;