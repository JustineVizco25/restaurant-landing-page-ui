import backgroundImage from '../assets/about-us/about-us-img.png'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function About() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const navigateToTop = () => {
         window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="about-page">
            <div className = "about-header">
                <p className = "about-us-text">About Us</p>
                <h1 className="our-story-text">Our Story</h1>
                <p className = "about-us-caption">A journey for making successful luxury restaurant <br />
                with the best services  </p>
            </div>
            <div className = "chef-image-and-description-container">
                <div className = "chef-image-container">
                    <img src={backgroundImage} alt="Chefs preparing Japanese dishes in the restaurant kitchen" />
                </div>
                <div className = "chef-story-description">
                    <p className = "chef-story-text">Our story begins with a love for Japanese cuisine and the care behind every plate. From the delicate cut of fresh salmon to the balance of seasoned rice, our chef brings attention to the smallest details. Each dish pairs rich flavor with thoughtful presentation, inviting you to slow down and enjoy every bite.</p>
                    <p className = "chef-story-text">That same care extends beyond the kitchen. With warm hospitality and an intimate setting, we create space for good conversation and memorable meals. Whether you join us for a quiet dinner or a special celebration, we want every visit to feel as personal as the food we prepare.</p>
                    <Link to="/contacts" className="more-about-us-btn" onClick={navigateToTop}>MORE ABOUT US ───</Link>
                </div>
            </div>
        </div>
    )
}
