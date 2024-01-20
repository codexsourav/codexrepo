
import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
    page: ReactNode;
    isadmin?: boolean,
}

function Protected({ page, isadmin = false }: ProtectedProps) {
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem(isadmin ? import.meta.env.VITE_ADMINAUTHKEY : import.meta.env.VITE_AUTHKEY);
        if (!auth) {
            navigate((isadmin ? "/admin/login" : "/"), { replace: true });
        }
    }, []);
    return page;
}

export default React.memo(Protected);
