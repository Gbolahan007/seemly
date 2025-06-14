import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-24 bg-gray-900 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-400">
            Nurse Essentials
          </h2>
          <p className="mt-2 text-gray-400">
            Your go-to store for high-quality nursing accessories, scrubs, and
            essentials.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-green-400">
            Quick Links
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-300 transition hover:text-green-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-300 transition hover:text-green-400"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 transition hover:text-green-400"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Popular Categories */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-green-400">
            Categories
          </h2>
          <ul className="space-y-2">
            <li className="text-gray-300 transition hover:text-green-400">
              Scrubs
            </li>
            <li className="text-gray-300 transition hover:text-green-400">
              Nursing Tees
            </li>
            <li className="text-gray-300 transition hover:text-green-400">
              Badges & Pins
            </li>
            <li className="text-gray-300 transition hover:text-green-400">
              Caps & Accessories
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-green-400">Get in Touch</h2>
          <a
            href="mailto:Seemlyprofessionals@gmail.com"
            className="flex items-center justify-center gap-2 text-gray-300 transition hover:text-green-400 sm:justify-start"
          >
            <TfiEmail size={20} />
            <span>Seemlyprofessionals@gmail.com</span>
          </a>

          <div className="mt-2 flex justify-center gap-4 sm:justify-start">
            <a
              href="https://www.instagram.com/seemly_professionals?igsh=MWptMW1scDFqcG91YQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineInstagram
                size={24}
                className="text-gray-300 transition hover:text-green-400"
              />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter
                size={22}
                className="text-gray-300 transition hover:text-green-400"
              />
            </a>
            <a
              href="https://wa.me/yourphonenumber"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsWhatsapp
                size={22}
                className="text-gray-300 transition hover:text-green-400"
              />
            </a>
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsFacebook
                size={22}
                className="text-gray-300 transition hover:text-green-400"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Nurse Essentials. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
