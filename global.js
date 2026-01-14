// FILTERBAR ---
const checkboxes = document.querySelectorAll('.filter-sidebar input');
const cards = document.querySelectorAll('.card');

checkboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    const activeCategories = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
    cards.forEach(card => {
      const category = card.dataset.category;
      card.style.display = activeCategories.includes(category) ? 'flex' : 'none';
    });
  });
});

// MODAL
function renderCartItems() {
    const listContainer = document.getElementById('cartItemsList');
    const cart = JSON.parse(sessionStorage.getItem('nurseryCart')) || [];
    
    if (cart.length === 0) {
        listContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        listContainer.innerHTML = cart.map(item =>
            '<div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding:5px;">' +
                '<span>' + item.name + '</span>' +
                '<span>' + item.price + '</span>' +
            '</div>'
        ).join('');
    }
}

const openBtn = document.getElementById('openModalLink');
if (openBtn) {
    openBtn.onclick = function(e) {
        e.preventDefault();
        renderCartItems(); 
        document.getElementById('myModal').classList.add('show-modal');
    };
}

const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.onclick = function() {
        document.getElementById('myModal').classList.remove('show-modal');
    };
}

// CART BUTTONs
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.card');
        const plantName = card.querySelector('h3').innerText;
        const plantPrice = card.querySelector('.price').innerText;

        let cart = JSON.parse(sessionStorage.getItem('nurseryCart')) || [];
        cart.push({ name: plantName, price: plantPrice });
        sessionStorage.setItem('nurseryCart', JSON.stringify(cart));
        
        alert(plantName + " added to the cart");
    });
});

if (e.target.classList.contains('clear-cart-btn')) {
    let cart = JSON.parse(sessionStorage.getItem('nurseryCart')) || [];
    if (cart.length === 0) {
        alert("No items to clear");
    } else {
        sessionStorage.removeItem('nurseryCart');
        renderCartItems();
        alert("Cart cleared");
    }
}
    if (e.target.classList.contains('process-order-btn')) {
        if (sessionStorage.getItem('nurseryCart')) {
            sessionStorage.removeItem('nurseryCart');
            renderCartItems();
            alert("Thank you for your order!");
            document.getElementById('myModal').classList.remove('show-modal');
        } else {
            alert("Your cart is empty!");
        }
    }
});

// Contact  forms
document.addEventListener('submit', function (e) {
  if (e.target.matches('.newsletter-form')) {
    e.preventDefault();
    alert("Thank you for subscribing.");
    e.target.reset(); 
  }
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerData = {
            email: document.getElementById('email')?.value || "No Email",
            phone: document.getElementById('phone')?.value || "No Phone",
            orderInfo: document.getElementById('custom-option')?.value || "Custom Order",
            comment: document.getElementById('comment')?.value || ""
        };

        localStorage.setItem('customerProfile', JSON.stringify(customerData));

        alert("Thank you for your message. Your information has been saved!");
        
        console.log("Saved to LocalStorage:", customerData);
        this.reset();
    });
}
