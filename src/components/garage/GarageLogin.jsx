// src/components/garage/GarageLogin.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../CSS/GarageAuth.css";
import { login } from "../../services/operations/authApi";
import VerificationModal from "./VerificationModal";

const GarageLogin = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalEmail, setModalEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        console.log("GARAGE LOGIN DATA:", data);

        try {
            await dispatch(login(data.emailOrNumber, data.password, navigate, "garage"));
            reset();
        } catch (error) {
            console.log("Login error:", error);

            // Check for EMAIL_NOT_VERIFIED
            if (error?.message?.includes("EMAIL_NOT_VERIFIED")) {
                setModalEmail(data.emailOrNumber);
                setShowModal(true);
                setTimeout(() => setShowModal(false), 5000);
                return;
            }

            setError("root", { message: "Invalid credentials" });
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <>
            <div className="auth-root">
                <div className="auth-card">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="auth-title">Garage Login</h2>

                        <label className="auth-label">
                            Email or Phone Number
                            <input
                                className={`auth-input ${errors.emailOrNumber ? "has-error" : ""}`}
                                {...register("emailOrNumber", { required: "Email or phone is required" })}
                            />
                            {errors.emailOrNumber && (
                                <span className="field-error">{errors.emailOrNumber.message}</span>
                            )}
                        </label>

                        <label className="auth-label">
                            Password
                            <input
                                type="password"
                                className={`auth-input ${errors.password ? "has-error" : ""}`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && (
                                <span className="field-error">{errors.password.message}</span>
                            )}
                        </label>

                        {errors.root && <p className="auth-error">{errors.root.message}</p>}

                        <button type="submit" className="auth-btn">
                            Login
                        </button>

                        {/* ✅ Forgot Password Link */}
                        <div className="auth-links">
                            <button
                                type="button"
                                className="link-btn"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* ✅ Don't have account? Register */}
                        <div className="auth-switcher">
                            <button
                                type="button"
                                className="switch-link"
                                onClick={() => navigate("/garage-register")}
                            >
                                Don't have an account? Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ✅ EMAIL_NOT_VERIFIED Modal */}
            <VerificationModal
                isOpen={showModal}
                onClose={closeModal}
                title="Email Verification Required"
                message="Please check your inbox and click the verification link before logging in."
                email={modalEmail}
                type="warning"
            />
        </>
    );
};

export default GarageLogin;
