import { useLocation, useNavigate } from "react-router-dom";

export const useSmartNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const navigateToSection = (sectionId: string) => {
    const scrollToElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname === "/") {
      scrollToElement();
    } else {
      navigate("/");
      setTimeout(scrollToElement, 100);
    }
  };

  return { navigateHome, navigateToSection };
};
