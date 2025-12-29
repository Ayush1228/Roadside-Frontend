// src/components/garage/GarageRegister.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import VerificationModal from "./VerificationModal";
import "../../CSS/GarageAuth.css";

const GarageRegister = ({ onToggle }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password");
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const onSubmit = (data) => {
    console.log("GARAGE REGISTER DATA:", data);
    
    setModalEmail(data.emailOrNumber);
    setShowModal(true);
    
    setTimeout(() => {
      setShowModal(false);
      onToggle("login");
      reset();
    }, 5000);
  };

  const closeModal = () => {
    setShowModal(false);
    onToggle("login");
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth-title">Garage Register</h2>

        <label className="auth-label">
          Full Name
          <input
            type="text"
            className={`auth-input ${errors.fullName ? "has-error" : ""}`}
            {...register("fullName", { 
              required: "Full name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" }
            })}
          />
          {errors.fullName && <span className="field-error">{errors.fullName.message}</span>}
        </label>

        <label className="auth-label">
          Email or Phone Number
          <input
            type="text"
            className={`auth-input ${errors.emailOrNumber ? "has-error" : ""}`}
            {...register("emailOrNumber", { required: "Email or phone number is required" })}
          />
          {errors.emailOrNumber && <span className="field-error">{errors.emailOrNumber.message}</span>}
        </label>

        <label className="auth-label">
          Password
          <input
            type="password"
            className={`auth-input ${errors.password ? "has-error" : ""}`}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: strongPasswordRegex,
                message: "Password must be 8+ chars with uppercase, lowercase, number & special char"
              }
            })}
          />
          {errors.password && <span className="field-error">{errors.password.message}</span>}
        </label>

        <label className="auth-label">
          Confirm Password
          <input
            type="password"
            className={`auth-input ${errors.confirmPassword ? "has-error" : ""}`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.message}</span>}
        </label>

        <button type="submit" className="auth-btn">
          Create Account
        </button>

        {/* Already have account → Login */}
        <div className="auth-switcher">
          {/* <span>Already have an account?</span> */}
          <button
            type="button"
            className="switch-link"
            onClick={() => onToggle("login")}
          >
            Already have an account?
          </button>
        </div>
      </form>

      <VerificationModal
        isOpen={showModal}
        onClose={closeModal}
        title="Account Created!"
        message="Please check your inbox and verify your account to continue."
        email={modalEmail}
        type="success"
      />
    </>
  );
};

export default GarageRegister;
