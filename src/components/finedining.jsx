import { useEffect, useState } from 'react';
import left_Tint from '../assets/dining-events-menu/left-tint.png';
import right_Tint from '../assets/dining-events-menu/right-tint.png';
import eventOne from '../assets/dining-events-menu/dining-event-item1.png';
import eventTwo from '../assets/dining-events-menu/dining-event-item2.png';
import eventThree from '../assets/dining-events-menu/dining-event-item3.png';
import executiveDining from '../assets/corporate-events-menu/corporate-dining1.jpg';
import teamCelebrations from '../assets/corporate-events-menu/corporate-dining3.jpg';
import corporateReceptions from '../assets/corporate-events-menu/corporate-dining2.jpg';

export default function FineDining() {
    const [activeEvent, setActiveEvent] = useState('private');
    const isCorporate = activeEvent === 'corporate';

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <div className="special-menu-texts-container">
            <div className = "events-texts-and-buttons-container">
                <p className = "choose-your-food-text">Choose Your Event</p>
                <h1 className="dining-events-text">{isCorporate ? 'Corporate Events' : 'Dining Events'}</h1>
                <p className = "dining-events-caption">{isCorporate ? (<>From client dinners to company milestones,<br />bring your people together over exceptional dining.</>) : (<>We provide dining event for your special day <br />with your important people</>)}</p>
            </div>
            <div className = "dining-events-buttons-container">
                <button type="button" className="private-events-btn" aria-pressed={activeEvent === 'private'} onClick={() => setActiveEvent('private')}>
                    Private Events
                </button>
                <button type="button" className="corporate-events-btn" aria-pressed={activeEvent === 'corporate'} onClick={() => setActiveEvent('corporate')}>
                    Corporate Events
                </button>
            </div>
            <div className = "dining-events-menu">
                <div className="dining-event dining-event-one">
                    <img src={isCorporate ? executiveDining : eventOne} className="event-image" alt={isCorporate ? "Formal tables prepared for a corporate banquet" : "Dining event"} />
                    <img src={left_Tint} className="event-tint" alt="" />

                    <div className = "event-text-container">
                        <div className="event-heading">
                            <span className="event-price">{isCorporate ? '$1,250' : '$500'}</span>
                            <span className="event-title">{isCorporate ? 'EXECUTIVE DINING' : 'FINE DINING'}</span>
                        </div>
                        <p className = "event-description">{isCorporate ? (<>Up to 10 guests<br />Hosted Client & Partner Dining<br />Seasonal Three-Course Menu<br />Dessert & Coffee</>) : (<>Bottle of Champagne <br></br>
                        Fine Sushi Tower For 2+ <br></br>
                        Dessert</>)}</p>
                    </div>
                </div>
                <div className="dining-event dining-event-two dining-event-reversed">
                    <img src={isCorporate ? teamCelebrations : eventTwo} className="event-image" alt={isCorporate ? "Colleagues sharing a buffet meal" : "Dining event"} />
                    <img src={right_Tint} className="event-tint" alt="" />

                    <div className = "event-text-container">
                        <div className="event-heading">
                            <span className="event-price">{isCorporate ? '$1,500' : '$1000'}</span>
                            <span className="event-title">{isCorporate ? 'TEAM CELEBRATIONS' : 'GOLD DINING'}</span>
                        </div>
                        <p className = "event-description">{isCorporate ? (<>Up to 20 guests<br />Shared Buffet Selection<br />A Toast to Team Achievements<br />Celebration Dessert</>) : (<>Bottle of Champagne <br></br>
                        Secret Menu Sushi For 2+ <br></br>
                        Dessert</>)}</p>
                    </div>
                </div>
                <div className="dining-event dining-event-three">
                    <img src={isCorporate ? corporateReceptions : eventThree} className="event-image" alt={isCorporate ? "Business guests at a staffed buffet reception" : "Dining event"} />
                    <img src={left_Tint} className="event-tint" alt="" />

                    <div className = "event-text-container">
                        <div className="event-heading">
                            <span className="event-price">{isCorporate ? '$2,850' : '$1500'}</span>
                            <span className="event-title">{isCorporate ? 'CORPORATE RECEPTIONS' : 'FINE DINING'}</span>
                        </div>
                        <p className = "event-description">{isCorporate ? (<>Up to 30 guests<br />Chef-Attended Buffet<br />Welcome Drinks & Conversation<br />Seasonal Dessert Selection</>) : (<>Bottle of Luxary Champagne <br></br>
                        Special Menu Sushi For 2+ <br></br>
                        Royal Dessert</>)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
