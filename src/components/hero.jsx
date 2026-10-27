import heroBackgroundImage from '../assets/hero/luxurybg4 1.png'
import { Link } from 'react-router-dom'
export default function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-image-container">
        <img
          className="heroBackgroundImage"
          src={heroBackgroundImage}
          alt=""
          draggable={false}
        />
        <div className="hero-content">
          <div className="kicker-container">
            <p className="kicker-text">Best Sushi In Town</p>
          </div>
          <div className="tagline-container">
            <h1 className="tagline-text">
              Taste the rich flavor of <br className="desktop-break" />
              high-quality sushi
            </h1>
          </div>
          <div className="hero-caption-container">
            <p className="hero-caption-text">
              We only use the five star quality for <br className="desktop-break" />
              our menu, come and get the richness in <br className="desktop-break" />
              every food we serve.
            </p>
          </div>
          <Link to="/menu" className="go-to-menu-btn">GO TO MENU ───</Link>
        </div>
      </div>
    </div>
  )
}
