import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

export class WiseShoppingCartItem extends PolymerElement {
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
           font-weight: normal;
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
              align-self: auto;
           }   
        }
      </style>
    <paper-card class="paper-card-container">
      <div class="image-container">
        <iron-image sizing="cover" height="100" width="100" src="[[cartItem.imagePath]]">
      </div>
      <div class="total-container">
        <h3>[[cartItem.name]]</h3>
          <div class="product-calculated-container">  
                <paper-icon-button icon="remove" on-tap="_decreaseItemQuantity"></paper-icon-button>
                <p class="quantity-span">[[cartItem.quantity]]</p>
                <paper-icon-button icon="add" on-tap="_increaseItemQuantity"></paper-icon-button>
                <div class="total-span">[[_calculateTotalPrice(cartItem.quantity, cartItem.price)]]<br> USD</div>
                <paper-icon-button icon="close" on-tap="_removeItem"></paper-icon-button>
          </div>
      </div>
    </paper-card>
    `;
  }

  static get properties() {
    return {
        cartItem: Object,
    };
  }

    _calculateTotalPrice (quantity, price) {
      return quantity * price;
    }

    _decreaseItemQuantity () {
        this.dispatchEvent(new CustomEvent('decrease-item-quantity',
            {
                detail: this.cartItem.uuid,
                bubbles: true,
                composed: true
            }));
    }

    _increaseItemQuantity () {
        this.dispatchEvent(new CustomEvent('increase-item-quantity',
            {
                detail: this.cartItem.uuid,
                bubbles: true,
                composed: true
            }));
    }

    _removeItem () {
        this.dispatchEvent(new CustomEvent('remove-item',
            {
                detail: this.cartItem.uuid,
                bubbles: true,
                composed: true
            }))
    }

}

window.customElements.define('wise-shopping-cart-item', WiseShoppingCartItem);