window.onscroll = function() {scrollFunction()};
    

const menuButton = document.getElementById("menuButton");
const cancelButton = document.getElementById("cancelButton");
const navigationLinks = document.getElementById("navigationLinks");

menuButton.addEventListener("click", function () {
    navigationLinks.classList.add("active");
    menuButton.style.display = "none";
    cancelButton.style.display = "flex";
    navigationLinks.style.top = "0";
});

cancelButton.addEventListener("click", function () {
    navigationLinks.classList.remove("active");
    menuButton.style.display = "flex";
    cancelButton.style.display = "none";
    navigationLinks.style.top = "-100%";
});

document.addEventListener("click", function (event) {
    if (!navigationLinks.contains(event.target) && !menuButton.contains(event.target)) {
        navigationLinks.style.top = "-100%";
        menuButton.style.display = "flex";
        cancelButton.style.display = "none";
    }
});

function scrollFunction() {
    if (window.innerWidth > 599) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            document.getElementById("header").style.backgroundColor = "#ec174d";
            document.getElementById("header-container").style.height = "50px";
        } else {
            document.getElementById("header").style.backgroundColor = "#00000000";
            document.getElementById("header-container").style.height = "90px";
        }
    } else {

    }

}





const cards = [
    {
        title: "Dorofeeva",
        location: "Kyiv, Palace of sports",
        date: new Date("April 12, 2026 19:00"),
        price: 590,
        image: "https://storage.concert.ua/JU9/8/rk/67cc0a5145251/5253.jpg:31-catalog-event_item-desktop2x"
    },
    {
        title: "Solo concert Edwart",
        location: "Lutsk, Lutsk Palace of Culture",
        date: new Date("May 31, 2025 19:00"),
        price: 300,
        image: "https://storage.concert.ua/JU9/15/GN/67d56a086cd64/cd6b.png:31-catalog-event_item-desktop"
    },
    {
        title: "Zhadan i sobaky",
        location: "Lviv, !FESTrepublic territory",
        date: new Date("May 3, 2025 18:00"),
        price: 300,
        image: "https://storage.concert.ua/JU9/31/HP/679c9d97382b5/82b8.jpg:31-catalog-event_item-desktop2x"
    },
    {
        title: "Monatik. Only you can do that.",
        location: "Kyiv, Palace of sports",
        date: new Date("September 20, 2025"),
        price: 490,
        image: "https://storage.concert.ua/JU9/4/e0/67a1d9f8f2c4a/2c4e.jpg:31-catalog-event_item-desktop2x"
    },
    {
        title: "Bez obmezhen",
        location: "Kyiv, Palace of sports",
        date: new Date("May 8, 2025"),
        price: 300,
        image: "https://storage.concert.ua/JU9/12/vZ/67d1c587eef9e/efa1.jpg:31-catalog-event_item-desktop2x"
    }
]

const cardsGrid = document.querySelector(".cards-grid");
const myTicketsContainer = document.querySelector(".my-tickets"); // Контейнер для куплених квитків
cardsGrid.innerHTML = "";

// Завантажуємо квитки з localStorage
let myTickets = JSON.parse(localStorage.getItem("myTickets")) || [];

let now = new Date();
let i = 0;

while (i < cards.length) {
    const card = cards[i];

    if (card.date > now) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const cardImage = document.createElement("img");
        cardImage.classList.add("card-img");
        cardImage.src = card.image;

        const cardDetailContainer = document.createElement("div");
        cardDetailContainer.classList.add("card-detail-container");

        const cardDate = document.createElement("span");
        cardDate.classList.add("card-date");
        cardDate.textContent = card.date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(' at', '') + ", " +
            card.date.toLocaleDateString('en-GB', { weekday: 'short' });

        const cardTitle = document.createElement("h2");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = card.title;

        const cardLocation = document.createElement("span");
        cardLocation.classList.add("card-location");
        cardLocation.textContent = card.location;

        const cardPrice = document.createElement("span");
        cardPrice.classList.add("card-price");
        cardPrice.textContent = "from " + card.price + " ₴";

        const cardOverlay = document.createElement("div");
        cardOverlay.classList.add("card-overlay");

        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-container");

        const decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-";
        decreaseBtn.classList.add("quantity-btn");

        const quantityDisplay = document.createElement("span");
        quantityDisplay.textContent = "1";
        quantityDisplay.classList.add("quantity-display");

        const increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";
        increaseBtn.classList.add("quantity-btn");

        const totalPriceDisplay = document.createElement("span");
        totalPriceDisplay.classList.add("total-price");
        totalPriceDisplay.textContent = `${card.price} ₴`;

        const cardButton = document.createElement("div");
        cardButton.classList.add("card-button");
        cardButton.textContent = "Buy";

        let count = 1;
        function updateTotalPrice() {
            quantityDisplay.textContent = count;
            totalPriceDisplay.textContent = `${card.price * count} ₴`;
        }

        decreaseBtn.addEventListener("click", () => {
            if (count > 1) {
                count--;
                updateTotalPrice();
            }
        });

        increaseBtn.addEventListener("click", () => {
            if (count < 9) {
                count++;
                updateTotalPrice();
            }
        });

        // Перевіряємо, чи вже куплено
        const isBought = myTickets.some(ticket => ticket.title === card.title);
        if (isBought) {
            cardButton.textContent = "Bought";
            // cardButton.classList.add("card-button");
            cardButton.style.pointerEvents = "none";
            quantityContainer.style.display = "none";
            totalPriceDisplay.style.display = "none";
        }

        cardButton.addEventListener("click", () => {
            if (!isBought) {
                // Додаємо квиток у список
                myTickets.push({
                    image: card.image,
                    title: card.title,
                    location: card.location,
                    date: card.date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                    }).replace(' at', '') + ", " + card.date.toLocaleDateString('en-GB', { weekday: 'short' }),
                    count: count,
                    price: card.price
                });

                // Зберігаємо в localStorage
                localStorage.setItem("myTickets", JSON.stringify(myTickets));

                // Оновлюємо секцію "Мої квитки"
                // renderMyTickets();

                // Міняємо текст кнопки
                cardButton.textContent = "Bought";
                cardButton.style.pointerEvents = "none";
                quantityContainer.style.display = "none";
                totalPriceDisplay.style.display = "none";
            }
        });

        quantityContainer.appendChild(decreaseBtn);
        quantityContainer.appendChild(quantityDisplay);
        quantityContainer.appendChild(increaseBtn);

        cardOverlay.appendChild(quantityContainer);
        cardOverlay.appendChild(totalPriceDisplay);
        cardOverlay.appendChild(cardButton);

        cardDetailContainer.appendChild(cardDate);
        cardDetailContainer.appendChild(cardTitle);
        cardDetailContainer.appendChild(cardLocation);
        cardDetailContainer.appendChild(cardPrice);

        cardElement.appendChild(cardImage);
        cardElement.appendChild(cardDetailContainer);
        cardElement.appendChild(cardOverlay);
        cardsGrid.appendChild(cardElement);
    }
    i++;
}

// Функція відображення "Моїх квитків"
// function renderMyTickets() {
//     myTicketsContainer.innerHTML = "<h2>My Tickets</h2>";

//     myTickets.forEach(ticket => {
//         const ticketElement = document.createElement("div");
//         ticketElement.classList.add("ticket-item");

//         ticketElement.innerHTML = `
//             <h3>${ticket.title}</h3>
//             <p>${ticket.location}</p>
//             <p>${ticket.date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
//             <p>Tickets: ${ticket.count}</p>
//             <p>Total: ${ticket.total} ₴</p>
//         `;

//         myTicketsContainer.appendChild(ticketElement);
//     });
// }

// // Відображаємо збережені квитки при завантаженні сторінки
// renderMyTickets();
