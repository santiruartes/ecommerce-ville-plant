import { retrieveProducts, getListLength, getProductsByCategory } from "./data"
import { cardAmount } from "./constants"
const productsTag = document.querySelector(".product__container");
const btnShowMore = document.querySelector(".btn-show-more");
const categories = document.querySelector(".categories");
const categoryList = document.querySelectorAll(".category");
const barsBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".header__navbar__list");
const cartMenu = document.querySelector(".cart");
const cartBtn = document.querySelector(".cart-label")
const overlay = document.querySelector(".overlay")

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList))
};

const renderProduct = (product) => {
    const { id, name, cost, cardImg } = product
    return `
  <div class="card__container">
    <img src="${cardImg}" alt="${name}" />
    <div class="card__info">
      <div class="product__top">
        <h3>${name}</h3>
      </div>
      <div class="product__mid"> 
      <span>$${cost}<span/>
      </div>
      <div class="product__bot">
          <p>
            Estos productos son de alta calidad, producidos en
            ambientes ciudados, con abono orgánico.
          </p>
      </div>
      <button
        class="add-btn"
        data-id="${id}"
        data-name="${name}"
        data-cost="${cost}"
        data-img="${cardImg}"
      >
        Comprar
      </button>
    </div>
  </div>
    `
}


const renderProducts = (products = []) => {
  products.forEach((product) => {
    const productHTML = renderProduct(product);
    productsTag.innerHTML += productHTML;
  });
};


const removeProducts = () => {
  productsTag.innerHTML = "";
}

const applyFilter = (e) => {
  if (!e.target.classList.contains("category")) {
    return;
  }

  const category = e.target.dataset.category;
  if (!category) {
    const initialProducts = retrieveProducts(0, cardAmount);
    removeProducts();
    renderProducts(initialProducts);
    return;
  }
  const filteredProducts = getProductsByCategory(category);
  removeProducts();
  renderProducts(filteredProducts);
};

const renderMoreCards = () => {
  const currentCardsAmount = productsTag.children.length;
  const nextProducts = retrieveProducts(currentCardsAmount, currentCardsAmount + cardAmount);
  renderProducts(nextProducts);

  if(currentCardsAmount + cardAmount >= getListLength()) {
    btnShowMore.classList.add("hidden");
  }
}

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
      cartMenu.classList.remove("open-cart");
      return;
    }
    overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
  barsMenu.classList.remove("open-menu");
  return;    
  }
  overlay.classList.toggle("show-overlay");
};

const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar-link")) {
    return;
  }
  barsMenu.classList.remove("open-menu");
  overlay.classList.remove("show-overlay")
};

const closeOnScroll = () => {
  if (
    !barsMenu.classList.contains("open.menu") && 
    !cartMenu.classList.contains("open.cart")
    ) {
      return;
    }
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

const init = () => {
  const initialProducts = retrieveProducts(0, cardAmount);
  renderProducts(initialProducts);
  categories.addEventListener("click", applyFilter);
  btnShowMore.addEventListener("click", () => renderMoreCards());
  barsBtn.addEventListener("click", toggleMenu);
  cartBtn.addEventListener("click", toggleCart);
  barsMenu.addEventListener("click", closeOnClick);
  window.addEventListener("scroll", closeOnScroll);
};

init();