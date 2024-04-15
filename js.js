document.addEventListener('DOMContentLoaded', function() {
  // Get all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  // Add event listener to each "Add to Cart" button
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  // Function to add item to cart and save to localStorage
  function addToCart(event) {
    const button = event.target;
    const card = button.closest('.card');
    const productName = card.querySelector('.card-title').textContent;
    const productPrice = card.querySelector('.card-price').textContent;

    const item = {
      name: productName,
      price: productPrice
    };

    // Get existing cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Add new item to cart
    cartItems.push(item);
    // Store updated cart items back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Redirect to the other page
    window.location.href = 'other_page.html';
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsContainer = document.getElementById('cart-items-container');

  // Display cart items
  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.textContent = item.name + ' - ' + item.price;
    cartItemsContainer.appendChild(itemElement);
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsContainer = document.getElementById('cart-items-container');

  // Display cart items
  cartItems.forEach((item, index) => {
    const itemElement = document.createElement('div');
    const imageElement = document.createElement('img');
    const nameElement = document.createElement('p');
    const deleteButton = document.createElement('button');

    imageElement.src = item.image;
    nameElement.textContent = item.name;
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      // Remove the item from the cartItems array
      cartItems.splice(index, 1);
      // Update localStorage with the modified cartItems array
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // Update the UI to reflect the change
      displayCartItems();
    });

    itemElement.appendChild(imageElement);
    itemElement.appendChild(nameElement);
    itemElement.appendChild(deleteButton);
    cartItemsContainer.appendChild(itemElement);
  });
});

function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsContainer = document.getElementById('cart-items-container');
  
  // Clear previous items in the cart
  cartItemsContainer.innerHTML = '';

  // Display cart items
  cartItems.forEach((item, index) => {
    const itemElement = document.createElement('div');
    const imageElement = document.createElement('img');
    const nameElement = document.createElement('p');
    const deleteButton = document.createElement('button');

    imageElement.src = item.image;
    nameElement.textContent = item.name;
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      // Remove the item from the cartItems array
      cartItems.splice(index, 1);
      // Update localStorage with the modified cartItems array
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // Update the UI to reflect the change
      displayCartItems();
    });

    itemElement.appendChild(imageElement);
    itemElement.appendChild(nameElement);
    itemElement.appendChild(deleteButton);
    cartItemsContainer.appendChild(itemElement);
  });
}
