class Cart {
  cartItem;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItem) {
      this.cartItem = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
        {
          productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          quantity: 1,
          deliveryOptionId: "3",
        },
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
  }

  findMatchingItem(productId) {
    let matchingItem;

    this.cartItem.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    return matchingItem;
  }

  addToCart(productId) {
    const quantityInput = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    // const quantity = Number(quantityInput.value);
    const matchingItem = this.findMatchingItem(productId);

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItem.push({ productId, quantity: 1, deliveryOptionId: "1" });
    }

    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    const matchingItem = this.findMatchingItem(productId);

    if (newQuantity >= 1 && newQuantity < 1000) {
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItem.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItem = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItem.forEach((cartcartItem) => {
      cartQuantity += cartcartItem.quantity;
    });
    return cartQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingProduct = this.findMatchingItem(productId);
    matchingProduct.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart("business-cart");
const myCart = new Cart("my-cart");

console.log(myCart);
