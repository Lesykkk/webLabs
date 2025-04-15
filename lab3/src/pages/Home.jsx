import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const [cards, setCards] = useState([])
  const [myTickets, setMyTickets] = useState([])
  const [quantities, setQuantities] = useState({})
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const filteredCards = cards.filter(card => {
    const cardTime = card.date.getTime();
    const fromTime = fromDate ? new Date(fromDate).getTime() : null;
    const toTime = toDate ? new Date(toDate).getTime() : null;
  
    return (!fromTime || cardTime >= fromTime) && (!toTime || cardTime <= toTime);
  });
  

  useEffect(() => {
    const loadedTickets = JSON.parse(localStorage.getItem("myTickets")) || [];
    setMyTickets(loadedTickets);

    const allCards = [
      {
        title: "Dorofeeva",
        location: "Kyiv, Palace of sports",
        date: new Date("April 22, 2025 19:00"),
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
    ];

    const futureEvents = allCards.filter(card => card.date > new Date());
    const initialQuantities = {};
    futureEvents.forEach(card => {
      initialQuantities[card.title] = 1;
    });

    setCards(futureEvents);
    setQuantities(initialQuantities);
  }, []);
  
  // 1. Scroll effect
  useEffect(() => {
    const scrollFunction = () => {
      const header = document.getElementById("header");
      const container = document.getElementById("header-container");
      if (!header || !container) return;

      if (window.innerWidth > 599) {
        if (window.scrollY > 100) {
          header.style.backgroundColor = "#ec174d";
          container.style.height = "50px";
        } else {
          header.style.backgroundColor = "transparent";
          container.style.height = "90px";
        }
      }
    };

    window.addEventListener("scroll", scrollFunction);
    scrollFunction();
    return () => window.removeEventListener("scroll", scrollFunction);
  }, []);

  // 2. Mobile menu toggle
  useEffect(() => {
    const menuButton = document.getElementById("menuButton");
    const cancelButton = document.getElementById("cancelButton");
    const navigationLinks = document.getElementById("navigationLinksMobile");

    const openMenu = () => {
      navigationLinks.classList.add("active");
      navigationLinks.style.top = "0";
      menuButton.style.display = "none";
      cancelButton.style.display = "flex";
    };

    const closeMenu = () => {
      navigationLinks.classList.remove("active");
      navigationLinks.style.top = "-100%";
      menuButton.style.display = "flex";
      cancelButton.style.display = "none";
    };

    if (menuButton && cancelButton && navigationLinks) {
      menuButton.addEventListener("click", openMenu);
      cancelButton.addEventListener("click", closeMenu);

      const outsideClick = (event) => {
        if (
          !navigationLinks.contains(event.target) &&
          !menuButton.contains(event.target) &&
          event.target.id !== "cancelButton"
        ) {
          closeMenu();
        }
      };

      document.addEventListener("click", outsideClick);

      return () => {
        menuButton.removeEventListener("click", openMenu);
        cancelButton.removeEventListener("click", closeMenu);
        document.removeEventListener("click", outsideClick);
      };
    }
  }, []);


  const handleQuantityChange = (title, delta) => {
    setQuantities(prev => ({
      ...prev,
      [title]: Math.min(9, Math.max(1, prev[title] + delta))
    }));
  };

  const handleBuy = (card, quantity) => {
    const updatedTickets = [
      ...myTickets,
      {
        image: card.image,
        title: card.title,
        location: card.location,
        date: card.date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit'
        }).replace(' at', '') + ", " + card.date.toLocaleDateString('en-GB', { weekday: 'short' }),
        count: quantity,
        price: card.price
      }
    ];

    setMyTickets(updatedTickets);
    localStorage.setItem("myTickets", JSON.stringify(updatedTickets));
  };

  return (
    <>
      <header id="header" className="header">
        <div id="header-container" className="header-container">
          <nav className="navigation-desktop">
            <div className="navigation-links-desktop">
              <Link className="navigation-link-desktop" to="/">Events</Link>
              <Link className="navigation-link-desktop" to="/about">About</Link>
              <Link className="navigation-link-desktop" to="/tickets">My tickets</Link>
            </div>
          </nav>
          <nav className="navigation-mobile">
            <img src="media/icons/menu-icon2.svg" alt="" className="navigation-button-menu" id="menuButton" />
            <img src="media/icons/cancel-icon1.svg" alt="" className="navigation-button-cancel" id="cancelButton" />
            <div className="navigation-links-mobile" id="navigationLinksMobile">
              <Link className="navigation-link-mobile" to="/">Events</Link>
              <Link className="navigation-link-mobile" to="/about">About</Link>
              <Link className="navigation-link-mobile" to="/tickets">My tickets</Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <div className="promo">
          <div className="promo-img-container">
            <img className="promo-img" src="https://storage.concert.ua/JU9/20/xa/678e3408d81e3/81e6.jpg:31-mainpage-megabanner-desktop" alt="" />
          </div>
          <div className="promo-text-container">
            <span className="promo-date">January 21 - April 13</span>
            <span className="promo-title">Veterans of space forces</span>
            <span className="promo-place">Tour of Ukraine</span>
          </div>
        </div>

        <div className="main-container">
          <h1 className="grid-title">Best sellers now</h1>
          <div className="date-filter">
            <div>
              <span className='filter-text'>
                From:
              </span>
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
              />
            </div>
            <div>
              <span className='filter-text'>
                To:
              </span>
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
              />
            </div>
          </div>
          <div className="cards-grid">
      {filteredCards.map((card, index) => {
        const quantity = quantities[card.title] || 1;
        const isBought = myTickets.some(ticket => ticket.title === card.title);

        return (
                <div className="card" key={index}>
                    <img className="card-img" src={card.image} alt={card.title} />

                    <div className="card-detail-container">
                    <span className="card-date">
                        {card.date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                        }).replace(' at', '')}, {card.date.toLocaleDateString('en-GB', { weekday: 'short' })}
                    </span>
                    <h2 className="card-title">{card.title}</h2>
                    <span className="card-location">{card.location}</span>
                    <span className="card-price">from {card.price} ₴</span>
                    </div>

                    <div className="card-overlay">
                    {!isBought && (
                        <>
                        <div className="quantity-container">
                            <button className="quantity-btn" onClick={() => handleQuantityChange(card.title, -1)}>-</button>
                            <span className="quantity-display">{quantity}</span>
                            <button className="quantity-btn" onClick={() => handleQuantityChange(card.title, 1)}>+</button>
                        </div>
                        <span className="total-price">{card.price * quantity} ₴</span>
                        </>
                    )}

                    <div
                        className="card-button"
                        onClick={() => !isBought && handleBuy(card, quantity)}
                        style={{ pointerEvents: isBought ? "none" : "auto" }}
                    >
                        {isBought ? "Bought" : "Buy"}
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
          <div className="show-button-container">
            <span className="show-button">Show more</span>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <span className="footer-data">
            <p className="footer-data-text">tickets.buy@hotmail.com</p>
            <div className="vl"></div>
            <p className="footer-data-text">+380981234567</p>
          </span>
          <span className="footer-underwrite">
            <p className="footer-underwrite-text">© 2025 All rights reserved</p>
          </span>
        </div>
      </footer>
    </>
  );
}





// import { Link } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import './Home.css'

// export default function Home() {
//   const [cards, setCards] = useState([])

//   useEffect(() => {
//     // Scroll effect
//     const scrollFunction = () => {
//       const header = document.getElementById("header");
//       const container = document.getElementById("header-container");
//       if (!header || !container) return;

//       if (window.innerWidth > 599) {
//         if (window.scrollY > 100) {
//           header.style.backgroundColor = "#ec174d";
//           container.style.height = "50px";
//         } else {
//           header.style.backgroundColor = "transparent";
//           container.style.height = "90px";
//         }
//       }
//     }

//     window.addEventListener("scroll", scrollFunction);
//     scrollFunction();
//     return () => window.removeEventListener("scroll", scrollFunction);
//   }, []);

//   useEffect(() => {
//     // Mobile menu toggle
//     const menuButton = document.getElementById("menuButton");
//     const cancelButton = document.getElementById("cancelButton");
//     const navigationLinks = document.getElementById("navigationLinksMobile");

//     const openMenu = () => {
//       navigationLinks.style.top = "0";
//       menuButton.style.display = "none";
//       cancelButton.style.display = "flex";
//     }

//     const closeMenu = () => {
//       navigationLinks.style.top = "-100%";
//       menuButton.style.display = "flex";
//       cancelButton.style.display = "none";
//     }

//     if (menuButton && cancelButton && navigationLinks) {
//       menuButton.addEventListener("click", openMenu);
//       cancelButton.addEventListener("click", closeMenu);

//       document.addEventListener("click", function (event) {
//         if (
//           !navigationLinks.contains(event.target) &&
//           !menuButton.contains(event.target) &&
//           event.target.id !== "cancelButton"
//         ) {
//           closeMenu();
//         }
//       });
//     }

//     return () => {
//       if (menuButton && cancelButton) {
//         menuButton.removeEventListener("click", openMenu);
//         cancelButton.removeEventListener("click", closeMenu);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     // Card rendering logic
//     const initialCards = [
//       {
//         title: "Dorofeeva",
//         location: "Kyiv, Palace of sports",
//         date: new Date("April 12, 2025 19:00"),
//         price: 590,
//         image: "https://storage.concert.ua/JU9/8/rk/67cc0a5145251/5253.jpg:31-catalog-event_item-desktop2x"
//       },
//       {
//         title: "Solo concert Edwart",
//         location: "Lutsk, Lutsk Palace of Culture",
//         date: new Date("May 31, 2025 19:00"),
//         price: 300,
//         image: "https://storage.concert.ua/JU9/15/GN/67d56a086cd64/cd6b.png:31-catalog-event_item-desktop"
//       },
//       {
//         title: "Zhadan i sobaky",
//         location: "Lviv, !FESTrepublic territory",
//         date: new Date("May 3, 2025 18:00"),
//         price: 300,
//         image: "https://storage.concert.ua/JU9/31/HP/679c9d97382b5/82b8.jpg:31-catalog-event_item-desktop2x"
//       },
//       {
//         title: "Monatik. Only you can do that.",
//         location: "Kyiv, Palace of sports",
//         date: new Date("September 20, 2025"),
//         price: 490,
//         image: "https://storage.concert.ua/JU9/4/e0/67a1d9f8f2c4a/2c4e.jpg:31-catalog-event_item-desktop2x"
//       },
//       {
//         title: "Bez obmezhen",
//         location: "Kyiv, Palace of sports",
//         date: new Date("May 8, 2025"),
//         price: 300,
//         image: "https://storage.concert.ua/JU9/12/vZ/67d1c587eef9e/efa1.jpg:31-catalog-event_item-desktop2x"
//       }
//     ];

//     const now = new Date();
//     const filteredCards = initialCards.filter(card => card.date > now);
//     setCards(filteredCards);
//   }, []);

//   return (
//     <>
//       <header id="header" className="header">
//         <div id="header-container" className="header-container">
//           <nav className="navigation-desktop">
//             <div className="navigation-links-desktop">
//               <Link className="navigation-link-desktop" to="/">Events</Link>
//               <Link className="navigation-link-desktop" to="/about">About</Link>
//               <Link className="navigation-link-desktop" to="/tickets">My tickets</Link>
//             </div>
//           </nav>
//           <nav className="navigation-mobile">
//             <img src="media/icons/menu-icon2.svg" alt="" className="navigation-button-menu" id="menuButton" />
//             <img src="media/icons/cancel-icon1.svg" alt="" className="navigation-button-cancel" id="cancelButton" />
//             <div className="navigation-links-mobile" id="navigationLinksMobile">
//               <Link className="navigation-link-mobile" to="/">Events</Link>
//               <Link className="navigation-link-mobile" to="/about">About</Link>
//               <Link className="navigation-link-mobile" to="/tickets">My tickets</Link>
//             </div>
//           </nav>
//         </div>
//       </header>

//       <main>
//         <div className="promo">
//           <div className="promo-img-container">
//             <img className="promo-img" src="https://storage.concert.ua/JU9/20/xa/678e3408d81e3/81e6.jpg:31-mainpage-megabanner-desktop" alt="" />
//           </div>
//           <div className="promo-text-container">
//             <span className="promo-date">January 21 - April 13</span>
//             <span className="promo-title">Veterans of space forces</span>
//             <span className="promo-place">Tour of Ukraine</span>
//           </div>
//         </div>

//         <div className="main-container">
//           <h1 className="grid-title">Best sellers now</h1>
//           <div className="cards-grid">
//             {cards.map((card, index) => (
//               <div className="card" key={index}>
//                 <img className="card-img" src={card.image} alt={card.title} />
//                 <div className="card-detail-container">
//                   <span className="card-date">
//                     {card.date.toLocaleDateString('en-GB', {
//                       day: '2-digit',
//                       month: 'long',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     }).replace(' at', '')}, {card.date.toLocaleDateString('en-GB', { weekday: 'short' })}
//                   </span>
//                   <h2 className="card-title">{card.title}</h2>
//                   <span className="card-location">{card.location}</span>
//                   <span className="card-price">from {card.price} ₴</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="show-button-container">
//             <span className="show-button">Show more</span>
//           </div>
//         </div>
//       </main>

//       <footer className="footer">
//         <div className="footer-container">
//           <span className="footer-data">
//             <p className="footer-data-text">tickets.buy@hotmail.com</p>
//             <div className="vl"></div>
//             <p className="footer-data-text">+380981234567</p>
//           </span>
//           <span className="footer-underwrite">
//             <p className="footer-underwrite-text">© 2025 All rights reserved</p>
//           </span>
//         </div>
//       </footer>
//     </>
//   );
// }


// import { Link } from 'react-router-dom'
// import '../scripts/index'
// import './Home.css'

// export default function Home() {
//     return (
//         <>
//             <header id="header" className="header">
//                 <div id="header-container" className="header-container">
//                     <nav className="navigation-desktop">
//                         <div className="navigation-links-desktop">
//                             <Link className="navigation-link-desktop" to="/">Events</Link>
//                             <Link className="navigation-link-desktop" to="/about">About</Link>
//                             <Link className="navigation-link-desktop" to="/tickets">My tickets</Link>
//                         </div>
//                     </nav>
//                     <nav className="navigation-mobile">
//                         <img src="media/icons/menu-icon2.svg" alt="" className="navigation-button-menu" id="menuButton"/>
//                         <img src="media/icons/cancel-icon1.svg" alt="" className="navigation-button-cancel" id="cancelButton"/>
//                         <div className="navigation-links-mobile" id="navigationLinksMobile">
//                             <Link className="navigation-link-mobile" to="/">Events</Link>
//                             <Link className="navigation-link-mobile" to="/about">About</Link>
//                             <Link className="navigation-link-mobile" to="/tickets">My tickets</Link>
//                         </div>
//                     </nav>
//                 </div>
//             </header>
//             <main>
//                 <div className="promo">
//                     <div className="promo-img-container">
//                         <img className="promo-img" src="https://storage.concert.ua/JU9/20/xa/678e3408d81e3/81e6.jpg:31-mainpage-megabanner-desktop" alt=""/>
//                     </div>
//                     <div className="promo-text-container">
//                         <span className="promo-date">January 21 - April 13</span>
//                         <span className="promo-title">Veterans of space forces</span>
//                         <span className="promo-place">Tour of Ukraine</span>
//                     </div>
//                 </div>
//                 <div className="main-container">
//                     <div>
//                         <h1 className="grid-title">Best sellers now</h1>
//                         <div className="cards-grid"></div>
//                         <div className="show-button-container">
//                             <span className="show-button">Show more</span>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <footer className="footer">
//                 <div className="footer-container">
//                     <span className="footer-data">
//                         <p className="footer-data-text">tickets.buy@hotmail.com</p>
//                         <div className="vl"></div>
//                         <p className="footer-data-text">+380981234567</p>
//                     </span>
//                     <span className="footer-underwrite">
//                         <p className="footer-underwrite-text">© 2025 All rights reserved</p>
//                     </span>
//                 </div>
//             </footer>
//         </>
//     )
// }