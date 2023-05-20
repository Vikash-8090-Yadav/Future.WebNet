import React from "react";

const FullPageLoading = () => {

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="h-screen flex justify-center items-center">
                <div className="spinner-border text-indigo-500 h-20 w-20" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default FullPageLoading;
