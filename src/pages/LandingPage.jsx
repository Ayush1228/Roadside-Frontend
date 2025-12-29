// src/components/LandingPage.jsx
import { useNavigate } from "react-router-dom";
import "../CSS/LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="lp-page-body">
            <div className="lp-page">
                {/* HEADER */}
                <header className="lp-header">
                    <div className="lp-logo-wrap">
                        <span className="lp-logo-icon">🚨</span>
                        <span className="lp-logo-text">RoadSideHelp</span>
                    </div>
                </header>

                {/* MAIN CONTENT – responsive cards */}
                <main className="lp-main">
                    <section className="lp-hero-text">
                        <h1>Instant roadside assistance when you need it most</h1>
                        <p>
                            Find nearby garages, trusted mechanics and quick SOS help for
                            breakdowns, punctures and emergencies.
                        </p>
                    </section>

                    <section className="lp-card-grid">
                        <article className="lp-card">
                            <h2 className="lp-card-title">Emergency SOS</h2>
                            <p className="lp-card-body">
                                Raise an SOS in seconds and notify nearby garages and mechanics
                                with your live location.
                            </p>
                        </article>

                        <article className="lp-card">
                            <h2 className="lp-card-title">Nearby Garages</h2>
                            <p className="lp-card-body">
                                Discover open garages around you with distance, ETA and contact
                                details.
                            </p>
                        </article>

                        <article className="lp-card">
                            <h2 className="lp-card-title">Real‑time Tracking</h2>
                            <p className="lp-card-body">
                                Track the assigned mechanic on the map until they reach your
                                vehicle.
                            </p>
                        </article>

                        <article className="lp-card">
                            <h2 className="lp-card-title">Secure Payments</h2>
                            <p className="lp-card-body">
                                View transparent pricing, digital bills and pay securely from
                                your phone.
                            </p>
                        </article>
                    </section>

                    {/* SECOND ROW – different content */}
                    <section className="lp-card-grid">
                        <article className="lp-card">
                            <h2 className="lp-card-title">24×7 Availability</h2>
                            <p className="lp-card-body">
                                Get help any time of the day or night with around‑the‑clock support
                                partners on the network.
                            </p>
                        </article>

                        <article className="lp-card">
                            <h2 className="lp-card-title">Verified Mechanics</h2>
                            <p className="lp-card-body">
                                Work only with verified garages and mechanics rated by real drivers.
                            </p>
                        </article>

                        <article className="lp-card">
                            <h2 className="lp-card-title">Multi‑vehicle Support</h2>
                            <p className="lp-card-body">
                                Raise requests for bikes, cars, taxis or commercial vehicles in one app.
                            </p>
                        </article>

                        <article className="lp-card">
                            <h2 className="lp-card-title">Service History</h2>
                            <p className="lp-card-body">
                                Maintain a digital log of your breakdowns, invoices and completed jobs.
                            </p>
                        </article>
                    </section>

                </main>
                
            </div>
            <div className="lp-footer-buttons">
                    <button
                        className="lp-footer-btn primary"
                        onClick={() => navigate("/admin-login")}
                    >
                        continue as Admin
                    </button>
                    <button
                        className="lp-footer-btn"
                        onClick={() => navigate("/garage-login")}
                    >
                        continue as Garage
                    </button>
                </div>
            {/* FOOTER – action buttons */}
                <footer className="lp-footer">
                    <p className="lp-footer-copy">© {new Date().getFullYear()} RoadSideHelp</p>
                </footer>
        </div>
    );
};

export default LandingPage;
