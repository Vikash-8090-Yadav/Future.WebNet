import React from "react";

const AppFooter = () => {
  return (
    <div className="bg-transparent py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Diky Wiraguna. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AppFooter;
