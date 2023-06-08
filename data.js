const productList = [
    {
        id: 1,
        name: "Hoya carnosa",
        category: "interior",
        cost: 5,
        cardImg: "assets/products/inside-product-1.jpg",

    },
    {
        id: 2,
        name: "Aloe vera",
        category: "interior",
        cost: 7,
        cardImg: "assets/products/inside-product-2.jpg",

    },
    {
        id: 3,
        name: "Echeveria",
        category: "interior",
        cost: 7,
        cardImg: "assets/products/inside-product-3.jpg",

    },
    {
        id: 4,
        name: "Tradescantia zebrina",
        category: "exterior",
        cost: 8,
        cardImg: "assets/products/outside-product-1.jpg",

    },
    {
        id: 5,
        name: "Pelargonium crispum",
        category: "exterior",
        cost: 10,
        cardImg: "assets/products/outside-product-2.jpg",

    },
    {
        id: 6,
        name: "Tagetes erecta",
        category: "pet-friendly",
        cost: 9.50,
        cardImg: "assets/products/pet-friendly-product-1.jpg",

    },
    {
        id: 7,
        name: "Aster",
        category: "pet-friendly",
        cost: 9.50,
        cardImg: "assets/products/pet-friendly-product-2.jpg",

    },
    {
        id: 8,
        name: "Callistephus",
        category: "pet-friendly",
        cost: 9.50,
        cardImg: "assets/products/pet-friendly-product-3.jpg",

    },

]   

export const retrieveProducts = (startIndex, lastIndex) => {
    return productList.slice(startIndex, lastIndex);
}

export const getListLength = () => productList.length;

export const getProductsByCategory = (category) => {
    return productList.filter((product) => {
        return product.category === category;
    })
}