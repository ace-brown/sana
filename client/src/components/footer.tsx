import { FaTelegram, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import logo from "@/images/logo.svg";

const socials = [
  { label: "Telegram", icon: FaTelegram },
  { label: "Twitter", icon: FaTwitter },
  { label: "Instagram", icon: FaInstagram },
  { label: "LinkedIn", icon: FaLinkedin },
];

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[2fr_1fr_1fr] md:px-6">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src={logo} alt="Khayam Sana logo" width={24} />
            <span className="text-lg font-semibold">Khayam Sana</span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            From validation to execution, we give you the tools, guidance and
            community you need to build, launch and grow your business.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            {socials.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="transition-colors hover:text-primary"
                rel="noreferrer"
              >
                <Icon className="text-xl" />
              </a>
            ))}
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold">{column.title}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground md:px-6">
          © {new Date().getFullYear()} Khayam Sana. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
