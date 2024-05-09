/* eslint-disable no-unused-vars */
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white rounded-t-md">
      <div className="max-w-[1200px] mx-auto  px-4 py-10 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold text-lg mb-2">About Us</h4>
          <p className="text-gray-400">
            We are your local farmer market providing fresh, organic produce and
            goods. Dedicated to quality and sustainability.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">Contact Us</h4>
          <p className="text-gray-400">Email: contact@localfarmermarket.com</p>
          <p className="text-gray-400">Phone: +(977) 000-0000-000</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">Follow Us</h4>
          <p className="text-gray-400">
            Stay connected with us on social media for updates!
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 mt-8 py-4">
        <p className="text-center text-gray-400 text-sm">
          &copy; 2024 Local Farmer Market. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
