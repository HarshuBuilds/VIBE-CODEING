'use client';

import { motion } from 'framer-motion';
import { cars } from '@/data/cars';
import { creator } from '@/data/creator';

// About Section component
export const AboutSection = () => {
  return (
    <section className="section bg-dark-900/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="badge badge-primary mb-4">About</span>
          <h2 className="section-title">The Ultimate Automotive Experience</h2>
          <p className="section-subtitle">
            {creator.passion}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-dark-300 text-lg">
              <span className="text-white font-medium">Dream Garage</span> is my passion project, born from a lifelong love of cars and a deep appreciation for automotive engineering. As {creator.name.split(' ')[0]}, I've combined my technical skills with my enthusiasm for automobiles to create this immersive 3D experience.
            </p>

            <p className="text-dark-300 text-lg">
              This website is more than just a showcase - it's a tribute to the machines that have shaped automotive history. From the legendary Toyota Supra MK4 to the monstrous Dodge Challenger SRT Demon 170, each car represents the pinnacle of engineering and design.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Interactive 3D Models</h3>
                  <p className="text-dark-400">
                    Rotate, zoom, and explore every angle of your dream cars with smooth, responsive controls. Experience the details like never before.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Customize Your Ride</h3>
                  <p className="text-dark-400">
                    Change paint colors, wheel styles, and more to create your perfect configuration. Make each car uniquely yours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Compare & Analyze</h3>
                  <p className="text-dark-400">
                    Compare specs, performance metrics, and see which car comes out on top. Make informed decisions with detailed analysis.
                  </p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary px-6 py-3">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              Explore the Collection
            </button>
          </motion.div>

          {/* Featured Car Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-video bg-gradient-to-br from-dark-700 to-dark-900 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-32 bg-dark-600/80 rounded-xl" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              
              {/* Creator watermark */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-white text-sm font-medium">
                  Created by {creator.name.split(' ')[0]}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
