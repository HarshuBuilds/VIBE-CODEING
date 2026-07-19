'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { creator, socialLinks } from '@/data/creator';

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
              Created with ❤️ by <span className="text-primary-400 font-medium">{creator.name}</span>
            </p>

            <p className="text-dark-400 text-sm">
              Explore the world's most iconic cars in stunning 3D detail. Configure, compare, and experience automotive excellence.
            </p>

            <div className="flex gap-4">
              {socialLinks.slice(0, 4).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-800/80 rounded-xl flex items-center justify-center border border-dark-600/50 hover:bg-dark-700/80 transition-colors"
                  title={link.name}
                >
                  {link.icon === 'globe' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9"
                      />
                    </svg>
                  )}
                  {link.icon === 'github' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  )}
                  {link.icon === 'linkedin' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4" />
                    </svg>
                  )}
                  {link.icon === 'twitter' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                      />
                    </svg>
                  )}
                </a>
              ))}
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
            <h4 className="text-lg font-semibold text-white mb-4">Dream Cars</h4>
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

          {/* About Creator */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">About the Creator</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={creator.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-white transition-colors"
                >
                  My Portfolio
                </a>
              </li>
              <li>
                <a
                  href={creator.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={creator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${creator.email}`}
                  className="text-dark-400 hover:text-white transition-colors"
                >
                  Contact Me
                </a>
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
            © {new Date().getFullYear()} Dream Garage by {creator.name}. All rights reserved.
          </p>
          <p className="text-dark-500 text-sm">
            Built with Next.js, React Three Fiber, and Three.js
          </p>
        </motion.div>

        {/* Creator Signature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center py-6"
        >
          <p className="text-dark-500 text-sm">
            Made with ❤️ by{' '}
            <a
              href={creator.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
            >
              {creator.name}
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
