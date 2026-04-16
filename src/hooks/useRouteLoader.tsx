"use client";

import { useState } from "react";

let globalSetLoading: (v: boolean) => void;

export function useRouteLoader() {
  const [loading, setLoading] = useState(false);

  globalSetLoading = setLoading;

  return { loading };
}

export const startRouteLoading = () => {
  globalSetLoading?.(true);
};

export const stopRouteLoading = () => {
  globalSetLoading?.(false);
};