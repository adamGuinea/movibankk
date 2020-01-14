import React from "react";
import { FallbackProps } from "react-error-boundary";

export type ErrorBoundaryState = {
  error: Error;
  componentStack: string | null;
};

export const FallbackComponent = ({ componentStack, error }: FallbackProps) => (
  <div className="fallback">
    <p className="fallback__title">Gahh! An error occured!</p>
    <p>Here’s what we know…</p>
    <p className="fallback__title">Error:</p>
    <p> {error !== undefined && error.toString()}</p>
    <p className="fallback__title">Stacktrace:</p>
    <p> {componentStack}</p>
  </div>
);
