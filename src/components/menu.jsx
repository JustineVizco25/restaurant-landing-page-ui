import { useEffect, useRef } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { menuCategories } from '../data/menu';
import foodOne from '../assets/special-menu/special-menu-food-image-1.png';
import foodTwo from '../assets/special-menu/special-menu-food-image-2.png';
import foodThree from '../assets/special-menu/special-menu-food-image-3.png';
import star from '../assets/decorations/Star 1.png';
import background from '../assets/decorations/Mask group.png'

export default function Menu() {
    const { category } = useParams();
    const location = useLocation();
    const menuRef = useRef(null);
    const headingRef = useRef(null);
    const activeButton = category || 'specialties';
    const activeCategory = menuCategories.find((item) => item.slug === activeButton);

    useEffect(() => {
        if (!category || !activeCategory) return;
        let cancelled = false;
        // Wait for content above the heading to settle before aligning it.
        const images = Array.from(menuRef.current.querySelectorAll('img'));
        Promise.allSettled([
            document.fonts.ready,
            ...images.map((image) => image.decode()),
        ]).then(() => {
            if (!cancelled) headingRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
        });
        return () => { cancelled = true; };
    }, [category, activeCategory, location.key]);

    if (!activeCategory) return <Navigate to="/menu" replace />;
    return (
        <div className = "special-menu-texts-container" ref={menuRef}>
            <p className = "special-menu-text">Special Menu</p>
            <h1 className="todays-special-text">Today's Special</h1>
            <div className = "special-menu-caption">Special menu often comes differently everyday, <br className="desktop-break" />
            this is our special food today</div>

            <div className = "special-menu-foods-container">
                <div className = "special-menu-food-image">
                    <img src={foodOne} alt="Tuna sushi special" />
                </div>

                <div className = "special-menu-food-image">
                    <img src={foodTwo} alt="Salmon sushi special" />
                </div>

                <div className = "special-menu-food-image">
                    <img src={foodThree} alt="Just Sushi selection" />
                </div>

                <div className = "special-menu-food-description">
                    <div className = "special-menu-food-description-container">
                        <div className = "tuna-sushi-text">TUNA SUSHI</div>
                        <div className = "tuna-sushi-description">Silken tuna meets fragrant rice, <br className="desktop-break" />
                        revealing deep ocean richness <br className="desktop-break" />
                         with every bite.
                         </div>
                         <div className="rating" role="img" aria-label="5 stars">
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                         </div>
                         <Link to="/order" state={{ selectedFood: 'tuna' }} className="order-now-btn">ORDER NOW ──</Link>
                    </div>
                </div>

                <div className = "special-menu-food-description-two">
                    <div className = "special-menu-food-description-container">
                        <div className = "salmon-sushi-text">SALMON SUSHI</div>
                        <div className = "salmon-sushi-description">Buttery salmon crowns delicate <br className="desktop-break" />
                        rice, melting into a sumptuous, <br className="desktop-break" />
                        savory indulgence.
                         </div>
                         <div className="rating" role="img" aria-label="5 stars">
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                         </div>
                         <Link to="/order" state={{ selectedFood: 'salmon' }} className="order-now-btn">ORDER NOW ──</Link>
                    </div>
                </div>

                <div className = "special-menu-food-description">
                    <div className = "special-menu-food-description-container">
                        <div className = "just-sushi-text">JUST SUSHI</div>
                        <div className = "just-sushi-description">An elegant sushi selection, <br className="desktop-break" />
                        layered with delicate textures and exquisite flavor.
                         </div>
                         <div className="rating" role="img" aria-label="5 stars">
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                         </div>
                         <Link to="/order" state={{ selectedFood: 'just' }} className="order-now-btn">ORDER NOW ──</Link>
                    </div>
                </div>
            </div>
            <div className = "restaurant-background-picture-container">
                <img src={background} alt="" />
            </div>

            <div className = "our-specialities-texts-container" id="quality-food" ref={headingRef}>
                <p className = "quality-food-text">Quality Food For You</p>
                <div className = "our-specialities-text">{activeButton === 'specialties' ? 'Our Specialities' : activeCategory.label}</div>
                <div className = "our-specialities-caption">Authentic food from our restaurant, served <br className="desktop-break" />
                with high quality ingredients</div>
            </div>

            <nav className = "food-specialties-navbuttons-container" aria-label="Menu categories">
                {menuCategories.map((item) => (
                    <Link
                        key={item.slug}
                        to={`/menu/${item.slug}#quality-food`}
                        className={`${item.slug}-btn`}
                        aria-current={activeButton === item.slug ? 'page' : undefined}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className = "food-menu-container">
                {activeCategory.items.map((item, index) => {
                    const number = ['one', 'two', 'three'][index];
                    const image = (
                        <div className={`item-${number}-image`}>
                            <img src={item.image} alt={item.name} width="900" height="650" />
                        </div>
                    );
                    const text = (
                        <div className={`item-${number}-texts-container`}>
                            <div className={`item-${number}-name-text`}>{item.name.toUpperCase()}</div>
                            <div className={`item-${number}-ingredients-text`}>
                                {activeCategory.descriptionLabel}: {item.ingredients}
                            </div>
                            <div className={`item-${number}-price`}>{item.price}</div>
                            {activeButton === 'wine' && <div className="item-price-caption">Glass / bottle</div>}
                        </div>
                    );
                    return (
                        <div key={item.id} className={`specialities-item-${number}-container`}>
                            {index % 2 === 0 ? <>{image}{text}</> : <>{text}{image}</>}
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
