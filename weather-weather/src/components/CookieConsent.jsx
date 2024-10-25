import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(true); // Set to true to show the banner initially

  useEffect(() => {
    // Clear the cookie when the component mounts to show the banner on every refresh
    Cookies.remove("cookieConsent");
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 }); // Store consent for 1 year
    setShowBanner(false); // Hide the banner when accepted
  };

  return (
    showBanner && (
      <div className="cookie-banner">
        <p>
          We use cookies to store your location to provide a better user
          experience. By continuing to use this site, you agree to our cookie
          policy in compliance with the POPI Act.
        </p>
        <button onClick={acceptCookies}>Accept</button>
      </div>
    )
  );
};

export default CookieConsent;
