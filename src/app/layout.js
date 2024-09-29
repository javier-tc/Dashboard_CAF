//src/app/layout.jsx

import Menu from "@/components/menu/Menu";
import "./globals.css";

// import Navbar from "@/components/navbar/Navbar";

export const metadata = {
  title: "Dashboard",
  description: "",
};
import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}	>
          <Menu />
          {/* <Navbar /> */}
          <div className="container">
            {children}
          </div>
      </body>
    </html>
  );
}
