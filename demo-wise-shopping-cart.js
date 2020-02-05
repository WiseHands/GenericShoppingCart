import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {WiseShoppingCart} from './wise-shopping-cart.js';

export class DemoWiseShoppingCart extends PolymerElement {
  static get template() {
    return html`
      <wise-shopping-cart start-shopping-label="START SHOPPING" basket-empty-label="Your basket is empty" cart-items="[[cartItems]]"></wise-shopping-cart>
    `;
  }

  static get properties() {
    return {
      cartItems: {
        type: Array,
        value: [
          {
            "uuid": "8",
            "name": "Google Pixel 4",
            "imagePath": "demo1.jpg",
            "quantity": 5,
            "price": 799,
            "additionList": [
              {
                "uuid": "401",
                "title": "сир",
                "price": 25,
                "counter": 4,
                "imagePath": "http://localhost:3334/public/product_images/402881ce7010f488017010f495ef000b//public/files/402881ce7010f488017010f495ef000b/9746a26d-ea5d-4bac-b1f4-6a77994ffded.jpg"
              },
              {
                "uuid": "402",
                "title": "рис",
                "price": 20,
                "counter": 1,
                "imagePath": "http://localhost:3334/public/product_images/402881ce7010f488017010f495ef000b//public/files/402881ce7010f488017010f495ef000b/9746a26d-ea5d-4bac-b1f4-6a77994ffded.jpg"
              }
            ]
          },
          {
            "uuid": "16",
            "name": "Apple iPhone 11 Pro",
            "imagePath": "demo2.jpg",
            "quantity": 1,
            "price": 1199,
            "additionList": [

            ]
          }
        ]
      }
    };
  }

}

window.customElements.define('demo-wise-shopping-cart', DemoWiseShoppingCart);