import { useLocation, useNavigate } from "react-router-dom";

export const useSmartNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateHome = () => {
    if (location.pathname === "/") {
      // Already on home page, just scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home page
      navigate("/");
    }
  };

  return { navigateHome };
};
