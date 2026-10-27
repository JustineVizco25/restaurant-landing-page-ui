import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import heroImg from '../assets/about-us/about-us-img.png'
import Order from './order.jsx'
import './booking.css'

function today() {
    const date = new Date()
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-')
}

const newVisit = () => ({ date: today(), guests: '2', time: '18:30', name: '', email: '', specialRequests: '' })
const times = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00']

function ReservationForm() {
    const [details, setDetails] = useState(newVisit)
    const [step, setStep] = useState('details')
    const headingRef = useRef(null)
    const previousStep = useRef(step)
    const update = (event) => setDetails((current) => ({ ...current, [event.target.name]: event.target.value }))
    const dateLabel = new Date(`${details.date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })

    useEffect(() => {
        if (previousStep.current !== step) headingRef.current?.focus()
        previousStep.current = step
    }, [step])

    return <section className="divider-container" aria-label="Table reservation">
        <aside className="reservation-image-container">
            <img src={heroImg} alt="" />
            <div className="reservation-image-text">
                <p className="dmr-experience-text">THE DMR EXPERIENCE</p>
                <div>
                    <p className="A-seat-at-our-table-text">A seat at our table</p>
                    <h2 className="goodCompany-exceptionalSushi-text">Good company.<br />Exceptional sushi.</h2>
                    <p className="make-room-text">Make room for an evening worth savoring.</p>
                    <hr className="gold-line" />
                    <p className="location">Jendral Sudirman Street Pahoman<br />Bandar Lampung, Lampung</p>
                </div>
            </div>
        </aside>
        <div className="table-reservation-section">
            <p className="reservation-numbering">{step === 'details' ? '01 / YOUR VISIT' : step === 'review' ? '02 / REVIEW YOUR VISIT' : '03 / PREVIEW COMPLETE'}</p>
            <h1 className="reserve-a-table-text" ref={headingRef} tabIndex={-1}>{step === 'details' ? 'Reserve a table' : step === 'review' ? 'An evening to look forward to' : 'Your table request, previewed.'}</h1>
            <p className="reservation-tagline">{step === 'details' ? 'A special occasion or simply a beautiful dinner.' : step === 'review' ? 'Take a moment to check the details of your visit.' : 'This demonstrates the confirmation screen. No reservation was sent and no table is held.'}</p>
            {step === 'details' ? <form className="form-field" onSubmit={(event) => { event.preventDefault(); setStep('review') }}>
                <div className="date-party-size-input-container">
                    <div className="reservation-date-field">
                        <label htmlFor="reservation-date">Date</label>
                        <input id="reservation-date" name="date" type="date" min={today()} required value={details.date} onChange={update} />
                    </div>
                    <div className="reservation-party-size-field">
                        <label htmlFor="reservation-party-size">Party size</label>
                        <select id="reservation-party-size" name="guests" required value={details.guests} onChange={update}>
                            {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>)}
                        </select>
                    </div>
                </div>
                <fieldset className="reservation-times">
                    <legend>Choose a time <span className="booking-muted">· Sample availability</span></legend>
                    <div className="time-options">
                        {times.map((time) => <label className="time-button" key={time}>
                            <input type="radio" name="time" value={time} checked={details.time === time} onChange={update} required />
                            <span>{time}</span>
                        </label>)}
                    </div>
                </fieldset>
                <div className="name-and-email-input-container">
                    <div className="name-field">
                        <label htmlFor="reservation-name">Full name</label>
                        <input id="reservation-name" name="name" autoComplete="name" type="text" required pattern=".*\S.*" placeholder="Your name" value={details.name} onChange={update} />
                    </div>
                    <div className="email-field">
                        <label htmlFor="reservation-email">Email address</label>
                        <input id="reservation-email" name="email" autoComplete="email" type="email" required placeholder="you@example.com" value={details.email} onChange={update} />
                    </div>
                </div>
                <div className="request-description">
                    <label htmlFor="special-requests">Anything we should know? <span className="booking-muted">(optional)</span></label>
                    <textarea id="special-requests" name="specialRequests" rows={2} value={details.specialRequests} onChange={update} placeholder="An occasion, seating preference, or dietary request…" />
                </div>
                <button className="review-reservation-button" type="submit">REVIEW RESERVATION <span aria-hidden="true">⟶</span></button>
                <p className="booking-footnote">For parties larger than 6, call <a href="tel:+62721471285">+0721 471 285</a>.</p>
            </form> : <div>
                <dl className="reservation-details">
                    <div><dt>Your visit</dt><dd>{dateLabel}</dd></div>
                    <div><dt>Table for</dt><dd>{details.guests} {details.guests === '1' ? 'guest' : 'guests'} · {details.time}</dd></div>
                    <div><dt>Guest</dt><dd>{details.name.trim()}</dd></div>
                    <div><dt>Email</dt><dd>{details.email}</dd></div>
                    {details.specialRequests.trim() && <div><dt>Requests</dt><dd>{details.specialRequests}</dd></div>}
                </dl>
                {step === 'review' ? <>
                    <button className="review-reservation-button" type="button" onClick={() => setStep('done')}>PREVIEW CONFIRMATION <span aria-hidden="true">⟶</span></button>
                    <button className="edit-reservation-button" type="button" onClick={() => setStep('details')}>← Edit details</button>
                </> : <button className="review-reservation-button" type="button" onClick={() => { setDetails(newVisit()); setStep('details') }}>TRY ANOTHER RESERVATION <span aria-hidden="true">⟶</span></button>}
            </div>}
        </div>
    </section>
}

export default function Reservation() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const isReservation = pathname === '/reservation'

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [pathname])

    return <main className="reservation-container">
        <div className="reservation-back-nav">
            <Link to="/" className="reservation-back-link"><span className="reservation-back-icon" aria-hidden="true">←</span><span>Back to restaurant</span></Link>
            <span className="booking-concept-label">INTERACTIVE CONCEPT · NO LIVE BOOKINGS OR ORDERS</span>
        </div>
        <div className="reservation-header-container">
            <div><p className="reservation-header-title">The next chapter</p><p className="reservation-header-caption">Two ways to enjoy Dmr Sushi.</p></div>
            <div className="order-reservation-btn-container" role="group" aria-label="Choose how to enjoy Dmr Sushi">
                <button type="button" className="reservation-button" aria-pressed={isReservation} onClick={() => { if (!isReservation) navigate('/reservation') }}>Reservation</button>
                <button type="button" className="order-now-button" aria-pressed={!isReservation} onClick={() => { if (isReservation) navigate('/order') }}>Order Now</button>
            </div>
        </div>
        {isReservation ? <ReservationForm /> : <Order />}
        <p className="booking-preview-note">Design preview · Form details stay in memory and are cleared when you leave a flow or reload. Availability, special prices, and pickup estimates are samples.</p>
    </main>
}
