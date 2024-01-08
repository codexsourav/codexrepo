import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
    page: ReactNode;
}

function Protected({ page }: ProtectedProps) {
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem(import.meta.env.VITE_AUTHKEY);
        if (!auth) {
            navigate("/", { replace: true });
        }
    }, []);
    return page;
}

export default React.memo(Protected);
