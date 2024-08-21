import { loadFromStorage, cart } from "../../data/cart.js";
import renderOrderSummary from "../../scripts/checkout/orderSummary.js";
import { renderCheckoutHeader } from "../../scripts/checkout/checkoutHeader.js";
import renderPaymentSummary from "../../scripts/checkout/paymentSummary.js";

describe("test suite: renderOrderSummary", () => {
  let productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  let productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  let productId3 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
  let deliveryOptionId3 = 3;

  beforeEach(() => {
    document.querySelector(
      ".js-test-container"
    ).innerHTML = `<div class="js-order-summary"></div>
        <div class="js-checkout-header"></div>
        <div class="js-payment-summary"></div>`;

    loadFromStorage();
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });

  it("displays the cart", () => {
    // document.querySelector(
    //   ".js-test-container"
    // ).innerHTML = `<div class="js-order-summary"></div>`;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
        {
          productId: productId3,
          quantity: 1,
          deliveryOptionId: "3",
        },
      ]);
    });

    loadFromStorage();
    renderOrderSummary();

    expect(
      document.querySelectorAll(".js-cart-item-container ").length
    ).toEqual(3);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
  });

  it("removes item from cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
        {
          productId: productId3,
          quantity: 1,
          deliveryOptionId: "3",
        },
      ]);
    });

    loadFromStorage();
    renderCheckoutHeader();
    renderOrderSummary();

    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll(".js-cart-item-container ").length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
  });

  it("displays product name correctly", () => {
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual("Intermediate Size Basketball");
  });

  it("displays currency symbol", () => {
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain("$");
  });

  it("delivery option checks correctly", () => {
    const deliveryOption = document.querySelector(
      `.js-delivery-option-input-${productId3}-${deliveryOptionId3}`
    );

    console.log(deliveryOption);
    deliveryOption.click();

    expect(
      document.querySelector(
        `.js-delivery-option-input-${productId3}-${deliveryOptionId3}`
      ).checked
    ).toEqual(true);
    expect(cart.length).toEqual(2);
  });

  it("displays correct shipping price", () => {
    expect(document.querySelector(".js-shipping-price").innerText).toEqual(
      "$14.98"
    );
  });

  it("displays correct total price", () => {
    expect(document.querySelector(".js-total-price").innerText).toEqual(
      "$48.31"
    );
  });
});
