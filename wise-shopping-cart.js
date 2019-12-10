import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

/**
 * `wise-shopping-cart`
 * shopping cart for Wise Hands project
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class WiseShoppingCart extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .paper-card-container {
           display: flex;
           flex-direction: row;
           align-items: center;
           margin-bottom: 1em;
           border: 1px solid lightgray;
        }
        .image-container {
            padding: .5em;
        }
        .image-container img {
           width: 100px;
           height: 75px;
        }
        iron-image {
            display: flex;
        } 
        .total-container{
           margin: 5px;
           display: flex;
           align-items: center;
           min-width: 0;  
           flex: 1;
           justify-content: space-between;
        }
        .quantity-span, .total-span {
           margin: 0 .5em;
        }
        .total-span {
           text-align: center;
        }
        .total-container h3 {
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
           margin: 0;
        }
        .product-calculated-container {
           display: flex;
           flex-direction: row;
           align-items: center;
        }
        @media screen and (max-width: 500px) {
           .total-container{
              flex-direction: column;
              align-items: normal;
           }   
           .product-calculated-container {
              align-self: center;
           }   
        }
        @media screen and (max-width: 420px) {
            
        }
      </style>
      <template is="dom-repeat" items="[[cartItems]]">
          <paper-card class="paper-card-container">
            <div class="image-container">
              <iron-image sizing="cover" height="100" width="100" src="/3401a4b7-7cef-4552-a03f-1cedaec19070.jpg">
            </div>
            <div class="total-container">
              <h3>[[item.product.name]]</h3>
                <div class="product-calculated-container">  
                      <paper-icon-button icon="remove"></paper-icon-button>
                      <p class="quantity-span">[[item.quantity]]</p>
                      <paper-icon-button icon="add"></paper-icon-button>
                      <div class="total-span">[[_calculateTotalPrice(item.quantity, item.product.price)]]<br> UAH</div>
                      <paper-icon-button icon="close"></paper-icon-button>
                </div>
            </div>
          </paper-card>
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
        cartItems: Array,
    };
  }

    _calculateTotalPrice (quantity, price) {
      return quantity * price;
    }

}

window.customElements.define('wise-shopping-cart', WiseShoppingCart);
