import React from "react";
import Navbar from "./components/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";

const PageOutlet = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageOutlet />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <div className="overflow-x-hidden">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
