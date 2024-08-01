const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4.0,
      count: 127,
    },
    priceCents: 2095,
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
  },
];

let productsHTML = "";

products.forEach((product) => {
  const html = `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars" src="images/ratings/rating-${
              product.rating.stars * 10
            }.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected="" value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart  js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>
    `;
  productsHTML += html;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    let matchingItem;

    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    const quantityInput = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const quantity = Number(quantityInput.value);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    const flashMsg = document.querySelector(`.js-added-to-cart-${productId}`);
    flashMsg.classList.add("show-msg");

    const interval = setTimeout(() => {
      flashMsg.classList.remove("show-msg");
    }, 2000);

    clearInterval(interval);

    setTimeout(() => {
      flashMsg.classList.remove("show-msg");
    }, 2000);

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    console.log(cartQuantity);
    console.log(cart);
  });
});
