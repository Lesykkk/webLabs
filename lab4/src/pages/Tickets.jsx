import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Tickets.css';

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    // Завантаження квитків з Firestore
    useEffect(() => {
        if (!user) {
            setTickets([]);
            return;
        }

        const q = query(
            collection(db, "tickets"),
            where("userId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const ticketsData = [];
            querySnapshot.forEach((doc) => {
                const ticketData = doc.data();
                ticketsData.push({
                    id: doc.id,
                    ...ticketData,
                    // Форматування дати для відображення
                    formattedDate: formatTicketDate(ticketData.date)
                });
            });
            setTickets(ticketsData);
        });

        return () => unsubscribe();
    }, [user]);

    // Функція для форматування дати
    const formatTicketDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'short'
        }).replace(' at', '');
    };

    // Скасування квитка
    const handleCancel = async (ticketId) => {
        try {
            await deleteDoc(doc(db, "tickets", ticketId));
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
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
                            {user && (
                                <a 
                                    href="#logout" 
                                    className="navigation-link-desktop logout-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        logout();
                                    }}
                                >
                                    Logout
                                </a>
                            )}
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
                            {user && (
                                <a 
                                    href="#logout" 
                                    className="navigation-link-mobile logout-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        logout();
                                    }}
                                >
                                    Logout
                                </a>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            <main>
                <div className="main-container">
                    <h1 className="main-title">My tickets</h1>
                    <section className="tickets">
                        {tickets.length === 0 ? (
                            <p className="tickets-empty">No tickets yet.</p>
                        ) : (
                            tickets.map((ticket) => (
                                <div className="ticket" key={ticket.id}>
                                    <div className="ticket-img-container">
                                        <img className="ticket-img" src={ticket.image} alt={ticket.title} />
                                    </div>
                                    <div className="ticket-detail-container">
                                        <span className="ticket-location">{ticket.location}</span>
                                        <h2 className="ticket-title">{ticket.title}</h2>
                                        <span className="ticket-date">{ticket.formattedDate}</span>
                                        <span className="ticket-price">{ticket.quantity || 1}x | {ticket.price} ₴</span>
                                        <button 
                                            className="cancel-button" 
                                            onClick={() => handleCancel(ticket.id)}
                                        >
                                            🗑
                                        </button>
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





// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Tickets.css';
// import { useAuth } from '../context/AuthContext';


// export default function Tickets() {
//     const [myTickets, setMyTickets] = useState([]);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const { user, logout } = useAuth();

//     useEffect(() => {
//         const savedTickets = JSON.parse(localStorage.getItem("myTickets")) || [];
//         setMyTickets(savedTickets);
//     }, []);

//     const handleCancel = (index) => {
//         const updatedTickets = [...myTickets];
//         updatedTickets.splice(index, 1);
//         setMyTickets(updatedTickets);
//         localStorage.setItem("myTickets", JSON.stringify(updatedTickets));
//     };

//     const toggleMenu = () => {
//         setMenuOpen(true);
//     };

//     const closeMenu = () => {
//         setMenuOpen(false);
//     };

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (
//                 !e.target.closest("#navigationLinksMobile") &&
//                 !e.target.closest("#menuButton")
//             ) {
//                 closeMenu();
//             }
//         };
//         document.addEventListener("click", handleClickOutside);
//         return () => {
//             document.removeEventListener("click", handleClickOutside);
//         };
//     }, []);

//     return (
//         <>
//             <header id="header" className="header">
//                 <div id="header-container" className="header-container">
//                     <nav className="navigation-desktop">
//                         <div className="navigation-links-desktop">
//                             <Link className="navigation-link-desktop" to="/">Events</Link>
//                             <Link className="navigation-link-desktop" to="/about">About</Link>
//                             <Link className="navigation-link-desktop" to="/tickets">My tickets</Link>
//                             {user && (
//                             <a 
//                                 href="#logout" 
//                                 className="navigation-link-desktop logout-link"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     logout();
//                                 }}
//                                 >
//                                 Logout
//                             </a>
//                             )}
//                         </div>
//                     </nav>
//                     <nav className="navigation-mobile">
//                         <img
//                             src="media/icons/menu-icon2.svg"
//                             alt=""
//                             className="navigation-button-menu"
//                             id="menuButton"
//                             style={{ display: menuOpen ? "none" : "flex" }}
//                             onClick={toggleMenu}
//                         />
//                         <img
//                             src="media/icons/cancel-icon1.svg"
//                             alt=""
//                             className="navigation-button-cancel"
//                             id="cancelButton"
//                             style={{ display: menuOpen ? "flex" : "none" }}
//                             onClick={closeMenu}
//                         />
//                         <div
//                             className={`navigation-links-mobile ${menuOpen ? "active" : ""}`}
//                             id="navigationLinksMobile"
//                             style={{ top: menuOpen ? "0" : "-100%" }}
//                         >
//                             <Link className="navigation-link-mobile" to="/">Events</Link>
//                             <Link className="navigation-link-mobile" to="/about">About</Link>
//                             <Link className="navigation-link-mobile" to="/tickets">My tickets</Link>
//                             {user && (
//                             <a 
//                                 href="#logout" 
//                                 className="navigation-link-desktop logout-link"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     logout();
//                                 }}
//                                 >
//                                 Logout
//                             </a>
//                             )}
//                         </div>
//                     </nav>
//                 </div>
//             </header>

//             <main>
//                 <div className="main-container">
//                     <h1 className="main-title">My tickets</h1>
//                     <section className="tickets">
//                         {myTickets.length === 0 ? (
//                             <p className="tickets-empty">No tickets yet.</p>
//                         ) : (
//                             myTickets.map((ticket, index) => (
//                                 <div className="ticket" key={index}>
//                                     <div className="ticket-img-container">
//                                         <img className="ticket-img" src={ticket.image} alt="" />
//                                     </div>
//                                     <div className="ticket-detail-container">
//                                         <span className="ticket-location">{ticket.location}</span>
//                                         <h2 className="ticket-title">{ticket.title}</h2>
//                                         <span className="ticket-date">{ticket.date}</span>
//                                         <span className="ticket-price">{ticket.price} ₴</span>
//                                         <button className="cancel-button" onClick={() => handleCancel(index)}>🗑</button>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </section>
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
//     );
// }