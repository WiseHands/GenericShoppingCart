import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {WiseShoppingCartItem} from './wise-shopping-cart-item.js';
import '@polymer/paper-button/paper-button.js';

export class WiseShoppingCart extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
    
        iron-image {
            display: flex;
        } 
      
        .total-container h3 {
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
           margin: 0;
        }
        p {
            font-weight: 300;
            font-size: 1.25rem;
            text-align: center;
        }
        
        paper-button {
            background-color: #fff;
            color: #000;
            border: 2px solid #000;
            border-radius: 0;
            width: fit-content;
            align-self: center;
        }
        paper-button:hover {
            background-color: #000;
            color: #fff;
            border: 2px solid #fff;
        }
        .empty-cart-container {
            display: flex;
            flex-direction: column
        }
        .empty-cart-img {
            display: flex;
            justify-content: center;
        }
      </style>
      <template is="dom-if" if="[[_isInShoppingCartAnyItems(cartItems.length)]]">
          <template is="dom-repeat" items="[[cartItems]]">
            <wise-shopping-cart-item
              start-shopping-label="[[startShoppingLabel]]"
              basket-empty-label="[[basketEmptyLabel]]"
              currency-label="[[currencyLabel]]"
              cart-item="[[item]]">
            </wise-shopping-cart-item>
          </template>
      </template>
      
      <template is="dom-if" if="[[!_isInShoppingCartAnyItems(cartItems.length)]]">
      <div class="empty-cart-container">
          <div class="empty-cart-img">
              <img src="../image/shopping_cart_empty.png">
          </div>
          <p>[[basketEmptyLabel]]</p> <br>
          <paper-button on-tap="_startBuyingProducts">[[startShoppingLabel]]</paper-button>
      </div>
      </template>
    `;
  }

  static get properties() {
    return {
        cartItems: Array,
        startShoppingLabel: {
            type: String,
            value: 'START SHOPPING'
        },
        basketEmptyLabel: {
          type: String,
          value: 'Your basket is empty'
        },
        currencyLabel: {
            type: String,
            value: 'USD'
        }
    };
  }

  _startBuyingProducts () {
        this.dispatchEvent(new CustomEvent('start-shopping',
            {
                bubbles: true,
                composed: true
            })
        )
  }

  _isInShoppingCartAnyItems (cartItemsLength) {
    return cartItemsLength > 0;
  }

}

window.customElements.define('wise-shopping-cart', WiseShoppingCart);