import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {WiseShoppingCartItem} from './wise-shopping-cart-item.js';
import '@polymer/paper-button/paper-button.js';

class WiseShoppingCart extends PolymerElement {
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
      </style>
      <template is="dom-if" if="[[_isInShoppingCartAnyItems(cartItems.length)]]">
          <template is="dom-repeat" items="[[cartItems]]">
            <wise-shopping-cart-item cart-item="[[item]]"></wise-shopping-cart-item>
          </template>
      </template>
      
      <template is="dom-if" if="[[!_isInShoppingCartAnyItems(cartItems.length)]]">
      <div class="empty-cart-container">
          <p>Ваш кошик порожній</p> <br>
          <paper-button>ПОЧАТИ ПОКУПКУ</paper-button>
      </div>
      </template>
    `;
  }
    constructor() {
        super();
        const items = {"uuid":"92df3d79-4358-40f1-92c2-f73b8eb9ccda","deliveryType":"COURIER","paymentType":"CASHONDELIVERY","lineItemList":[{"uuid":"402881ce6eea99e3016eeb8023a00002","product":{"uuid":"402881ce6df8da72016e0296b1180006","name":"3","description":"3","price":100.0,"categoryName":"test","categoryUuid":"402881ce6d2a3296016d2a336a6f0017","isActive":true,"mainImage":{"uuid":"402881ce6df8da72016e0296b1150005","filename":"e1d433fd-df6c-4f3c-b16d-6a3cabf5a27b.jpg"},"properties":[],"images":[{"uuid":"402881ce6df8da72016e0296b1150005","filename":"e1d433fd-df6c-4f3c-b16d-6a3cabf5a27b.jpg"}]},"quantity":2},{"uuid":"402881ce6eea99e3016eeb802ba50003","product":{"uuid":"402881ce6df8da72016e0296e3970008","name":"Best Pizza Ever with papperoniasdasdadsads","description":"4","price":4.0,"categoryName":"test","categoryUuid":"402881ce6d2a3296016d2a336a6f0017","isActive":true,"mainImage":{"uuid":"402881ce6df8da72016e0296e3950007","filename":"3401a4b7-7cef-4552-a03f-1cedaec19070.jpg"},"properties":[],"images":[{"uuid":"402881ce6df8da72016e0296e3950007","filename":"3401a4b7-7cef-4552-a03f-1cedaec19070.jpg"}]},"quantity":2}],"clientName":"564","clientPhone":"4564","clientComments":"456444"};
        this.set('cartItems', items.lineItemList);
    }
  static get properties() {
    return {
        cartItems: {
            type: Array,
            value: []
        },
    };
  }

    _isInShoppingCartAnyItems (cartItemsLength) {
      return cartItemsLength > 0;
    }

}

window.customElements.define('wise-shopping-cart', WiseShoppingCart);