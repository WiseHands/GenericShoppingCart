import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {WiseShoppingCart} from './wise-shopping-cart.js';

export class DemoWiseShoppingCart extends PolymerElement {
  static get template() {
    return html`
      <wise-shopping-cart cart-items="[[cartItems]]"></wise-shopping-cart>
    `;
  }

  static get properties() {
    return {
        cartItems: {
          type: Array,
          value: [
            {
              name: 'Google Pixel 4',
              imagePath: 'demo1.jpg',
              quantity: '1',
              price: '25999'
            },
            {
              name: 'Apple IPhone 11 Pro',
              imagePath: 'demo2.jpg',
              quantity: '1',
              price: '25999'
            }
          ]
        }
    };
  }


}

window.customElements.define('demo-wise-shopping-cart', DemoWiseShoppingCart);