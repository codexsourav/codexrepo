// ExploreWrapper.tsx

import { ReactNode } from "react";

interface ExploreWrapperProps {
    children: ReactNode;
}

const ExploreWrapper: React.FC<ExploreWrapperProps> = ({ children }) => {
    return (
        <div className="container">
            <div className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-6">

                {children}

            </div>
        </div>
    );
}

export default ExploreWrapper;
