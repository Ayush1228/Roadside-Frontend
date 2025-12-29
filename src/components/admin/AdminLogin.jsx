// src/components/admin/AdminLogin.jsx
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../CSS/AdminLogin.css";
import { login } from "../../services/operations/authApi";

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async (data) => {
        console.log("ADMIN LOGIN DATA:", data);

        try {
            // pass email as userName into authApi login
            await dispatch(login(data.email, data.password, navigate , "admin"));
            // authApi.js will check token, find role=admin, and navigate to /admin-dashboard
        } catch (e) {
            setError("root", { message: "Login failed" });
        }
    };

    return (
        <div className="auth-root">
            <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="auth-title">Admin Login</h2>

                <label className="auth-label">
                    Email
                    <input
                        type="email"
                        className={`auth-input ${errors.email ? "has-error" : ""}`}
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <span className="field-error">{errors.email.message}</span>
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
                                message: "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <span className="field-error">{errors.password.message}</span>
                    )}
                </label>

                {errors.root && (
                    <p className="auth-error">{errors.root.message}</p>
                )}

                <button type="submit" className="auth-btn">
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
