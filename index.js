const products = document.querySelector(".product__container")

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList))
};

const renderProduct = (product) => {
    const {id, name, cost, cardImg} = product
    return `<div class="card__container">
    <img src="${cardImg}" alt="${name}" />
    <div class="card__info">
      <div class="product-top">
        <h3>${name}</h3>
      </div>
      <div class="product-bot">
        <div>
          <p>
            $${cost}
            Descripción: Estos productos son de alta calidad, producidos en
            ambientes ciudados, con abono orgánico
          </p>
        </div>
      </div>
      <button
        class="add-btn"
        data-id="${id}"
        data-name="${name}"
        data-cost="${cost}"
        data-img="${cardImg}"
      >
        Add
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

const init = () => {
    renderProducts();
};

init();