// src/components/garage/GarageLogin.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../CSS/GarageAuth.css";
import { login } from "../../services/operations/authApi";
import VerificationModal from "./VerificationModal";

const GarageLogin = ({ onToggle }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalEmail, setModalEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async (data) => {
        console.log("GARAGE LOGIN DATA:", data);

        // call API
        try {
            await dispatch(login(data.emailOrNumber, data.password, navigate , "garage"));
            // backend should decide role and redirect (garage/admin) via authApi.js
        } catch (e) {
            // optional: if your thunk throws, handle here
            setError("root", { message: "Login failed" });
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="auth-title">Garage Login</h2>

                <label className="auth-label">
                    Email or Phone Number
                    <input
                        type="text"
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
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
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

                <div className="auth-links">
                    <button
                        type="button"
                        className="link-btn"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </button>
                </div>

                <div className="auth-switcher">
                    <button
                        type="button"
                        className="switch-link"
                        onClick={() => onToggle("register")}
                    >
                        Don't have an account?
                    </button>
                </div>
            </form>

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
