// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(email)
        // Simulate API call
        setTimeout(() => {
            setEmailSent(true);
            setLoading(false);
        }, 1500);
    };

    const handleResend = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="forgot-root">
            <div className="forgot-card">
                <h1 className="forgot-title">
                    {!emailSent ? "Reset your password" : "Check email"}
                </h1>

                <p className="forgot-desc">
                    {!emailSent
                        ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
                        : `We have sent the reset email to ${email}`}
                </p>

                <form onSubmit={handleSubmit} className="forgot-form">
                    {!emailSent && (
                        <label className="forgot-label">
                            <p className="forgot-label-text">
                                Email Address <sup>*</sup>
                            </p>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                                className="forgot-input"
                                disabled={loading}
                            />
                        </label>
                    )}

                    <button
                        type="submit"
                        className="forgot-btn"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : (!emailSent ? "Submit" : "Resend Email")}
                    </button>
                </form>

                <div className="forgot-back">
                    <Link to="/garage-login" className="back-link">
                        ← Back To Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
