import { FaTelegram, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
        {/* Useful Links */}
        <div className="space-y-2">
          <h3 className="text-white font-bold">لینک‌های مفید</h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="hover:text-gray-100">
                خانه
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                درباره ما
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                وبلاگ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                تماس
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                اخبار
              </Link>
            </li>
          </ul>
        </div>
        {/* Support */}
        <div className="space-y-2">
          <h3 className="text-white font-bold">پشتیبانی</h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="hover:text-gray-100">
                مرکز کمک
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                سؤالات متداول
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                قوانین
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                حریم خصوصی{" "}
              </Link>
            </li>
          </ul>
        </div>
        {/* Company */}
        <div className="space-y-2">
          <h3 className="text-white font-bold">شرکت</h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="hover:text-gray-100">
                فرصت‌های شغلی
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                همکاران
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                فروش
              </Link>
            </li>
          </ul>
        </div>
        {/* Resources */}
        <div className="space-y-2">
          <h3 className="text-white font-bold">منابع</h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="hover:text-gray-100">
                انتشارات
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                مشاوره
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                پژوهش
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                ثبت اختراع
              </Link>
            </li>
          </ul>
        </div>
        {/* Social Media Icons and address */}
        <div className="grid grid-rows-2 gap-4">
          <div className="flex items-center space-x-reverse gap-4">
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
          <div className="text-gray-600">
            <p>خیابان ولیعصر، بلوار کشاورز، شماره ۱۲۳</p>
            <p>تهران، ایران</p>

            <p>تلفن: sana@yahoo.com</p>

            <p>ایمیل: +49 123 456 789</p>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="mt-8 text-center text-xs text-gray-500">
        کلیه حقوق این وبسایت متعلق به خیام سانا است.
      </div>
    </footer>
  );
}
