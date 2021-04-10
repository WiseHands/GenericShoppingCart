import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';

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
           margin-right: .1em;
           margin-left: .1em;
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
            overflow: auto;
        }
        .product-info-container h4{
           font-size: 0.8rem;
           font-weight: 400;
           margin: 5px 0;;
        }
        .quantity-input, .total-span {
           margin: 0 .5em;
        }
        .quantity-input {
            --paper-input-container-shared-input-style: {
                text-align: center;
                width: 2em;
                font-size: 1.4em;
            }
            --paper-font-caption: {
                height: 0 !important;
            }
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
                <h3 on-click="_openProductPageByUuid">[[_translateProductName(cartItem, language)]]</h3>
                <h4> 
                    <template is="dom-repeat" items="[[cartItem.additionList]]">                
                        [[_translateAdditionTitle(addition, language)]]<span hidden="[[!hasMoreThanOneQuantity(item)]]">([[item.quantity]])</span>
                        <span hidden="[[isLastItem(cartItem.additionList, index)]]">,</span>
                    </template>        
                </h4>
            </div>        
            <div class="product-calculated-container">  
                <paper-icon-button icon="remove" on-tap="_decreaseItemQuantity"></paper-icon-button>
                <paper-input allowed-pattern="[0-9]" on-change="_quantityChange" value="[[cartItem.quantity]]" class="quantity-input" id="quantityItem"></paper-input>
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
        language: String,
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

    _translateAdditionTitle(addition, language) {
        let label = '';

        if (addition.translationBucket) {
            let translationList = addition.translationBucket.translationList;
            translationList.forEach(itemTranslation => {
                if (itemTranslation.language === language && itemTranslation.content != '') {
                    label = itemTranslation.content;
                }
                if (itemTranslation.language === language && itemTranslation.content === '') {
                    label = addition.title;
                }
            });
        } else {
            label = addition.title;
        }
        return label;
    }

    _translateProductName(product, language){
        let label = '';
        let translationList = product.translationBucket.translationList;
        if (product.translationBucket){
            translationList.forEach(item => {
                if (item.language === language && item.content != ''){
                    label = item.content;
                }
                if (item.language === language && item.content === '') {
                    label = product.name;
                }
            });
        } else {
            label = product.name;
        }
        return label;
    }

    _calculateTotalPrice (quantity, productPrice, additionList) {
        let additionPrice = 0;
        additionList.forEach(item => {
           additionPrice += item.price * item.quantity;
        });
        let total = quantity * (productPrice + additionPrice);
      return +(Math.round(Number(total) + "e+2")  + "e-2");
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
      return item.quantity > 1;
    }

    _quantityChange () {
      const quantity = this.$.quantityItem.value;
      if(quantity) {
          const detail = {
              itemUuid: this.cartItem.uuid,
              quantity: quantity
          };
          this.dispatchEvent(new CustomEvent('update-quantity',
              {
                  detail: detail,
                  bubbles: true,
                  composed: true
              }))
      }
    }
}

window.customElements.define('wise-shopping-cart-item', WiseShoppingCartItem);