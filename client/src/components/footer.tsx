import { FaTelegram, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 px-8 pb-2 pt-5 mt-20 relative z-10">
      {/* Footer Content */}
      <div className="flex justify-between gap-4 text-[1rem]">
        {/* Links */}
        <ul className="flex gap-6">
          {/* <li>
            <Link href="#" className="hover:text-gray-100">
              Support
            </Link>
          </li> */}
          {/* <li>
            <Link href="#" className="hover:text-gray-100">
              Help Center
            </Link>
          </li> */}
          <li>
            <Link href="/contact" className="hover:text-gray-100">
              Contact
            </Link>
          </li>
          {/* <li>
            <Link href="#" className="hover:text-gray-100">
              FAQ
            </Link>
          </li> */}
          <li>
            <Link href="/terms" className="hover:text-gray-100">
              Terms
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-gray-100">
              Privacy
            </Link>
          </li>
        </ul>
        {/* Social media */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Telegram"
            className="hover:text-blue-500"
            rel="noreferrer"
          >
            <FaTelegram className="text-2xl" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-blue-400"
            rel="noreferrer"
          >
            <FaTwitter className="text-2xl" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-pink-500"
            rel="noreferrer"
          >
            <FaInstagram className="text-2xl" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-blue-600"
            rel="noreferrer"
          >
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="text-center text-[0.75rem] text-gray-500 mt-2">
        All rights reserved by Khayam Sana.
      </div>
    </footer>
  );
}
