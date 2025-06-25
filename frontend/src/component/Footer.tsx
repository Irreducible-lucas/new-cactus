import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { footerLinks } from "../constant";

import type { FooterProps } from "../type";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div
        className={`py-[40px] px-4 md:px-[40px] lg:px-[80px] lg:py-[80px] grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-8`}
      >
        {/* Logo and Description */}
        <div className="col-span-2">
          <h2 className="text-2xl font-bold text-yellow-500">CACTUS</h2>
          <p className="mt-2 text-sm text-gray-200">
            We're committed to providing an exceptional home styling experience
            that reflects your unique taste from elegant frames and furniture to
            stunning décor and artwork.
          </p>
          <p className="mt-4">
            <span className="block text-sm text-gray-300">
              Email: cactusofficialstore752@gmail.com
            </span>
            <span className="block text-sm text-gray-300">
              Call: 08065137683
            </span>
          </p>
        </div>

        {/* Dynamic Sections */}
        {footerLinks.map((section: FooterProps, index: number) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-yellow-500 text-center">
              {section.title}
            </h3>
            <ul className="mt-2 space-y-2 text-center">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={section.urls[idx]}
                    className="text-sm text-gray-200 hover:text-yellow-500 "
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 mt-8 border-t pt-4 flex justify-between items-center flex-col md:flex-row space-y-5 py-8">
        <p className="text-sm text-gray-500">
          Copyright © 2025 by{" "}
          <span className="text-yellow-400 font-bold">Cactus</span> All Rights
          Reserved.
        </p>
        <div className="flex space-x-4 text-gray-600">
          <a
            href="https://www.facebook.com/share/19tynZHr8R/?mibextid=wwXIfr"
            className="hover:text-blue-500"
          >
            <FaFacebook size={20} />
          </a>

          <a
            href="https://www.instagram.com/wimwheels?igsh=MWprbWN3NTUwaDZqdg%3D%3D&utm_source=qr"
            className="hover:text-red-500"
          >
            <FaInstagram size={20} />
          </a>
          <a href="https://x.com/WIM854" className="hover:text-blue-500">
            <FaTwitter size={20} />
          </a>
          <a
            href="https://wa.me/2348065137683"
            className="hover:text-green-500"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
