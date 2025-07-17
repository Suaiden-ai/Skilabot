import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("404 Not Found | Skilabot");
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Página não encontrada</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
