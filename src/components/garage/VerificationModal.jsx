// src/components/garage/VerificationModal.jsx
import "../../CSS/GarageAuth.css";

const VerificationModal = ({
    isOpen,
    onClose,
    title,
    message,
    email,
    type = "success"
}) => {
    if (!isOpen) return null;

    return (
        <div className="verification-modal-overlay">
            <div className="verification-modal">
                <div className="modal-content">
                    <div className={`modal-icon ${type}`}>
                        {type === "success" ? "✅" : "⚠️"}
                    </div>

                    <h3 className="modal-title">{title}</h3>

                    {email && (
                        <>
                            <p className="modal-text">Verification email sent to:</p>
                            <code className="email-display">{email}</code>
                        </>
                    )}

                    <p className="modal-text">{message}</p>

                    <div className="modal-timer">
                        Auto closing in <span className="timer-count">5</span>s
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationModal;
