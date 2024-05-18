import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const user = true;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])
    user ? children : null;
};

export default ProtectedRoutes;