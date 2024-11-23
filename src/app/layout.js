import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../components/header/Navbar'
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LinkLum",
  description: "Connecting Generations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} mb-20`}>
      <Toaster/>
      {/* <Navbar /> */}
      {children}
      </body>
    </html>
  );
}
