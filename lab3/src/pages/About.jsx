import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
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
            <img src="media/icons/menu-icon2.svg" alt="" className="navigation-button-menu" id="menuButton"/>
            <img src="media/icons/cancel-icon1.svg" alt="" className="navigation-button-cancel" id="cancelButton"/>
            <div className="navigation-links-mobile" id="navigationLinksMobile">
              <Link className="navigation-link-mobile" to="/">Events</Link>
              <Link className="navigation-link-mobile" to="/about">About</Link>
              <Link className="navigation-link-mobile" to="/tickets">My tickets</Link>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <div className="main-container">
            <div>
                <h1 className="main-title">About us</h1>
            </div>
            <section className="about">
                <span className="about-text">
                    Welcome! We are a team of 15 professionals who are united by a common goal: to create high-quality, efficient and creative solutions for our clients.
                    Our team is a combination of experience, innovative thinking and a real passion for what we do. We work in different areas, complementing each other with knowledge and skills to ensure the best possible result.
                    In our work, we are guided by the principles of openness, reliability and responsibility. For us, each project is an opportunity to implement ideas that make the world a better place. We value the trust of our clients and always strive to exceed their expectations.
                    Through teamwork, creativity and continuous development, we help our clients reach new heights.
                    Join us - together we will create something truly unique!
                </span>
                <img className="about-img" src="https://img.freepik.com/free-photo/three-collegues-working-car-showroom_1303-17425.jpg?t=st=1742250354~exp=1742253954~hmac=2b0522efa07c9ab4101332a842c6bf4b40ef59861224a38cd9be9f3196e276c3&w=1380" alt=""/>
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
    )
  }
  