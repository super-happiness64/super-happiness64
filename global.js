const checkboxes = document.querySelectorAll('.filter-sidebar input');
const cards = document.querySelectorAll('.card');

checkboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    const activeCategories = Array.from(checkboxes)
      .filter(c => c.checked)
      .map(c => c.value);

    cards.forEach(card => {
      const category = card.dataset.category;
      // Using 'flex' instead of 'block' to keep your card styling intact
      card.style.display = activeCategories.includes(category) ? 'flex' : 'none';
    });
  });
});

// Footer Subscribe Alert
document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents page from reloading
        alert("Thank you for subscribing.");
        this.reset(); // Clears the email input
    });
});

let cartItems = 0; // Tracks if the cart is empty or not

// Add to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        cartItems++;
        alert("Item added to the cart");
    });
});

// Clear Cart
const clearBtn = document.querySelector('.clear-cart-btn'); // Ensure your button has this class
if (clearBtn) {
    clearBtn.addEventListener('click', function() {
        if (cartItems > 0) {
            cartItems = 0;
            alert("Cart cleared");
        } else {
            alert("No items to clear.");
        }
    });
}

// Process Order
const processBtn = document.querySelector('.process-order-btn'); // Ensure your button has this class
if (processBtn) {
    processBtn.addEventListener('click', function() {
        if (cartItems > 0) {
            cartItems = 0; // Optional: Reset cart after order
            alert("Thank you for your order");
        } else {
            alert("Cart is empty.");
        }
    });
}

// Contact Form Alert
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Thank you for your message");
        this.reset();
    });
}

//CALENDAR

let year = 2026;
let month = 4; // 0 = Jan, 1 = Feb...

// 🌼 Define events by YYYY-MM-DD
const events = {
  "2026-05-03": "Community compost day – 2pm",
  "2026-05-06": "Weeding party – 9am",
  "2026-05-10": "Children's planting workshop – 11am",
  "2026-05-21": "Spring seed swap – 1pm",
  "2026-05-28": "Harvest & potluck – 5pm"
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

  // Day names
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
