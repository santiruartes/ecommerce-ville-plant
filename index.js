const products = document.querySelector(".product__container")
const btnShowMore = document.querySelector(".btn-show-more")
const categories = document.querySelector(".categories")
const categoryList = document.querySelectorAll(".category")

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList))
};

const renderProduct = (product) => {
    const {id, name, cost, cardImg} = product
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

const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.divideProducts[index].map(renderProduct).join("");
};

const renderFilterProducts = (category) => {
    const productData = productList.filter((product) => {
        return product.category === category;
    })
    products.innerHTML = productData.map(renderProduct).join("")
};

const renderProducts = (index = 0, category = undefined) => {
    if (!category) {
        renderDividedProducts(index);
        return;
    }
    renderFilterProducts(category);
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


const changeFilterState = (e) => {
    const selectedCategory = e.target.dataset.category
    changeBtnState(selectedCategory);
    StatusOfBtnShowMore(selectedCategory);
}

const applyFilter = (e) => {
    if (!e.target.classList.contains("category")) {
      return
    } else {
      changeFilterState(e)
    }
    if (!e.target.dataset.category) {
      products.innerHTML = "";
      renderProducts();
    } else {
      renderProducts(0, e.target.dataset.category);
      productsController.nextProductsIndex = 1;
    }
};


const init = () => {
    renderProducts();
    categories.addEventListener("click", applyFilter);
};

init();