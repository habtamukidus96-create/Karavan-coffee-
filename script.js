// ============================
// HAMBURGER MENU
// ============================

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

function closeMenu() {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
}

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", closeMenu);

document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// ============================
// RESERVATION SYSTEM
// ============================

const reservationForm = document.getElementById("reservationForm");
const successMessage = document.getElementById("successMessage");

function loadDashboard() {

    let reservations =
        JSON.parse(localStorage.getItem("reservations")) || [];

    document.getElementById("totalReservations").textContent =
        reservations.length;

    document.getElementById("totalLeads").textContent =
        reservations.length;
}

loadDashboard();

reservationForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const reservation = {

        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        guests: document.getElementById("guests").value,
        message: document.getElementById("message").value

    };

    let reservations =
        JSON.parse(localStorage.getItem("reservations")) || [];

    reservations.push(reservation);

    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );

    successMessage.innerHTML =
        "✅ Reservation saved successfully.";

    reservationForm.reset();

    loadDashboard();

});

// ============================
// AI CHATBOT
// ============================

const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");

chatToggle.addEventListener("click", () => {
    chatBox.classList.toggle("active");
});

function addMessage(message, sender) {

    const div = document.createElement("div");

    div.classList.add(sender);

    div.innerText = message;

    chatBody.appendChild(div);

    chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(text) {

    text = text.toLowerCase();

    if (
        text.includes("hour") ||
        text.includes("open") ||
        text.includes("close")
    ) {
        return "🕒 We are open daily from 7:00 AM to 10:00 PM.";
    }

    if (
        text.includes("wifi") ||
        text.includes("internet")
    ) {
        return "📶 Yes, free Wi-Fi is available for customers.";
    }

    if (
        text.includes("menu") ||
        text.includes("coffee")
    ) {
        return "☕ We offer Macchiato, Cappuccino, Latte, Pastries and more.";
    }

    if (
        text.includes("reserve") ||
        text.includes("booking")
    ) {
        return "📅 You can reserve a table using the reservation form.";
    }

    if (
        text.includes("location") ||
        text.includes("where")
    ) {
        return "📍 Karavan Coffee - Addis Ababa.";
    }

    if (
        text.includes("contact") ||
        text.includes("phone")
    ) {
        return "📞 Contact Kidus Digital: 0912643473";
    }

    return "👋 Thanks for your message. Please contact us via WhatsApp for more details.";
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {
        sendMessage();
    }

});

function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    userInput.value = "";

    setTimeout(() => {

        addMessage(
            botReply(message),
            "bot"
        );

    }, 600);

}

// ============================
// ANIMATION ON SCROLL
// ============================

const cards = document.querySelectorAll(
    ".feature-card, .menu-card, .agency-card, .stat-card"
);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";

        }

    });

});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";

    observer.observe(card);

});

// ============================
// WHATSAPP LEAD BUTTON
// ============================

function sendReservationToWhatsApp() {

    let reservations =
        JSON.parse(localStorage.getItem("reservations")) || [];

    if (reservations.length === 0) {
        alert("No reservations available.");
        return;
    }

    let latest =
        reservations[reservations.length - 1];

    let text =
`New Reservation

Name: ${latest.name}
Phone: ${latest.phone}
Date: ${latest.date}
Time: ${latest.time}
Guests: ${latest.guests}
Message: ${latest.message}`;

    window.open(
        "https://wa.me/251912643473?text=" +
        encodeURIComponent(text),
        "_blank"
    );

}

// ============================
// CONSOLE MESSAGE
// ============================

console.log(
"Kidus Digital Website Loaded Successfully 🚀"
);
