'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Footer component
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">DREAM GARAGE</h3>
                <p className="text-dark-400 text-sm">Premium 3D Automotive Experience</p>
              </div>
            </div>

            <p className="text-dark-400 text-sm">
              Explore the world's most iconic cars in stunning 3D detail. Configure, compare, and experience automotive excellence.
            </p>

            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 bg-dark-800/80 rounded-xl flex items-center justify-center border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-dark-800/80 rounded-xl flex items-center justify-center border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-dark-800/80 rounded-xl flex items-center justify-center border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 1.703-1.525 3.047-3.661 3.047-2.605 0-4.565-2.668-4.565-5.877 0-2.721-1.807-4.876-4.543-4.876-3.273 0-5.852-2.56-5.852-5.824 0-1.452.737-2.736 1.852-3.662z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-dark-800/80 rounded-xl flex items-center justify-center border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-dark-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/garage" className="text-dark-400 hover:text-white transition-colors">
                  Garage
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-dark-400 hover:text-white transition-colors">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white transition-colors">
                  Configure
                </Link>
              </li>
            </ul>
          </div>

          {/* Cars */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Cars</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-dark-400 hover:text-white transition-colors">
                  Toyota Supra MK4
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white transition-colors">
                  BMW M4 Competition
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white transition-colors">
                  Dodge Challenger SRT Hellcat
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white transition-colors">
                  Dodge Challenger SRT Demon 170
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white transition-colors">
                  Ford Mustang GT
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-dark-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white transition-colors">
                  Asset Licenses
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-dark-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="divider" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 py-6"
        >
          <p className="text-dark-400 text-sm">
            © {new Date().getFullYear()} Dream Garage. All rights reserved.
          </p>
          <p className="text-dark-500 text-sm">
            Built with Next.js, React Three Fiber, and Three.js
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
