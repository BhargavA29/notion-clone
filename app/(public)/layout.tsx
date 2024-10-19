import React from "react";

const PublicLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-max dark:bg-[#1f1f1f]">
            {children}
        </div>
    );
}

export default PublicLayout;
