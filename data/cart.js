export let cart;
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
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
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function findMatchingItem(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  return matchingItem;
}

export function addToCart(productId) {
  const quantityInput = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  // const quantity = Number(quantityInput.value);
  const matchingItem = findMatchingItem(productId);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1, deliveryOptionId: "1" });
  }

  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  const matchingItem = findMatchingItem(productId);

  if (newQuantity >= 1 && newQuantity < 1000) {
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartcartItem) => {
    cartQuantity += cartcartItem.quantity;
  });
  return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingProduct = findMatchingItem(productId);
  matchingProduct.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
