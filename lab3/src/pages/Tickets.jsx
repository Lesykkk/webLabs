import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Tickets.css';

export default function Tickets() {
    const [myTickets, setMyTickets] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Отримати квитки з localStorage
        const savedTickets = JSON.parse(localStorage.getItem("myTickets")) || [];
        setMyTickets(savedTickets);
    }, []);

    const handleCancel = (index) => {
        const updatedTickets = [...myTickets];
        updatedTickets.splice(index, 1);
        setMyTickets(updatedTickets);
        localStorage.setItem("myTickets", JSON.stringify(updatedTickets));
    };

    const toggleMenu = () => {
        setMenuOpen(true);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !e.target.closest("#navigationLinksMobile") &&
                !e.target.closest("#menuButton")
            ) {
                closeMenu();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

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
                        <img
                            src="media/icons/menu-icon2.svg"
                            alt=""
                            className="navigation-button-menu"
                            id="menuButton"
                            style={{ display: menuOpen ? "none" : "flex" }}
                            onClick={toggleMenu}
                        />
                        <img
                            src="media/icons/cancel-icon1.svg"
                            alt=""
                            className="navigation-button-cancel"
                            id="cancelButton"
                            style={{ display: menuOpen ? "flex" : "none" }}
                            onClick={closeMenu}
                        />
                        <div
                            className={`navigation-links-mobile ${menuOpen ? "active" : ""}`}
                            id="navigationLinksMobile"
                            style={{ top: menuOpen ? "0" : "-100%" }}
                        >
                            <Link className="navigation-link-mobile" to="/">Events</Link>
                            <Link className="navigation-link-mobile" to="/about">About</Link>
                            <Link className="navigation-link-mobile" to="/tickets">My tickets</Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main>
                <div className="main-container">
                    <h1 className="main-title">My tickets</h1>
                    <section className="tickets">
                        {myTickets.length === 0 ? (
                            <p className="tickets-empty">No tickets yet.</p>
                        ) : (
                            myTickets.map((ticket, index) => (
                                <div className="ticket" key={index}>
                                    <div className="ticket-img-container">
                                        <img className="ticket-img" src={ticket.image} alt="" />
                                    </div>
                                    <div className="ticket-detail-container">
                                        <span className="ticket-location">{ticket.location}</span>
                                        <h2 className="ticket-title">{ticket.title}</h2>
                                        <span className="ticket-date">{ticket.date}</span>
                                        <span className="ticket-price">{ticket.price} ₴</span>
                                        <button className="cancel-button" onClick={() => handleCancel(index)}>🗑</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </section>
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
// import './Tickets.css'

// export default function Tickets () {
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
//                 <div className="main-container">
//                     <h1 className="main-title">My tickets</h1>
//                     <section className="tickets"></section>
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
//             <script src="script/tickets.js"></script>
//         </>
//     )
// }