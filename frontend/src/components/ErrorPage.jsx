import React from "react";
import { Alert } from "react-bootstrap";

const ErrorPage = ({ variant = "danger", children }) => {
  return (
    <div>
      <Alert style={{ fontSize: 20 }} variant={variant}>
        <strong>{children}</strong>
      </Alert>
    </div>
  );
};

export default ErrorPage;
