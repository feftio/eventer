import React from "react";

export default function HomePage() {
  const subdomain = (window as any).subdomain
  return (
    <>
      <div>HomePage: {subdomain}</div>
    </>
  );
}
