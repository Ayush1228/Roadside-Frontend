// const BaseURL = process.env.REACT_APP_API_URL + "/api/v1";
const BaseURL = import.meta.env.VITE_API_URL;


// Auth Endpoints
export const endpoints = {
    // Registration & Login
    REGISTER_API: BaseURL + "/auth/register",
    LOGIN_API: BaseURL + "/auth/login",
    // REFRESH_TOKEN_API: BaseURL + "/auth/refresh",

    // OTP Flow
    SEND_OTP: BaseURL + "/auth/otp/send",
    OTP_LOGIN: BaseURL + "/auth/otp/login",

    // Password Management
    FORGOT_PASSWORD_API: BaseURL + "/auth/forgot-password",
    VALIDATE_RESET_TOKEN_API: BaseURL + "/auth/password/reset", // GET
    RESET_PASSWORD_API: BaseURL + "/auth/password/reset",     // POST

    // Logout
    LOGOUT_API: BaseURL + "/auth/logout",
    LOGOUT_ALL_API: BaseURL + "/auth/logout-all",

    
};
