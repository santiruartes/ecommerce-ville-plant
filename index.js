import { retrieveProducts, getListLength, getProductsByCategory } from "./data"
import { cardAmount } from "./constants"
const productsTag = document.querySelector(".product__container")
const btnShowMore = document.querySelector(".btn-show-more")
const categories = document.querySelector(".categories")
const categoryList = document.querySelectorAll(".category")
const barsBtn = document.querySelector(".menu-label")
const barsMenu = document.querySelector(".header__navbar__list")
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

const renderFilterProducts = (category) => {
    const productData = productList.filter((product) => {
        return product.category === category;
    })
    productsTag.innerHTML = productData.map(renderProduct).join("")
};

const renderProducts = (products = []) => {
  products.forEach((product) => {
    const productHTML = renderProduct(product);
    productsTag.innerHTML += productHTML;
  });
};

const StatusOfBtnShowMore = (category) => {
  if (!category) {
    btnShowMore.classList.remove("hidden");
    return
  }
  btnShowMore.classList.add("hidden");
};


const changeBtnState = (selectedCategory) => {
  const categories = [...categoryList];
  categories.forEach( (categoryBtn) => {
    if(categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
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
}

const init = () => {
  const initialProducts = retrieveProducts(0, cardAmount);
  renderProducts(initialProducts);
  categories.addEventListener("click", applyFilter);
  btnShowMore.addEventListener("click", () => renderMoreCards());
  barsBtn.addEventListener("click", toggleMenu);
};

init();