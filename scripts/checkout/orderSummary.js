import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
  getDeliveryDate,
} from "../../data/deliveryOptions.js";
import renderPaymentSummary from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const { productId, deliveryOptionId } = cartItem;
    const matchingProduct = getProduct(productId);
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    // const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
        <div class="cart-item-container
            js-cart-item-container 
            js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: 
              ${getDeliveryDate(deliveryOption)}
            </div>
  
            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">
  
                <div class="cart-item-details">
                    <div class="product-name js-product-name-${
                      matchingProduct.id
                    }">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price js-product-price-${
                      matchingProduct.id
                    }">$${formatCurrency(matchingProduct.priceCents)}</div>
                    <div class="product-quantity js-product-quantity-${productId}">
                        <span> Quantity: <span class="quantity-label js-quantity-label-${productId}">${
      cartItem.quantity
    }</span> </span>
                        <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id="${
                          matchingProduct.id
                        }">
                        Update
                        </span>
                        <input type="number" min="1" max="999" class="quantity-input js-item-quantity-${
                          matchingProduct.id
                        }"/>
                        <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                          matchingProduct.id
                        }">Save</span>
                        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${
                          matchingProduct.id
                        }" data-product-id=${matchingProduct.id}>
                        Delete
                        </span>
                    </div>
                </div>
  
                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
        `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let optionsHTML = "";
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      optionsHTML += `
        <div class="delivery-option js-delivery-option" 
          data-product-id="${matchingProduct.id}" 
          data-delivery-option-id="${deliveryOption.id}">
            <input 
              type="radio" 
              ${isChecked ? "checked" : ""} 
              class="delivery-option-input js-delivery-option-input-${
                matchingProduct.id
              }-${deliveryOption.id}" 
              name="delivery-option-${matchingProduct.id}"
            >
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                $${priceString} Shipping
              </div>
            </div>
        </div>`;
    });

    return optionsHTML;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      removeFromCart(productId);

      const cartItemContainer = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      cartItemContainer.remove();
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      const cartItemContainer = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      cartItemContainer.classList.add("is-editing-quantity");
      const quantity = document.querySelector(
        `.js-quantity-label-${productId}`
      ).innerHTML;
      document.querySelector(`.js-item-quantity-${productId}`).value = quantity;
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      const cartItemContainer = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      const quantityInput = document.querySelector(
        `.js-item-quantity-${productId}`
      );
      const newQuantity = Number(quantityInput.value);

      if (newQuantity) {
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
          newQuantity;
      }
      updateQuantity(productId, newQuantity);
      quantityInput.value = "";
      cartItemContainer.classList.remove("is-editing-quantity");
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      const deliveryOption = getDeliveryOption(deliveryOptionId);
      getDeliveryDate(deliveryOption);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

export default renderOrderSummary;
