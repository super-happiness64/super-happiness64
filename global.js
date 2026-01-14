// --- FILTER ---
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

// --- MODAL Window ---
function renderCartItems() {
    const listContainer = document.getElementById('cartItemsList');
    const cart = JSON.parse(sessionStorage.getItem('nurseryCart')) || [];
    
    if (cart.length === 0) {
        listContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        listContainer.innerHTML = cart.map(item => `
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding:5px;">
                <span>${item.name}</span>
                <span>${item.price}</span>
            </div>
        `).join('');
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

// --- CART BUTTOn ---
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

// --- CLEAR CART ---
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('clear-cart-btn')) {
        sessionStorage.removeItem('nurseryCart');
        renderCartItems();
        alert("Cart cleared");
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

// --- CONTACT FORMS ---
document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Thank you for subscribing.");
        this.reset();
    });
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

// --- CALENDAR ---

let year = 2026;
let month = 4;

const events = {
  "2026-05-03": "Compost Day at 2pm",
  "2026-05-06": "Weeding party 9am",
  "2026-05-10": "Workshop at 11am",
  "2026-05-21": "Seed Swap at 1pm",
  "2026-05-28": "Potluck at Park! at 5pm"
};

const calendar = document.getElementById("calendar");
const title = document.getElementById("calendar-title");

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function renderCalendar() {
  calendar.innerHTML = "";
  title.textContent = `${monthNames[month]} ${year}`;

  ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d => {
    const el = document.createElement("div");
    el.className = "day-name";
    el.textContent = d;
    calendar.appendChild(el);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const el = document.createElement("div");
    el.className = "day";
    el.textContent = day;

    const key = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

    if (events[key]) {
      el.classList.add("event");
      el.setAttribute("data-event", events[key]);
    }

    calendar.appendChild(el);
  }
}

document.getElementById("prev").onclick = () => {
  month--;
  if (month < 0) { month = 11; year--; }
  renderCalendar();
};

document.getElementById("next").onclick = () => {
  month++;
  if (month > 11) { month = 0; year++; }
  renderCalendar();
};

renderCalendar();
