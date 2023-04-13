import React from "react";
import { useRouteError } from "react-router-dom";

const RouteErrorBoundary = () => {
  const error = useRouteError();
  console.error("route error", error);
  return <div>{error.message}</div>;
};

export default RouteErrorBoundary;
