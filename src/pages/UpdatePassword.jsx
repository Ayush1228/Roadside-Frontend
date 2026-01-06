// src/pages/UpdatePassword.jsx
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux"; // ✅ Redux
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "../CSS/UpdatePassword.css";
import { resetPassword, resetPasswordToken } from "../services/operations/authApi"; // ✅ Import API

const UpdatePassword = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth); // ✅ Loading state
    

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // ✅ Validate passwords match
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // const token = location.pathname.split("/").at(-1);
        console.log("RESET TOKEN:", token);
        console.log("NEW PASSWORD:", password);

        try {
            // Call resetPassword API
            const flag = await dispatch(resetPasswordToken(token, navigate)); //get
            
            if (flag) {
                console.log("second api");
                await dispatch(resetPassword(token, password, navigate)); //post
            }
            // Navigation handled by API ✅
        } catch (error) {
            console.log("Reset password error:", error);
        }
    };

    return (
        <div className="reset-root">
            <div className="reset-card">
                <h1 className="reset-title">Choose new password</h1>
                <p className="reset-desc">
                    Almost done. Enter your new password and you're all set.
                </p>

                <form onSubmit={handleOnSubmit} className="reset-form">
                    {/* Password with eye icon */}
                    <label className="reset-label">
                        <p className="reset-label-text">
                            New Password <sup>*</sup>
                        </p>
                        <div className="input-with-icon">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter new password"
                                className="reset-input"
                                disabled={loading}
                            />
                            {/* <span
                                className="eye-icon"
                                onClick={() => !loading && setShowPassword(!showPassword)}
                            >
                                {/* {showPassword ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )} */}
                           {/* </span> */}
                        </div>
                    </label>

                    {/* Confirm Password with eye icon */}
                    <label className="reset-label">
                        <p className="reset-label-text">
                            Confirm New Password <sup>*</sup>
                        </p>
                        <div className="input-with-icon">
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm new password"
                                className="reset-input"
                                disabled={loading}
                            />
                            {/* <span
                                className="eye-icon"
                                onClick={() => !loading && setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {/* {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )} */}
                            {/* </span> */}
                        </div>
                    </label>

                    {/* ✅ Loading state from Redux */}
                    <button
                        type="submit"
                        className="reset-btn"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <div className="reset-back">
                    <Link to="/garage-login" className="back-link">
                        <BiArrowBack size={18} /> Back To Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
