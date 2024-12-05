import Link from "next/link";

const Footer = () => {
    const contactLinks = ["/api" , "/api1" , "/api2"];
  return (
    <footer className="w-full border-t bg-white py-6 -mb-16 ">
        <div className="max-w-[2000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <p className="text-sm text-gray-500">&copy; 2024 LinkLum. All rights reserved.</p>
          <nav className="flex gap-4">
            
            <Link href="/about" className="text-sm text-gray-500 hover:underline">
              About
            </Link>
            <Link href="/faq" className="text-sm text-gray-500 hover:underline">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:underline">
              Contact us
            </Link>
            <Link href="/terms-and-conditions" className="text-sm text-gray-500 hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-sm text-gray-500 hover:underline">
              Privacy Policy
            </Link>
          </nav>
        </div>
    </footer>
  )
}

export default Footer