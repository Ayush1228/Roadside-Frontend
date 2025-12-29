import toast from 'react-hot-toast';
import roleCheck from '../../../roleCheck';
import { setLoading, setToken } from '../../slices/authSlice';
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
                throw new Error(response.message);
            }
            // toast.success("Logged in successfully");
            dispatch(setToken(response.data.accessToken));

            let role = roleCheck(response.data.accessToken);
            if (type === "admin") {
                if (role == "ADMIN") {
                    toast.success("Logged in successfully");
                    localStorage.setItem("token", JSON.stringify(response.data.accessToken));
                    navigate("/admin-dashboard");
                } else {
                    toast.error("Unauthorized Access");
                }
            }
            else if (type === "garage") {
                if (role == "GARAGE" || role == "USER") {
                    toast.success("Logged in successfully");
                    navigate("/garage-dashboard");
                    localStorage.setItem("token", JSON.stringify(response.data.accessToken));
                    // Hit API
                    console.log("pahuche hai avi");
                    dispatch(GarageOwnerStatus(response.data.accessToken, navigate));
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

            // ✅ SAFE NAVIGATION
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
    return async () => {
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
                console.log("Garage nhi haii Form banao")
            }
            else if (response.data.kycStatus === "PENDING") {
                // showWaitingMessage();
                console.log("KYC PENDING WAITING MESSAGE SHOW KARO");
            }
            else if (response.data.kycStatus === "REJECTED") {
                // showReapplyForm();
                console.log("REject ho gya ji")
                navigate("/garage-register");
            }
            else if (response.data.kycStatus === "APPROVED") {
                console.log("Approve ho gya ji");
                navigate("/garage-dashboard");
            }
        } catch (error) {

        }
    }
}
