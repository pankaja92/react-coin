import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

const Notfound = () => {
  return (
    <div className="NotFound">
      <h1 className="NotFound-title">Oops! Page Not Found</h1>
      <Link to="/" className="NotFound-link">
        Go to Homepage
      </Link>
    </div>
  );
};

export default Notfound;
