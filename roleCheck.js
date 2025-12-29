import {jwtDecode} from "jwt-decode";

const roleCheck = (token) => {
    const decoded = jwtDecode(token);
    console.log(decoded);
    return decoded.roles;

};

export default roleCheck;


