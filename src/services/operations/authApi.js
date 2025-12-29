import toast from 'react-hot-toast';
import roleCheck from '../../../roleCheck';
import { setLoading, setToken } from '../../slices/authSlice';
import { apiConnector } from '../apiconnector';
import { endpoints } from '../apis';

const {
    LOGIN_API,
    REGISTER_API,
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
                }
                else{
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



