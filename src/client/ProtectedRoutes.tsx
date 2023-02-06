// import { useContext } from "react";
// import { useLocation } from "react-router";
// import { Navigate, Outlet } from "react-router-dom";


// const useAuth = () =>{
//     const { user } = useContext(UserContext);
//     return user && user.loggedIn;

// }

// const ProtectedRoutes = () =>{
//     const location = useLocation()
//     const isAuth = useAuth();
//     // What does replace do? User redirected to page before the one they were redirected from.
//     return isAuth ? <Outlet /> : <Navigate to='/' replace state={{from: location}} />
// };

// export default ProtectedRoutes;