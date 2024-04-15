document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items-container');
  
    // Display cart items with radio buttons for deletion and input fields for quantity adjustment
    cartItems.forEach(item => {
      const itemElement = document.createElement('div');
      const itemNamePrice = document.createElement('span');
      itemNamePrice.textContent = item.name + ' - ' + item.price;
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.value = item.quantity || 1; // Set default quantity to 1
      quantityInput.min = 1;
      quantityInput.addEventListener('change', function() {
        updateQuantity(item, parseInt(this.value));
      });
      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = 'itemToDelete'; // Set the same name for all radio buttons
      radioButton.value = JSON.stringify(item); // Store item object as value
      itemElement.appendChild(itemNamePrice);
      itemElement.appendChild(quantityInput);
      itemElement.appendChild(radioButton);
      cartItemsContainer.appendChild(itemElement);
    });
  });
  
  function editCart() {
    // Refresh the page to reflect changes
    location.reload();
  }
  
  function updateQuantity(item, quantity) {
    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Find the item to update
    const index = cartItems.findIndex(cartItem => cartItem.name === item.name && cartItem.price === item.price);
  
    // Update the quantity of the item
    if (index !== -1) {
      cartItems[index].quantity = quantity;
    }
  
    // Update cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  
  function deleteSelected() {
    // Get the selected radio button
    const radioButton = document.querySelector('input[name="itemToDelete"]:checked');
  
    if (radioButton) {
      const itemToDelete = JSON.parse(radioButton.value);
      removeFromCart(itemToDelete);
      radioButton.parentNode.remove(); // Remove the item from the DOM
    }
  }
  
  function removeFromCart(item) {
    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Filter out the item to delete
    cartItems = cartItems.filter(cartItem => {
      return cartItem.name !== item.name || cartItem.price !== item.price;
    });
  
    // Update cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  
  function checkout() {
    // Perform checkout process (e.g., send cart items to server, handle payment, etc.)
    // After completing the checkout process, you can redirect to a confirmation page
    window.location.href = 'confirmation_page.html';
  }

  
  document.addEventListener('DOMContentLoaded', function() {
    // Load saved address on page load
    loadAddress();
  
    // Handle form submission
    const addressForm = document.getElementById('addressForm');
    addressForm.addEventListener('submit', function(event) {
      event.preventDefault();
      saveAddress();
    });
  });
  
  function saveAddress() {
    // Get form input values
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipcode = document.getElementById('zipcode').value;
  
    // Save address to local storage
    const address = { street, city, state, zipcode };
    localStorage.setItem('address', JSON.stringify(address));
  
    // Load saved address
    loadAddress();
  }
  
  function loadAddress() {
    // Load address from local storage
    const savedAddress = localStorage.getItem('address');
    if (savedAddress) {
      const address = JSON.parse(savedAddress);
  
      // Display address
      const currentAddressDiv = document.getElementById('currentAddress');
      currentAddressDiv.innerHTML = `
        <p><strong>Street:</strong> ${address.street}</p>
        <p><strong>City:</strong> ${address.city}</p>
        <p><strong>State:</strong> ${address.state}</p>
        <p><strong>ZIP Code:</strong> ${address.zipcode}</p>
      `;
    }
  }
  
  function deleteAddress() {
    // Remove address from local storage
    localStorage.removeItem('address');
  
    // Clear address display
    const currentAddressDiv = document.getElementById('currentAddress');
    currentAddressDiv.innerHTML = '';
  
    // Optionally, you can display a message to the user confirming the deletion
    alert('Address deleted successfully.');
  }

  
  