import { FaTelegram, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";
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
            >
              <FaTelegram className="text-2xl" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-blue-400 mr-4"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-500 mr-4"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-blue-600 mr-0"
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
              <a href="#" className="hover:text-gray-100">
                {t("navigation.publication")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.consultation")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.research")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.patentRegistration")}
              </a>
            </li>
          </ul>
        </div>
        {/* Company */}
        <div className="space-y-2">
          <h3 className="text-white font-bold">{t("navigation.company")}</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.careers")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.partners")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.sales")}
              </a>
            </li>
          </ul>
        </div>
        {/* Support */}
        <div className="space-y-2">
          <h3 className="text-white font-bold">{t("navigation.support")}</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.helpCenter")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.faq")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.terms")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.privacy")}
              </a>
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
              <a href="#" className="hover:text-gray-100">
                {t("navigation.home")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.about")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.blog")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.contact")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-100">
                {t("navigation.news")}
              </a>
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
