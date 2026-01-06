import toast from 'react-hot-toast';
import roleCheck from '../../../roleCheck';
import { setLoading, setRefreshToken, setToken } from '../../slices/authSlice';
import { apiConnector } from '../apiconnector';
import { endpoints } from '../apis';

const {
    LOGIN_API,
    REGISTER_API,
    GARAGE_OWNER_STATUS_API,
    SEND_OTP,
    OTP_LOGIN,
    FORGOT_PASSWORD_API,
    RESET_PASSWORD_API,
    VALIDATE_RESET_TOKEN_API,
    LOGOUT_API,
    LOGOUT_ALL_API
} = endpoints;

export function login(username, password, navigate, type) {
    return async (dispatch) => {
        const toastId = toast.loading("Logging in...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                username,
                password
            });
            console.log("LOGIN API RESPONSE", response);
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
            // toast.success("Logged in successfully");
            dispatch(setToken(response.data.accessToken));
            dispatch(setRefreshToken(response.data.refreshToken));

            let role = roleCheck(response.data.accessToken);
            if (type === "admin") {
                if (role == "ADMIN") {
                    toast.success("Logged in successfully");
                    localStorage.setItem("token", JSON.stringify(response.data.accessToken));
                    localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
                    navigate("/admin-dashboard",{ replace: true });
                } else {
                    toast.error("Unauthorized Access");
                }
            }
            else if (type === "garage") {
                if (role == "GARAGE" || role == "USER") {
                    toast.success("Logged in successfully");
                    localStorage.setItem("token", JSON.stringify(response.data.accessToken));
                    localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
                    // Hit API
                    console.log("pahuche hai avi");
                    dispatch(GarageOwnerStatus(response.data.accessToken, navigate));
                    // user wala or garage wala dono ye api sambhalega

                }
                else {
                    toast.error("NO ACCESS TO MECHANIC");
                    navigate("/");
                }
            }
        } catch (error) {
            console.log("LOGIN API ERROR", error);
            toast.error(error.message || "Login failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(fullName, email, password, phoneNumber, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Registering...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", REGISTER_API, {
                fullName,
                email,
                password,
                phoneNumber,
            });

            if (response.status !== 200) {
                throw new Error(response.message);
            }

            toast.success("Registered successfully");

            // SAFE NAVIGATION
            setTimeout(() => {
                navigate("/garage-login");
            }, 3000);

            return true;
        } catch (error) {
            toast.error(error.message || "Registration failed");
            return false;
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}

export function GarageOwnerStatus(accessToken, navigate) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("GET",
                GARAGE_OWNER_STATUS_API,
                null,
                {
                    Authorization: `Bearer ${accessToken}`,
                });
            console.log("response aaya");
            console.log(response);
            if (!response.data.hasGarage) {
                // showCreateGarageForm();
                navigate("/create-garage");
                console.log("Garage nhi haii Form banao")
            }
            else if (response.data.kycStatus === "PENDING") {
                console.log("KYC PENDING – redirect with modal flag");

                navigate("/", {
                    replace: true,
                    state: {
                        showKycModal: true,
                        kycStatus: "PENDING",
                        title: "KYC Verification Pending",
                        message:
                            "Your garage details are under verification. You will be notified once approval is completed."
                    }
                });
            }

            else if (response.data.kycStatus === "REJECTED") {
                console.log("KYC REJECTED – redirect with modal flag");

                navigate("/garage-login", {
                    replace: true,
                    state: {
                        showKycModal: true,
                        kycStatus: "REJECTED",
                        title: "Garage Request Rejected",
                        message:
                            "Your garage verification request was rejected. Please reapply with correct details."
                    }
                });
            }

            else if (response.data.kycStatus === "APPROVED") {
                console.log("Approve ho gya ji");
                navigate("/garage-dashboard");
            }
        } catch (error) {

        }
    }
}


export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        console.log("ghus gaya");
        dispatch(setLoading(true));
        try {
            console.log(email);
            const response = await apiConnector("POST", FORGOT_PASSWORD_API, { email });

            console.log("response aaya", response);
            if (response.status !== 200) {
                throw new Error(response.message);
            }

            toast.success("Email sent successfully");
            setEmailSent(true);
        }
        catch (error) {
            toast.error(error.message || "Failed to send email");
            console.log(error);
        }
        dispatch(setLoading(false));
    }
}


export function resetPassword(token, newPassword, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESET_PASSWORD_API, {
                token,
                newPassword,
            });

            if (response.status !== 200) {
                throw new Error(response.message);
            } else {
                toast.success("Password reset successfully");
            }
        } catch (error) {
            toast.error(error.message || "Failed to reset password");
        }
        dispatch(setLoading(false));
        navigate("/garage-login");
    }
}


export const logout = (accessToken, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGOUT_API, refreshToken, {
                Authorization: `Bearer ${accessToken}`,
            });

            if (response.status !== 200) {
                throw new Error(response.message);
            }

            dispatch(setToken(null));
            localStorage.removeItem("token");
            toast.success("Logged out successfully");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Logout failed");
        }
        dispatch(setLoading(false));
    }
}



export const resetPasswordToken = (token, navigate) => {
    let flag = false;
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            console.log(VALIDATE_RESET_TOKEN_API, " token is ", token);
            // const response = await apiConnector("GET", VALIDATE_RESET_TOKEN_API, null, null, token);
            const response = await apiConnector(
                "GET",
                `${VALIDATE_RESET_TOKEN_API}?token=${token}`
            );

            console.log("Validation", response);
            if (response.status !== 200) {
                throw new Error(response.data.message);
            } else {
                toast.success("Token is valid");
                flag = true;
            }
        } catch (error) {
            toast.error("Link expired");
            console.log("invalid");
            navigate("/forgot-password");
        }
        dispatch(setLoading(false));
        return flag;
    }
}
