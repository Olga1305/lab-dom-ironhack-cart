let products = [
  {
    name: "IronBubble - head",
    price: 25
  },
  {
    name: "IronShirt",
    price: 15
  }
];

function initialProductList(products) {
  var section = document.querySelector(".productList");
  products.forEach(function(item) {
    var product = document.createElement("div");
    product.className = "product";
    product.innerHTML = `<span class="name">${item.name}</span>          
                          <span class="price">$${item.price}</span>
                          <span class="input"><span class="label">QTY</span><span><input type="number" class="quantity" min="0"></span></span>
                          <span class="productTotal">$0</span>
                          <span><button class="btn btn-delete">Delete</button></span>`;

    section.appendChild(product);
  });
  var body = document.querySelector("body");
  var total = document.createElement("div");
  total.className = "total";
  total.innerHTML = `<h2>Total Price: <span>$0</span></h2>`;
  body.appendChild(total);
  var inputs = document.querySelector(".inputs");
  var newProductInput = document.createElement("div");
  newProductInput.className = "new-product";
  newProductInput.innerHTML = `<span class="new-input">Product name: <input type="text" id="input-name"></span>
                               <span class="new-input">Product price: <input type="number" id="input-price" min="0"></span>
                               <span><button class="btn" id="new-item-create">Create new product</button></span>`;
  inputs.prepend(newProductInput);
}

function getTotalPrice() {
  for (var i = 0; i < products.length; i++) {
    var productTotal = document.getElementsByClassName("productTotal")[i];
    var productQuantity = document.getElementsByTagName("input")[i].value;
    productTotal.innerHTML = `$${products[i].price * productQuantity}`;
    products[i].quantity = productQuantity;
  }
  var total = document.querySelector(".total");
  var grossTotal = products.reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  total.innerHTML = `<h2>Total Price: <span>$${grossTotal}</span></h2>`;
}

function deleteItem(event) {
  var toDelete = event.target.parentNode.parentNode;
  var productName = event.target.parentNode.parentNode.querySelector(".name")
    .innerHTML;
  for (var i = 0; i < products.length; i++) {
    if (products[i].name === productName) {
      var removedProduct = products.splice(i, 1);
      return products;
    }
  }
  var list = document.querySelector(".productList");
  list.removeChild(toDelete);
  getTotalPrice();
}

function createNewItem() {
  var inputName = document.querySelector("#input-name");
  var inputPrice = document.querySelector("#input-price");
  var section = document.querySelector(".productList");
  var product = document.createElement("div");
  product.className = "product";
  product.innerHTML = `<span class="name">${inputName.value}</span>          
                       <span class="price">$${inputPrice.value}</span>
                       <span class="input"><span class="label">QTY</span><span><input type="number" class="quantity" min="0"></span></span>
                       <span class="productTotal">$0</span>
                       <span><button class="btn btn-delete">Delete</button></span>`;

  section.appendChild(product);

  var newProduct = {};
  newProduct.name = inputName.value;
  newProduct.price = inputPrice.value;
  products.push(newProduct);

  var button = product.querySelector("button");
  button.addEventListener("click", deleteItem);
  inputName.value = "";
  inputPrice.value = 0;

  getTotalPrice();
}

window.onload = function() {
  initialProductList(products);
  var calculatePriceButton = document.getElementById("calc-prices-button");
  var createItemButton = document.getElementById("new-item-create");
  var deleteButtons = document.getElementsByClassName("btn-delete");

  calculatePriceButton.onclick = getTotalPrice;
  createItemButton.onclick = createNewItem;

  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].onclick = deleteItem;
  }
};
