'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { creator, socialLinks, creatorStats, funFacts, testimonials } from '@/data/creator';
import { cars } from '@/data/cars';

// Floating badge component
const FloatingBadge = ({ text, icon }: { text: string; icon: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-900/20 border border-primary-800/30 rounded-full text-sm font-medium text-primary-400"
    >
      {icon === 'code' && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      )}
      {icon === 'heart' && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
      {icon === 'star' && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      )}
      {text}
    </motion.div>
  );
};

// Social Icon component
const SocialIcon = ({ name, url, icon, color }: { name: string; url: string; icon: string; color: string }) => {
  const icons = {
    globe: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9"
        />
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
        />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={2} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
        />
      </svg>
    ),
    mail: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`p-3 rounded-xl bg-dark-800/80 border border-dark-600/50 hover:bg-dark-700/80 transition-colors ${color}`}
      title={name}
    >
      {icons[icon as keyof typeof icons]}
    </motion.a>
  );
};

// Stat Card component
const StatCard = ({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) => {
  const icons = {
    clock: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    briefcase: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    car: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"
        />
      </svg>
    ),
    zap: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="stat-card text-center"
    >
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="flex items-center justify-center gap-2 text-dark-400">
        {icons[icon as keyof typeof icons]}
        <span>{label}</span>
      </div>
    </motion.div>
  );
};

// Fun Fact Card component
const FunFactCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
  const icons = {
    heart: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    code: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    star: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    rocket: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="card p-6 hover:border-primary-500/30 transition-all"
    >
      <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center mb-4">
        <span className="text-primary-400">
          {icons[icon as keyof typeof icons]}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-dark-400">{description}</p>
    </motion.div>
  );
};

// Testimonial Card component
const TestimonialCard = ({ name, role, message, rating }: { name: string; role: string; message: string; rating: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="card p-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-sm text-dark-400">{role}</p>
        </div>
      </div>
      <p className="text-dark-300 mb-4 italic">"{message}"</p>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-dark-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
};

// Creator 3D Scene
const CreatorScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      
      <Environment files="/assets/hdri/studio.hdr" />

      {/* Floating car models */}
      <group>
        <mesh position={[-3, 0, 0]}>
          <boxGeometry args={[1.5, 0.8, 3.5]} />
          <meshStandardMaterial
            color="#C0C0C0"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[3, 0, 0]}>
          <boxGeometry args={[1.5, 0.8, 3.5]} />
          <meshStandardMaterial
            color="#0057B8"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, -3]}>
          <boxGeometry args={[1.5, 0.8, 3.5]} />
          <meshStandardMaterial
            color="#990000"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Floating particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([
              -5, 2, -5, 5, 2, -5, -5, 2, 5, 5, 2, 5,
              -5, -2, -5, 5, -2, -5, -5, -2, 5, 5, -2, 5,
            ])}
            count={8}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          color="#ffffff"
          transparent
          opacity={0.6}
        />
      </points>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Creator Section component
export const CreatorSection = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'stats' | 'facts' | 'testimonials'>('about');

  return (
    <section className="section bg-gradient-to-b from-dark-900/80 to-dark-1000/80">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <FloatingBadge text="Meet the Creator" icon="star" />
          <h2 className="section-title mt-4">About {creator.name.split(' ')[0]}</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            {creator.passion}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-96 lg:h-[500px]"
          >
            <Canvas
              camera={{ position: [0, 2, 12], fov: 50, near: 0.1, far: 1000 }}
              gl={{ 
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance',
              }}
              style={{ background: 'transparent' }}
            >
              <CreatorScene />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-1000/80 to-transparent" />
          </motion.div>

          {/* Creator Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Avatar and Name */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                {creator.name}
              </h1>
              <p className="text-xl text-primary-400 font-medium">{creator.title}</p>
              <p className="text-dark-400 mt-4">{creator.bio}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {creatorStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {socialLinks.map((link, index) => (
                <SocialIcon key={index} {...link} />
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 bg-dark-800/80 border-l-4 border-primary-500 rounded-r-xl"
            >
              <p className="text-lg italic text-dark-300">{creator.quote}</p>
              <footer className="mt-4 text-dark-500">- {creator.name.split(' ')[0]}</footer>
            </motion.blockquote>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                  : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
              }`}
            >
              About Me
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'stats'
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                  : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
              }`}
            >
              My Stats
            </button>
            <button
              onClick={() => setActiveTab('facts')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'facts'
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                  : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
              }`}
            >
              Fun Facts
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'testimonials'
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-800/30'
                  : 'bg-dark-800/80 text-dark-400 border border-dark-600/50 hover:bg-dark-700/80'
              }`}
            >
              Testimonials
            </button>
          </div>

          {/* Tab Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-900/80 backdrop-blur-md border border-dark-700/50 rounded-2xl p-8"
          >
            {activeTab === 'about' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">My Journey</h3>
                <div className="space-y-4 text-dark-300">
                  <p>
                    Ever since I was a child, I've been fascinated by cars. The sound of an engine roaring to life, the sleek curves of a well-designed body, the thrill of speed - these are the things that have always captivated me. As I grew older, this passion evolved into a deep appreciation for automotive engineering and design.
                  </p>
                  <p>
                    Parallel to my love for cars, I developed a passion for technology and coding. I discovered that I could combine these two interests to create something truly special - digital experiences that capture the essence of automotive excellence.
                  </p>
                  <p>
                    Dream Garage is the culmination of this journey. It's my way of sharing my passion with the world, creating an immersive experience where fellow automotive enthusiasts can explore, configure, and appreciate the world's most iconic cars in stunning 3D detail.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">My Favorite Car</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg" />
                      <div>
                        <p className="font-medium text-white">{creator.favoriteCar}</p>
                        <p className="text-sm text-dark-400">The legendary JDM icon with the legendary 2JZ-GTE engine.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">My Dream Car</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg" />
                      <div>
                        <p className="font-medium text-white">{creator.dreamCar}</p>
                        <p className="text-sm text-dark-400">The ultimate hypercar with 1,600+ horsepower.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-3">My Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {creator.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-dark-800/80 border border-dark-600/50 rounded-lg text-sm text-dark-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="btn btn-primary mt-6"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                  Visit My Portfolio
                </motion.button>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">My Statistics</h3>
                <p className="text-dark-400">Here are some numbers that define my journey as a developer and automotive enthusiast.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="stat-card">
                    <div className="text-3xl font-bold text-gradient">5+</div>
                    <div className="text-dark-400 mt-1">Years of Experience</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-3xl font-bold text-gradient">50+</div>
                    <div className="text-dark-400 mt-1">Projects Completed</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-3xl font-bold text-gradient">5</div>
                    <div className="text-dark-400 mt-1">Dream Cars Showcased</div>
                  </div>
                  <div className="stat-card">
                    <div className="text-3xl font-bold text-gradient">3,032</div>
                    <div className="text-dark-400 mt-1">Total Horsepower</div>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-lg font-semibold text-white mb-3">Car Collection Stats</h4>
                  <div className="space-y-3">
                    {cars.map((car, index) => (
                      <div
                        key={car.id}
                        className="flex items-center justify-between p-4 bg-dark-800/80 rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-white">{index + 1}</span>
                          <div>
                            <p className="font-medium text-white">{car.name}</p>
                            <p className="text-sm text-dark-400">{car.brand}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white">{car.specs.horsepower} hp</p>
                          <p className="text-sm text-dark-400">{car.specs.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'facts' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Fun Facts About Me</h3>
                <p className="text-dark-400">Get to know me better with these interesting tidbits.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {funFacts.map((fact, index) => (
                    <FunFactCard key={index} {...fact} />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 p-6 bg-gradient-to-r from-primary-900/20 to-red-900/20 rounded-xl border border-primary-800/30"
                >
                  <h4 className="text-lg font-semibold text-white mb-3">Did You Know?</h4>
                  <p className="text-dark-300">
                    This Dream Garage project took over 100 hours to develop, with meticulous attention to every detail - from the 3D rendering to the smooth animations. Every line of code was written with passion and a commitment to creating the best possible experience for automotive enthusiasts like you!
                  </p>
                </motion.div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">What People Say</h3>
                <p className="text-dark-400">Here's what others have to say about my work and this project.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 text-center"
                >
                  <p className="text-dark-400 mb-4">Want to share your feedback?</p>
                  <button className="btn btn-outline">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Leave a Testimonial
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore?
          </h2>
          <p className="text-dark-400 max-w-2xl mx-auto mb-8">
            Dive into the world of dream cars. Configure, compare, and experience automotive excellence like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="btn btn-primary px-8 py-4 text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              Enter the Garage
            </motion.button>
            <motion.a
              href={creator.website}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="btn btn-glass px-8 py-4 text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Visit My Portfolio
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreatorSection;
