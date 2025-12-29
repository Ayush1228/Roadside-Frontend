// src/components/garage/GarageRegister.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../CSS/GarageAuth.css";
import { signUp } from "../../services/operations/authApi";
import VerificationModal from "./VerificationModal";

const GarageRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password");

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // ✅ Submit handler
  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const success = await dispatch(
      signUp(
        data.fullName,
        data.email,
        data.password,
        data.phoneNumber
      )
    );

    if (success) {
      setModalEmail(data.email);
      setShowModal(true);
      reset();
    } else {
      setIsSubmitting(false);
    }
  };

  // ✅ Auto close modal after 5 sec and navigate
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        navigate("/garage-login");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showModal, navigate]);

  return (
    <div className="auth-root">
      <div className="auth-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="auth-title">Garage Register</h2>

          {/* Full Name */}
          <label className="auth-label">
            Full Name
            <input
              type="text"
              className={`auth-input ${errors.fullName ? "has-error" : ""}`}
              {...register("fullName", {
                required: "Full name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
            />
            {errors.fullName && (
              <span className="field-error">{errors.fullName.message}</span>
            )}
          </label>

          {/* Email */}
          <label className="auth-label">
            Email Address
            <input
              type="email"
              className={`auth-input ${errors.email ? "has-error" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className="field-error">{errors.email.message}</span>
            )}
          </label>

          {/* Phone */}
          <label className="auth-label">
            Phone Number
            <input
              type="tel"
              className={`auth-input ${errors.phoneNumber ? "has-error" : ""}`}
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10-digit phone number",
                },
              })}
            />
            {errors.phoneNumber && (
              <span className="field-error">{errors.phoneNumber.message}</span>
            )}
          </label>

          {/* Password */}
          <label className="auth-label">
            Password
            <input
              type="password"
              className={`auth-input ${errors.password ? "has-error" : ""}`}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: strongPasswordRegex,
                  message:
                    "Password must be 8+ chars with uppercase, lowercase, number & special char",
                },
              })}
            />
            {errors.password && (
              <span className="field-error">{errors.password.message}</span>
            )}
          </label>

          {/* Confirm Password */}
          <label className="auth-label">
            Confirm Password
            <input
              type="password"
              className={`auth-input ${errors.confirmPassword ? "has-error" : ""}`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span className="field-error">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="auth-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          {/* Switch */}
          <div className="auth-switcher">
            <button
              type="button"
              className="switch-link"
              onClick={() => navigate("/garage-login")}
              disabled={isSubmitting}
            >
              Already have an account?
            </button>
          </div>
        </form>

        {/* Verification Modal */}
        <VerificationModal
          isOpen={showModal}
          title="Account Created Successfully! ✅"
          message="Verification email sent to your inbox. Please check your email and verify your account."
          email={modalEmail}
          type="success"
        />
      </div>
    </div>
  );
};

export default GarageRegister;
