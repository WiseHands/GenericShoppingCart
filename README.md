[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/wise-shopping-cart)
# \<wise-shopping-cart\>

Responsive shopping cart by [WiseHands](https://wisehands.me)

### It contains:
- image
- name 
- quantity 
- price 
- increase/decrease quantity buttons 
- remove item from cart button 

### Desktop view
![Alt text](demo/desktopView.png "Desktop view")

### Mobile view
![Alt text](demo/mobileView.png "Mobile view")

## Viewing Demo

```
$ npm install
$ polymer serve
```

# How to use

You can see usage in `demo-wise-shopping-cart.js`

### Notes

Product images should have 1:1 ratio.

To initialize use this JSON to fill values:

```
<wise-shopping-cart cart-items="[[cartItems]]"></wise-shopping-cart>

[
    {
        "uuid": "8",
        "name":"Google Pixel 4",
        "imagePath":"demo1.jpg",
        "quantity":"1",
        "price":"25999"
    },
    {
        "uuid": "16",
        "name":"Apple iPhone 11 Pro",
        "imagePath":"demo2.jpg",
        "quantity":"1",
        "price":"25999"
    }
]
```
There are three events available: 
- `increase-item-quantity`
- `decrease-item-quantity`
- `remove-item`

```
document.addEventListener('remove-item', function (e) {
   console.log("removeItem:", e.detail);
})
document.addEventListener('decrease-item-quantity', function (e) {
   console.log("decreaseItemQuantity:", e.detail);
})
document.addEventListener('increase-item-quantity', function (e) {
   console.log("increaseItemQuantity:", e.detail);
})
```