const menuButton = document.getElementById("menuButton");
const cancelButton = document.getElementById("cancelButton");
const navigationLinksMobile = document.getElementById("navigationLinksMobile");

menuButton.addEventListener("click", function () {
    navigationLinksMobile.classList.add("active");
    menuButton.style.display = "none";
    cancelButton.style.display = "flex";
    navigationLinksMobile.style.top = "0";
});

cancelButton.addEventListener("click", function () {
    navigationLinksMobile.classList.remove("active");
    menuButton.style.display = "flex";
    cancelButton.style.display = "none";
    navigationLinksMobile.style.top = "-100%";
});

document.addEventListener("click", function (event) {
    if (!navigationLinksMobile.contains(event.target) && !menuButton.contains(event.target)) {
        navigationLinksMobile.style.top = "-100%";
        menuButton.style.display = "flex";
        cancelButton.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const ticketsContainer = document.querySelector(".tickets");

    // Отримуємо збережені квитки з localStorage
    let myTickets = JSON.parse(localStorage.getItem("myTickets")) || [];

    // Функція для оновлення відображення квитків
    function renderTickets() {
        ticketsContainer.innerHTML = ""; // Очищаємо блок перед оновленням

        if (myTickets.length === 0) {
            ticketsContainer.innerHTML = `<p class="tickets-empty">No tickets yet.</p>`;
            return;
        }

        myTickets.forEach((ticket, index) => {
            const ticketElement = document.createElement("div");
            ticketElement.classList.add("ticket");

            ticketElement.innerHTML = `
                <div class="ticket-img-container">
                    <img class="ticket-img" src="${ticket.image}" alt="">
                </div>
                <div class="ticket-detail-container">
                    <span class="ticket-location">${ticket.location}</span>
                    <h2 class="ticket-title">${ticket.title}</h2>
                    <span class="ticket-date">${ticket.date}</span>
                    <span class="ticket-price">${ticket.price} ₴</span>
                    <button class="cancel-button" data-index="${index}">🗑</button>
                </div>
            `;

            ticketsContainer.appendChild(ticketElement);
        });

        // Додаємо обробник подій для кнопок "Cancel"
        document.querySelectorAll(".cancel-button").forEach(button => {
            button.addEventListener("click", function () {
                const ticketIndex = this.getAttribute("data-index");
                myTickets.splice(ticketIndex, 1); // Видаляємо квиток із масиву
                localStorage.setItem("myTickets", JSON.stringify(myTickets)); // Оновлюємо сховище
                renderTickets(); // Оновлюємо сторінку
            });
        });
    }

    renderTickets();
});