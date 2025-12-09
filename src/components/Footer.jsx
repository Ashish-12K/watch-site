import React from "react";
import { Link } from "react-router-dom";

import yt from "../assets/yt.svg";
import fb from "../assets/fb.svg";
import instagram from "../assets/instagram.svg";
import x from "../assets/x.svg";

import play from "../assets/play.svg";
import appstore from "../assets/appstore.svg";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Collections */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4 uppercase tracking-wide">Collections</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="#" className="hover:text-white">Titan Automatics</Link></li>
              <li><Link to="#" className="hover:text-white">Police Batman</Link></li>
              <li><Link to="#" className="hover:text-white">Stellar</Link></li>
              <li><Link to="#" className="hover:text-white">Raga Power Pearls</Link></li>
              <li><Link to="#" className="hover:text-white">Nebula Jewels</Link></li>
              <li><Link to="#" className="hover:text-white">Grandmaster</Link></li>
              <li><Link to="#" className="hover:text-white">Maritime</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4 uppercase tracking-wide">Customer Service</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="#" className="hover:text-white">Payment Options</Link></li>
              <li><Link to="#" className="hover:text-white">Track Order</Link></li>
              <li><Link to="#" className="hover:text-white">Encircle Program</Link></li>
              <li><Link to="#" className="hover:text-white">Find Stores</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4 uppercase tracking-wide">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="text-gray-300">1800-266-0123</li>
              <li><a href="mailto:customercare@example.com" className="hover:text-white">customercare@example.com</a></li>
              <li><Link to="#" className="hover:text-white">Help & Contact</Link></li>
              <li><Link to="#" className="hover:text-white">FAQs</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4 uppercase tracking-wide">About Timeless Watches</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="#" className="hover:text-white">Brand Protection</Link></li>
              <li><Link to="#" className="hover:text-white">Corporate</Link></li>
              <li><Link to="#" className="hover:text-white">Careers</Link></li>
              <li><Link to="#" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Right column: app badges & socials */}
          <div className="md:col-span-2">
            <h4 className="font-semibold mb-4 uppercase tracking-wide">Download Timeless Watch App</h4>

            <div className="flex items-center gap-3 mb-6">
              <a href="#" aria-label="App Store">
                <img src={appstore} alt="App Store" className="h-10 object-contain" />
              </a>
              <a href="#" aria-label="Google Play">
                <img src={play} alt="Google Play" className="h-10 object-contain" />
              </a>
            </div>

            <h5 className="font-medium mb-3">Follow Us With</h5>
            <div className="flex items-center gap-3 mb-6">
              <a href="#" aria-label="facebook" className="w-9 h-9 rounded-full bg-gray-800 grid place-items-center hover:bg-gray-700">
                <img src={fb} alt="facebook" className="w-4 h-4" />
              </a>
              <a href="#" aria-label="instagram" className="w-9 h-9 rounded-full bg-gray-800 grid place-items-center hover:bg-gray-700">
                <img src={instagram} alt="instagram" className="w-4 h-4" />
              </a>
              <a href="#" aria-label="x" className="w-9 h-9 rounded-full bg-gray-800 grid place-items-center hover:bg-gray-700">
                <img src={x} alt="x" className="w-4 h-4" />
              </a>
              <a href="#" aria-label="youtube" className="w-9 h-9 rounded-full bg-gray-800 grid place-items-center hover:bg-gray-700">
                <img src={yt} alt="youtube" className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-black/20 border border-transparent rounded p-4 text-sm text-gray-300">
              <p className="mb-3"><strong>Want Help? <Link to="#" className="underline">Click Here</Link> To Chat With Us On</strong></p>
              <p className="mb-1"><strong>Operating Hours:</strong></p>
              <p className="text-sm">10:00AM To 10:00PM • Monday To Sunday</p>
            </div>
          </div>
        </div>



        {/* copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Timeless Watches. All Rights Reserved.
            </div>
            <div className="text-sm text-gray-400">
              <Link to="#" className="hover:text-white mr-4">Terms & Conditions</Link>
              <Link to="#" className="hover:text-white mr-4">Privacy Policy</Link>
              <Link to="#" className="hover:text-white">Warranty Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
