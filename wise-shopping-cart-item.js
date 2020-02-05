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
        }
        .image-container {
            padding: .5em;
        }
        .image-container:hover{
            cursor: pointer;
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
        .product-info-container{
            flex-direction: column;
        }
        .product-info-container h4{
           font-size: 0.8rem;
           font-weight: 400;
           margin: 5px 0;;
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
        
        .total-container h3:hover {
            cursor: pointer;
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
            <iron-image sizing="cover" height="100" width="100" src="[[cartItem.imagePath]]" on-click="_openProductPageByUuid">
        </div>
        <div class="total-container">
            <div class="product-info-container">
                <h3 on-click="_openProductPageByUuid">[[cartItem.name]]</h3>
                <h4> 
                    <template is="dom-repeat" items="[[cartItem.additionList]]">                
                        [[item.title]]<span hidden="[[!hasMoreThanOneQuantity(item)]]">([[item.counter]])</span>
                        <span hidden="[[isLastItem(cartItem.additionList, index)]]">,</span>
                    </template>        
                </h4>
            </div>        
            <div class="product-calculated-container">  
                <paper-icon-button icon="remove" on-tap="_decreaseItemQuantity"></paper-icon-button>
                <p class="quantity-span">[[cartItem.quantity]]</p>
                <paper-icon-button icon="add" on-tap="_increaseItemQuantity"></paper-icon-button>
                <div class="total-span">[[_calculateTotalPrice(cartItem.quantity, cartItem.price, cartItem.additionList)]]<br>[[currencyLabel]]</div>
                <paper-icon-button icon="close" on-tap="_removeItem"></paper-icon-button>
            </div>
        </div>
    </paper-card>
    `;
  }

  static get properties() {
    return {
        cartItem: Object,
        startShoppingLabel: {
            type: String,
        },
        basketEmptyLabel: {
            type: String,
        },
        currencyLabel: {
            type: String
        }
    };
  }

    _calculateTotalPrice (quantity, productPrice, additionList) {
        let additionPrice = 0;
        additionList.forEach(item => {
           additionPrice += item.price * item.counter;
        });
      console.log("additionPrice*counter", additionPrice);
      return quantity * (productPrice + additionPrice);
    }

    _decreaseItemQuantity () {
        this.dispatchEvent(new CustomEvent('decrease-item-quantity',
            {
                detail: this.cartItem.uuid,
                bubbles: true,
                composed: true
            }));
    }

    _openProductPageByUuid (){
        this.dispatchEvent(new CustomEvent('open-product',
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

    isLastItem (additionList, index){
      return index + 1 === additionList.length;
    }

    hasMoreThanOneQuantity (item) {
      return item.counter > 1;
    }
}

window.customElements.define('wise-shopping-cart-item', WiseShoppingCartItem);