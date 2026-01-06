// src/pages/ForgotPassword.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../CSS/ForgotPassword.css";
import { getPasswordResetToken } from "../services/operations/authApi";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);  // ✅ Local state
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const dispatch = useDispatch();

    // ✅ Timer countdown
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ✅ Call API
            await dispatch(getPasswordResetToken(email, setEmailSent));

            // ✅ Start timer immediately after API call (success handled by thunk)
            setResendTimer(30);

        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-root">
            <div className="forgot-card">
                <h1 className="forgot-title">
                    {!emailSent ? "Reset your password" : "Check email"}
                </h1>

                <p className="forgot-desc">
                    {!emailSent
                        ? "Have no fear. We'll email you instructions to reset your password."
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

                    {/* ✅ SINGLE BUTTON - Perfect conditional logic */}
                    <button
                        type="submit"
                        className="forgot-btn"
                        disabled={loading || resendTimer > 0}
                    >
                        {loading
                            ? "Sending..."
                            : resendTimer > 0
                                ? `Resend (${resendTimer}s)`      // ✅ Timer countdown
                                : emailSent
                                    ? "Resend Email"                // ✅ Resend enabled
                                    : "Submit"                       // ✅ Initial state
                        }
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
