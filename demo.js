// import {jwtDecode} from "jwt-decode";
import roleCheck from "./roleCheck";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMzE5MmE0My05YWJiLTQ4ZjYtYWY3Mi1mNmQ5MGI4ZDlhYmMiLCJzdWIiOiI1OGVlMjYyMi05ZTY4LTRjNjUtYTU1OC00ZTJhN2E4NjQ5NjYiLCJpYXQiOjE3NjcwMDI0MDUsImV4cCI6MTc2NzA4ODgwNSwidHlwZSI6ImFjY2VzcyIsInVzZXJuYW1lIjoiYXl1c2hrcjE4N0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVU0VSIl19.5c4oFZp2whTIRwBrCz4LQ1eH0aAJtf-TlDfDyALtXv0"

const decoded = roleCheck(token);

console.log(decoded);

// if (!hasGarage) {
//   showCreateGarageForm();
// }
// else if (kycStatus === "PENDING") {
//   showWaitingMessage();
// }
// else if (kycStatus === "REJECTED") {
//   showReapplyForm();
// }
// else if (kycStatus === "APPROVED") {
//   navigate("/garage/profile");
// }


// ["USER", "GARAGE"]




