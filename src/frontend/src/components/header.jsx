import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import CurrencyIcon from "../static/icons/Hipster_CurrencyIcon.svg"
import DownArrow from "../static/icons/Hipster_DownArrow.svg"
import NavLogo from "../static/icons/Hipster_NavLogo.svg"
import CartIcon from "../static/icons/Hipster_CartIcon.svg"

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        show_currency: true,
        currencies: [
            "USD", "EUR"
        ],
        user_currency: "EUR"
    };
  }

  render() {
    return (
        <header>
            <div class="navbar">
                <div class="container d-flex justify-content-between">
                    <div class="h-free-shipping">Free shipping with $75 purchase! &nbsp;&nbsp;</div>

                    <div class="h-controls">
                        <div class="h-control">
                            <img src={CurrencyIcon} alt="icon" class="icon" />
                            <form method="POST" class="controls-form" action="/setCurrency" id="currency_form" >
                                <select name="currency_code" onchange="document.getElementById('currency_form').submit();">
                                {this.state.currencies.map((currency, index) =>
                                    this.renderCurrency(currency)
                                )}
                                </select>
                            </form>
                            <img src={DownArrow} alt="icon" class="icon arrow" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar sub-navbar">
                <div class="container d-flex justify-content-between">
                    <Link to={"/"} class="navbar-brand d-flex align-items-center">
                        <img src={NavLogo} alt="logo" class="logo" />
                    </Link>
                    <div class="controls">
                        <Link to="/cart">
                            <img src={CartIcon} alt="cart-icon" class="logo" />
                            <span>Cart
                                {this.renderCartBadge()}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

        </header>
    )
  }

  renderCurrency(currency) {
      if (currency == this.state.user_currency) {
        return(
            <option value="{currency}" selected="selected">{currency}</option>
        );
      }
      else {
        return(
            <option value="{currency}">{currency}</option>
        );
      }
  }

  renderCartBadge() {
    if (this.props.cart_size > 0) {
        return(
            <span class="badge badge-blue">{this.props.cart_size}</span>
        );
    }
  }
}

export default Header;