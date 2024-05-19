import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const user = true;
    const navigate = useNavigate();
    if (!user) {
        navigate('/login')
        return null
    }
    return children
};

export default ProtectedRoutes;