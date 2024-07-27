import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h2>
        Oops, <span>s</span>omething went wrong.
      </h2>
      <Link to="/" className="vytvorit">
        Return to Home
      </Link>
    </div>
  );
}
