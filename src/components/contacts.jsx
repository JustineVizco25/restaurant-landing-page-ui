import background from '../assets/contacts/contacts-background-image.png'
import tint from '../assets/contacts/contacts-image-tint.png'
import phone from '../assets/contacts/phone.png'
import pin from '../assets/contacts/pin.png'
import restaurantLogo from '../assets/branding/logo 1.png'
import { Link } from 'react-router-dom'

export default function Contacts() {
    return (
        <div className = "contacts-container">
            <div className = "contacts-images-container">
                <img src = {background} alt="" />
                <img className="contacts-tint" src = {tint} alt="" />
                <div className="contacts-header-container">
                    <h1>We're ready to give you <br />
                        the best dining experiences
                    </h1>
                </div>
                <div className="contacts-details-container">
                  <div className = "address-and-contact-container">
                    <div className="contact-detail">
                    <img className = "pin-logo" src = {pin} alt="" />
                    <p> Jendral Sudirman Street Pahoman <br></br>
                        Bandar Lampung, Lampung, 35222
                    </p>
                    </div>
                    <div className="contact-detail">
                    <img className = "phone-logo" src = {phone} alt="" />
                    <p> Call us: <br></br>
                        +0721 471 285
                    </p>
                    </div>
                  </div>
                  <Link to="/reservation" className="reserve-table-btn">
                    RESERVE A TABLE
                  </Link>
                  <img className="contacts-restaurant-logo" src={restaurantLogo} alt="Dmr Sushi" />
                  <div className="contacts-social-links">
                    <a className="contacts-social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
                    <a className="contacts-social-link" href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter</a>
                    <a className="contacts-social-link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
                  </div>
                </div>
            </div>
        </div>
    )
}
