const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Ratings: <b>${product.rating.rate}</b>, Rated By: <b>${product.rating.count}</b> Users</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="getDetails(${product.id})" id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// add to cart function
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// convert text value to float
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    const setTotalTax = priceConverted * 0.2;
    const totalTax = setTotalTax.toFixed(2)
    setInnerText("total-tax", totalTax);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    const setTotalTax = priceConverted * 0.3;
    const totalTax = setTotalTax.toFixed(2)
    setInnerText("total-tax", totalTax);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    const setTotalTax = priceConverted * 0.4;
    const totalTax = setTotalTax.toFixed(2)
    setInnerText("total-tax", totalTax);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

//get product details by id
const getDetails = id => {
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data))
}

//show product details
const showDetails = product => {
  const modal = document.getElementById('modal-body-id')
  const productDetailsDiv = document.createElement("div")
  productDetailsDiv.innerHTML = `
  <p>Product ID: ${product.id}</p>
  <p>Product Title: ${product.title}</p>
  <p>Product Price: ${product.price} dollars</p>
  <p>Product Category: ${product.category}</p>
  `
  modal.appendChild(productDetailsDiv)
}

//clear modal on close
const clearModal = () => {
  const modal = document.getElementById('modal-body-id')
  modal.innerText = ''
}