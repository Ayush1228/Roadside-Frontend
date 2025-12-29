// src/components/garage/GarageLogin.jsx

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../CSS/GarageAuth.css";
import { login } from "../../services/operations/authApi";

const GarageLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await dispatch(
                login(data.emailOrNumber, data.password, navigate, "garage")
            );
        } catch {
            setError("root", { message: "Login failed" });
        }
    };

    return (
        <div className="auth-root">
            <div className="auth-card">
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="auth-title">Garage Login</h2>

            <label className="auth-label">
                Email or Phone Number
                <input
                    className={`auth-input ${errors.emailOrNumber ? "has-error" : ""}`}
                    {...register("emailOrNumber", { required: "Required" })}
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
                    {...register("password", { required: "Required" })}
                />
                {errors.password && (
                    <span className="field-error">{errors.password.message}</span>
                )}
            </label>

            {errors.root && <p className="auth-error">{errors.root.message}</p>}

            <button type="submit" className="auth-btn">
                Login
            </button>

            <div className="auth-switcher">
                <button
                    type="button"
                    className="switch-link"
                    onClick={() => navigate("/garage-register")}
                >
                    Don't have an account?
                </button>
            </div>
        </form>
        </div>
        </div>
    );
};

export default GarageLogin;
