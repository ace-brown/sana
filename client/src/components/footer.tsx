import { FaTelegram, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const alignment = locale === "en" ? "text-left" : "text-right";
  const justify = locale === "en" ? "justify-start" : "justify-end";

  return (
    <footer className="bg-gray-800 text-gray-300 p-8 mt-20">
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-sm ${alignment}`}
      >
        {/* Social Media Icons and address */}
        <div className="grid grid-rows-2 gap-4">
          <div className={`flex items-center ${justify} space-x-reverse`}>
            <a
              href="#"
              aria-label="Telegram"
              className="hover:text-blue-500 mr-4"
              rel="noreferrer"
            >
              <FaTelegram className="text-2xl" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-blue-400 mr-4"
              rel="noreferrer"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-500 mr-4"
              rel="noreferrer"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-blue-600 mr-0"
              rel="noreferrer"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
          <div className={`text-gray-600 ${alignment}`}>
            <p>{t("address.street")}</p>
            <p>{t("address.city")}</p>
            {locale === "en" ? (
              <p>Phone: info@example.com</p>
            ) : (
              <p>info@example.com :تلفن</p>
            )}
            <p>{t("address.email")}: +49 123 456 789</p>
          </div>
        </div>
        {/* Resources */}
        <div className="space-y-2">
          <h3 className="text-white font-bold"> {t("navigation.resources")}</h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.publication")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.consultation")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.research")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.patentRegistration")}
              </Link>
            </li>
          </ul>
        </div>
        {/* Company */}
        <div className="space-y-2">
          <h3 className="text-white font-bold">{t("navigation.company")}</h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.careers")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.partners")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.sales")}
              </Link>
            </li>
          </ul>
        </div>
        {/* Support */}
        <div className="space-y-2">
          <h3 className="text-white font-bold">{t("navigation.support")}</h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.helpCenter")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.faq")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.terms")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.privacy")}
              </Link>
            </li>
          </ul>
        </div>
        {/* Useful Links */}
        <div className="space-y-2">
          <h3 className="text-white font-bold">
            {t("navigation.usefullLinks")}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.home")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.about")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.blog")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.contact")}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-100">
                {t("navigation.news")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} {t("navigation.copyRight")}
      </div>
    </footer>
  );
}
