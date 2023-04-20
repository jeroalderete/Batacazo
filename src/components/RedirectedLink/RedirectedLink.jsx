import React, { useEffect } from "react";
import "./RedirectedLink.css";

const RedirectLink = () => {
  useEffect(() => {
    const redirectToLink = () => {
      const link = "/";
      window.location.href = link;
    };

    const timeoutId = setTimeout(redirectToLink, 20000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <div></div>;
};

export default RedirectLink;
