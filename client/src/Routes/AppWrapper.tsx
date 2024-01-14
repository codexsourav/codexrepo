import React, { ReactNode } from 'react';

import { ToastContainer } from 'react-toastify';

import Loader from '@/utils/Loader';

interface AppWrapperProps {
    children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {

    return <>
        <Loader />
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
    </>;

};

export default React.memo(AppWrapper);
