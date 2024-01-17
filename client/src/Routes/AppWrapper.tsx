import React, { ReactNode } from 'react';

import { ToastContainer } from 'react-toastify';

import Loader from '@/utils/Loader';
import Navbar from '@/Component/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';


interface AppWrapperProps {
    children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    const location = useLocation();

    return <>
        <Loader />
        {location.pathname.startsWith("/admin") ? null : <Navbar />}
        {children}

        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <Toaster />
    </>;

};

export default React.memo(AppWrapper);
