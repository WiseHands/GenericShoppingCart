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
            margin: 1.5em 0 1.5em 0;
        }
        svg {
            width: 25%;
            height: auto;
        }
        .banner-container {
            width: 100%;
            margin: 0 1em 1em 0;
            padding: 5px 10px;
        }
      </style>
      <template is="dom-if" if="[[_isInShoppingCartAnyItems(cartItems.length)]]">
        <paper-card class="banner-container" hidden="[[!isBannerOn]]">
          <p>[[bannerName]]</p>
          <p>[[bannerDescription]]</p>
        </paper-card>
        <template is="dom-repeat" items="[[cartItems]]">
          <wise-shopping-cart-item
            selected-language="[[selectedLanguage]]"
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
              <?xml version="1.0" encoding="iso-8859-1"?>
              <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
              <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              	 width="446.853px" height="446.853px" viewBox="0 0 446.853 446.853" style="enable-background:new 0 0 446.853 446.853;"
              	 xml:space="preserve">
              <g>
              	<path d="M444.274,93.36c-2.558-3.666-6.674-5.932-11.145-6.123L155.942,75.289c-7.953-0.348-14.599,5.792-14.939,13.708
              		c-0.338,7.913,5.792,14.599,13.707,14.939l258.421,11.14L362.32,273.61H136.205L95.354,51.179
              		c-0.898-4.875-4.245-8.942-8.861-10.753L19.586,14.141c-7.374-2.887-15.695,0.735-18.591,8.1c-2.891,7.369,0.73,15.695,8.1,18.591
              		l59.491,23.371l41.572,226.335c1.253,6.804,7.183,11.746,14.104,11.746h6.896l-15.747,43.74c-1.318,3.664-0.775,7.733,1.468,10.916
              		c2.24,3.184,5.883,5.078,9.772,5.078h11.045c-6.844,7.617-11.045,17.646-11.045,28.675c0,23.718,19.299,43.012,43.012,43.012
              		s43.012-19.294,43.012-43.012c0-11.028-4.201-21.058-11.044-28.675h93.777c-6.847,7.617-11.047,17.646-11.047,28.675
              		c0,23.718,19.294,43.012,43.012,43.012c23.719,0,43.012-19.294,43.012-43.012c0-11.028-4.2-21.058-11.042-28.675h13.432
              		c6.6,0,11.948-5.349,11.948-11.947c0-6.6-5.349-11.948-11.948-11.948H143.651l12.902-35.843h216.221
              		c6.235,0,11.752-4.028,13.651-9.96l59.739-186.387C447.536,101.679,446.832,97.028,444.274,93.36z M169.664,409.814
              		c-10.543,0-19.117-8.573-19.117-19.116s8.574-19.117,19.117-19.117s19.116,8.574,19.116,19.117S180.207,409.814,169.664,409.814z
              		 M327.373,409.814c-10.543,0-19.116-8.573-19.116-19.116s8.573-19.117,19.116-19.117s19.116,8.574,19.116,19.117
              		S337.916,409.814,327.373,409.814z"/>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              </svg>
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
        selectedLanguage: String,
        bannerName: String,
        bannerDescription: String,
        isBannerOn: {
           type: Boolean,
           value: false
        },
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
