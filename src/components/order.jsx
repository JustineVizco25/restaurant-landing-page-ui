import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import tuna from '../assets/special-menu/special-menu-food-image-1.png'
import salmon from '../assets/special-menu/special-menu-food-image-2.png'
import just from '../assets/special-menu/special-menu-food-image-3.png'

const foods = [
    { id: 'tuna', name: 'Tuna Sushi', price: 28, image: tuna, description: 'Silken tuna, fragrant rice, deep ocean richness.' },
    { id: 'salmon', name: 'Salmon Sushi', price: 26, image: salmon, description: 'Buttery salmon over delicate seasoned rice.' },
    { id: 'just', name: 'Just Sushi', price: 34, image: just, description: 'An elegant selection of our sushi favorites.' },
]
const money = (value) => `$${value.toFixed(2)}`

export default function Order() {
    const { state } = useLocation()
    const [activeFood, setActiveFood] = useState(() => foods.find((food) => food.id === state?.selectedFood)?.id ?? 'tuna')
    const [preparationNotes, setPreparationNotes] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [orders, setOrders] = useState([])
    const [step, setStep] = useState('menu')
    const [pickup, setPickup] = useState({ name: '', phone: '' })
    const [announcement, setAnnouncement] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const pickupNameRef = useRef(null)
    const pickupPhoneRef = useRef(null)
    const summaryHeadingRef = useRef(null)
    const selectedFood = foods.find((food) => food.id === activeFood)
    const count = orders.reduce((sum, order) => sum + order.quantity, 0)
    const subtotal = orders.reduce((sum, order) => sum + order.price * order.quantity, 0)

    useEffect(() => {
        if (step === 'checkout') pickupNameRef.current?.focus()
        if (step === 'done') summaryHeadingRef.current?.focus()
    }, [step])

    function selectFood(id) {
        setActiveFood(id)
        setQuantity(1)
        setPreparationNotes('')
    }

    function addToOrder() {
        setOrders((current) => [...current, {
            ...selectedFood,
            lineId: crypto.randomUUID(),
            quantity,
            notes: preparationNotes.trim(),
        }])
        setAnnouncement(`${quantity} × ${selectedFood.name} added to your order.`)
        setQuantity(1)
        setPreparationNotes('')
    }

    function startNewOrder() {
        setOrders([])
        setPickup({ name: '', phone: '' })
        setQuantity(1)
        setPreparationNotes('')
        setPhoneError('')
        setAnnouncement('Your order has been cleared. Start a new order.')
        setStep('menu')
    }

    function reviewPickup(event) {
        event.preventDefault()
        const phone = pickup.phone.trim()
        const digitCount = phone.replace(/\D/g, '').length
        if (!/^\+?[\d\s().-]+$/.test(phone) || digitCount < 7 || digitCount > 15) {
            setPhoneError('Enter a phone number with 7–15 digits. You can include +, spaces, parentheses, dots, or hyphens.')
            pickupPhoneRef.current?.focus()
            return
        }
        setPhoneError('')
        setStep('done')
    }

    return (
        <section className="order-divider-container" aria-label="Order for pickup">
            <div className="order-menu-section">
                <header className="order-menu-header-container">
                    <p className="order-menu-header-p1">FRESHLY PREPARED / READY TO TAKE HOME</p>
                    <h1 className="order-menu-header-p2">Your favorites, to go.</h1>
                    <p className="order-menu-header-p3">Select your favorite dish and make it your own.</p>
                </header>
                <div className="order-food-selection-container" role="group" aria-label="Choose a dish">
                    {foods.map((food) => (
                        <button key={food.id} type="button" aria-pressed={activeFood === food.id} onClick={() => selectFood(food.id)}>{food.name}</button>
                    ))}
                </div>
                <div className="order-food-image-container">
                    <span className="todays-special-container">TODAY’S SPECIAL</span>
                    <div className="food-image-container"><img src={selectedFood.image} alt={selectedFood.name} /></div>
                </div>
                <div className="food-heading">
                    <h2>{selectedFood.name}</h2>
                    <span>{money(selectedFood.price)}</span>
                    <p>{selectedFood.description}</p>
                </div>
                <div className="preparation-notes-container">
                    <label className="preparation-notes-input-label" htmlFor="preparation-notes">Preparation notes <span>(optional)</span></label>
                    <textarea className="preparation-notes-area-field" id="preparation-notes" rows={2} value={preparationNotes} onChange={(event) => setPreparationNotes(event.target.value)} placeholder="For example, sauce on the side" />
                </div>
                <div className="order-buttons-container">
                    <div className="quantity-controls">
                        <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((current) => current - 1)}>−</button>
                        <output aria-label="Quantity">{quantity}</output>
                        <button type="button" aria-label="Increase quantity" disabled={quantity >= 20} onClick={() => setQuantity((current) => current + 1)}>+</button>
                    </div>
                    <button className="order-sushi-button" type="button" disabled={step !== 'menu'} onClick={addToOrder}>
                        ADD TO ORDER <span>{money(selectedFood.price * quantity)}</span>
                    </button>
                </div>
                <p className="booking-footnote">Prices for today’s specials are illustrative.</p>
                <p className="booking-sr-only" role="status">{announcement}</p>
            </div>
            <aside className="order-summary-section" aria-label="Your order">
                <header className="order-summary-header">
                    <p>{step === 'done' ? 'PREVIEW COMPLETE' : 'A LITTLE SOMETHING DELICIOUS'}</p>
                    <h2 ref={summaryHeadingRef} tabIndex={-1}>{step === 'done' ? 'Your order, previewed.' : 'Your order'} <span className="order-count" aria-label={`${count} ${count === 1 ? 'item' : 'items'}`}>{count}</span></h2>
                </header>
                <div className="order-summary-description-container">
                    <span aria-hidden="true">↗</span>
                    <div className="order-summary-description">
                        <p>Restaurant pickup</p>
                        <p>Jendral Sudirman Street Pahoman</p>
                        <p>Sample estimate: 25–35 minutes</p>
                    </div>
                </div>
                <div className="order-list">
                    {!orders.length ? <p className="order-empty">Good things start with a first bite.<br />Add a dish to begin your order.</p> : orders.map((order) => (
                        <div className="order-cart-row" key={order.lineId}>
                            <img src={order.image} alt="" />
                            <div>
                                <strong>{order.quantity} × {order.name}</strong>
                                {order.notes && <p>{order.notes}</p>}
                                {step === 'menu' && <button type="button" className="order-remove" aria-label={`Remove ${order.name}${order.notes ? ` (${order.notes})` : ''}`} onClick={() => {
                                    setOrders((current) => current.filter((item) => item.lineId !== order.lineId))
                                    setAnnouncement(`${order.name} removed from your order.`)
                                }}>Remove</button>}
                            </div>
                            <span>{money(order.price * order.quantity)}</span>
                        </div>
                    ))}
                </div>
                <dl className="order-totals">
                    <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
                    <div><dt>Taxes &amp; fees</dt><dd>At checkout</dd></div>
                </dl>
                {step === 'menu' && <>
                    <button className="review-reservation-button" type="button" disabled={!orders.length} onClick={() => setStep('checkout')}>CONTINUE TO PICKUP <span aria-hidden="true">⟶</span></button>
                    <p className="booking-footnote">Final pricing and pickup availability would be confirmed at checkout.</p>
                </>}
                {step === 'checkout' && <form className="pickup-form" onSubmit={reviewPickup}>
                    <label htmlFor="pickup-name">Pickup name</label>
                    <input ref={pickupNameRef} id="pickup-name" name="pickupName" autoComplete="name" required pattern=".*\S.*" placeholder="Your name" value={pickup.name} onChange={(event) => setPickup({ ...pickup, name: event.target.value })} />
                    <label htmlFor="pickup-phone">Phone number</label>
                    <input ref={pickupPhoneRef} id="pickup-phone" name="pickupPhone" type="tel" autoComplete="tel" required placeholder="Your contact number" value={pickup.phone} aria-invalid={phoneError ? true : undefined} aria-describedby={phoneError ? 'pickup-phone-error' : undefined} onChange={(event) => { setPickup({ ...pickup, phone: event.target.value }); setPhoneError('') }} />
                    {phoneError && <p id="pickup-phone-error" className="booking-error" role="alert">{phoneError}</p>}
                    <button className="review-reservation-button" type="submit">PREVIEW CONFIRMATION <span aria-hidden="true">⟶</span></button>
                    <button className="edit-reservation-button" type="button" onClick={() => setStep('menu')}>← Back to your order</button>
                </form>}
                {step === 'done' && <div className="order-confirmation">
                    <dl className="order-totals">
                        <div><dt>Pickup name</dt><dd>{pickup.name.trim()}</dd></div>
                        <div><dt>Phone</dt><dd>{pickup.phone}</dd></div>
                    </dl>
                    <p className="booking-muted">This is a sample confirmation. No order was placed, no payment was taken, and no pickup was scheduled.</p>
                    <button className="review-reservation-button" type="button" onClick={startNewOrder}>START A NEW ORDER <span aria-hidden="true">⟶</span></button>
                </div>}
            </aside>
        </section>
    )
}
