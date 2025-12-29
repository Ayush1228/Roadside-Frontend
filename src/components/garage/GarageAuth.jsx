// // src/components/garage/GarageAuth.jsx
// import { useState } from "react";
// import GarageLogin from "./GarageLogin";
// import GarageRegister from "./GarageRegister";
// import "../../CSS/GarageAuth.css";

// const GarageAuth = () => {
//   const [mode, setMode] = useState("login");

//   const handleToggle = (newMode) => {
//     setMode(newMode);
//   };

//   return (
//     <div className="auth-root">
//       <div className="auth-card">
//         {mode === "login" && <GarageLogin onToggle={handleToggle} />}
//         {mode === "register" && <GarageRegister onToggle={handleToggle} />}
//       </div>
//     </div>
//   );
// };

// export default GarageAuth;
