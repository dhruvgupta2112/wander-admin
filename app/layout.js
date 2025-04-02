import "./globals.css";
import Navbar from "../components/Navbar";
// import { useEffect, useState } from "react";
// import { parseCookies } from "nookies";


export const metadata = {
  title: "Wander",
  description: "admin for wander",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar /> 
        {children}
      </body>
    </html>
  );
}
