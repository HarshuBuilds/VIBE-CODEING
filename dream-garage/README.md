# Dream Garage - Premium 3D Automotive Showcase

![Dream Garage Logo](https://dream-garage.vercel.app/og-image.png)

**Dream Garage** is a production-quality interactive 3D website that showcases a collection of dream cars in a virtual garage. Built with Next.js 15, React 19, TypeScript, and React Three Fiber, this immersive experience combines the best of Porsche configurator, BMW interactive experience, Forza Horizon garage, and Gran Turismo showroom with Apple-level premium animations.

## Features

### 🚗 Car Collection
- **Toyota Supra MK4 (A80)** - The iconic "2JZ" generation
- **BMW M4 Competition** - German precision engineering
- **Dodge Challenger SRT Hellcat** - American muscle at its finest
- **Dodge Challenger SRT Demon 170** - The most powerful muscle car ever
- **Ford Mustang GT (S650)** - The new generation pony car

### 🎨 3D Experience
- **Interactive 3D Models** - Rotate, zoom, and pan with smooth controls
- **Multiple View Modes** - Grid, Carousel, and 3D Garage
- **Realistic Environment** - Volumetric lighting, fog, reflective floor, and shadows
- **Cinematic Camera** - Smooth transitions and automatic camera paths
- **Particle Effects** - Floating particles for atmospheric depth

### 🎯 Car Showroom
- **Detailed 3D Preview** - High-quality models with realistic materials
- **Car Animations** - Doors, headlights, brake lights, steering wheel, wheel rotation
- **Engine Start** - Unique engine sounds for each car
- **Configurable Options** - Paint color, wheel color, caliper color, interior, window tint, ride height, wheel style, spoiler, license plate

### 📊 Comparison & Stats
- **Side-by-Side Comparison** - Compare any two cars
- **Performance Charts** - Animated charts for horsepower, torque, acceleration, price
- **Detailed Specs** - Complete specifications for each car
- **Performance Score** - Overall rating based on multiple factors

### 🎵 Audio Experience
- **Engine Sounds** - Unique sounds for each car (start, idle, rev, acceleration, limiter, stop)
- **Background Music** - Optional garage ambiance
- **Sound Controls** - Toggle sound and music independently

### 💡 Lighting & Environment
- **Multiple HDRI Environments** - Day, Sunset, Night, Studio, Garage, Rainy
- **Realistic Materials** - Paint, metal flakes, clear coat, chrome, carbon fiber, leather, glass, rubber
- **Dynamic Lighting** - Adjustable intensity and color

### 🎮 User Interface
- **Premium Design** - Black, dark gray, white with red accents
- **Glassmorphism** - Modern frosted glass effect
- **Smooth Animations** - Apple-level polish and transitions
- **Responsive Layout** - Works on all devices
- **Touch Controls** - Pinch to zoom, swipe to rotate

### ⚡ Performance
- **Lazy Loading** - Optimized asset loading
- **Code Splitting** - Efficient bundle size
- **Compressed Textures** - Optimized for web
- **Draco Compression** - For 3D models
- **Mesh Optimization** - Reduced polygon count
- **Instancing** - For repeated elements
- **LOD Support** - Level of detail optimization

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Three Fiber** - React renderer for Three.js
- **Drei** - Useful helpers for React Three Fiber
- **Three.js** - 3D graphics library
- **GSAP** - Advanced animations (optional)
- **Recharts** - Charting library
- **Zustand** - State management
- **Howler.js** - Audio library

### Backend
- **Next.js API Routes** - For server-side functionality

### Deployment
- **Vercel** - Optimized for Next.js applications

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HarshuBuilds/VIBE-CODEING.git
cd VIBE-CODEING/dream-garage
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dream-garage/
├── public/                    # Static assets
│   ├── assets/               # 3D models, textures, sounds
│   │   ├── models/           # GLB/GLTF car models
│   │   ├── textures/         # HDRI environments, car textures
│   │   └── sounds/           # Engine sounds, background music
│   ├── favicon.ico          # Favicon
│   └── og-image.png         # Open Graph image
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (main)/           # Main layout group
│   │   │   ├── layout.tsx    # Root layout
│   │   │   └── page.tsx      # Home page
│   │   ├── car/              # Car detail pages
│   │   │   └── [id]/         # Dynamic car detail
│   │   ├── compare/          # Comparison page
│   │   ├── configure/        # Configurator page
│   │   ├── garage/           # Garage pages
│   │   │   └── page.tsx     # Garage main page
│   │   └── globals.css      # Global styles
│   ├── components/           # React components
│   │   ├── CarCard.tsx      # Car card component
│   │   ├── CarGrid.tsx      # Car grid view
│   │   ├── CarCarousel.tsx  # Car carousel view
│   │   ├── Garage3D.tsx     # 3D garage view
│   │   ├── CarShowroom.tsx  # Car showroom with 3D
│   │   ├── Configurator.tsx # Full configurator
│   │   ├── ComparisonView.tsx # 3D comparison
│   │   ├── ComparisonCharts.tsx # Performance charts
│   │   └── ...              # Other components
│   ├── data/                 # Data files
│   │   └── cars.ts          # Car data and utilities
│   ├── hooks/               # Custom React hooks
│   │   └── useThree.ts      # Three.js related hooks
│   ├── lib/                 # Library utilities
│   ├── store/               # State management
│   │   ├── useStore.ts      # Zustand store
│   │   └── StoreProvider.tsx # Store providers
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   └── utils/               # Utility functions
│       └── index.ts         # Helper functions
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 3D Assets

### Licensing
All 3D models, textures, and sounds used in this project are properly licensed:

- **Sketchfab** - Downloadable models with compatible licenses
- **Poly Pizza (CC0)** - Free for commercial use
- **Poly Haven** - Free HDRI environments
- **Kenney Assets** - Free game assets
- **Khronos glTF Sample Assets** - Open standard assets

### Asset Optimization
- **Geometry Optimization** - Reduced polygon count for web
- **Texture Compression** - Optimized texture sizes
- **Draco Compression** - For GLB/GLTF files
- **LOD (Level of Detail)** - Multiple detail levels

### Recommended Sources
1. [Sketchfab](https://sketchfab.com/) - Search for "car" with CC0 or CC-BY licenses
2. [Poly Haven](https://polyhaven.com/) - Free HDRI environments
3. [Kenney.nl](https://kenney.nl/) - Free game assets
4. [glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models) - Official samples

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| R | Reset camera view |
| A | Toggle auto-rotate |
| S | Toggle stats panel |
| C | Toggle configurator |
| M | Toggle sound |
| N | Toggle music |
| Esc | Close current view |
| Ctrl/Cmd + / | Show/hide keyboard shortcuts |

### 3D Controls
- **Left Click + Drag** - Rotate camera
- **Right Click + Drag** - Pan camera
- **Scroll** - Zoom in/out
- **Pinch (Touch)** - Zoom

## Performance Optimization

### Targets
- **Lighthouse Performance Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Techniques Used
1. **Code Splitting** - Dynamic imports for heavy components
2. **Lazy Loading** - Load 3D models on demand
3. **Image Optimization** - Next.js Image component
4. **Texture Compression** - WebP and AVIF formats
5. **Mesh Optimization** - Reduced polygon count
6. **Instancing** - For repeated elements
7. **LOD** - Level of detail based on distance
8. **Draco Compression** - For 3D models
9. **Memoization** - React.memo for components
10. **Debouncing** - For search and input handlers

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Opera (latest 2 versions)

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import the project in [Vercel](https://vercel.com/)
3. Vercel will automatically detect Next.js and configure the deployment
4. Deploy!

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Next.js configuration
NEXT_PUBLIC_APP_NAME=Dream Garage
NEXT_PUBLIC_VERSION=1.0.0

# API configuration (if needed)
NEXT_PUBLIC_API_BASE_URL=https://api.dream-garage.com

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
```

### Custom Domain

To set up a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow the existing code style
- Use TypeScript for type safety
- Keep components small and reusable
- Add comments for complex logic
- Use meaningful variable and function names

### Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Keep messages concise but descriptive
- Reference issues when applicable

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Asset License Documentation

All 3D assets, textures, and sounds used in this project are properly licensed. See [ASSET_LICENSES.md](ASSET_LICENSES.md) for detailed information about each asset's source and license.

## Support

For support, questions, or feedback:
- Open an issue on GitHub
- Contact the maintainers

## Acknowledgments

- [Three.js](https://threejs.org/) - 3D graphics library
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React renderer for Three.js
- [Drei](https://github.com/pmndrs/drei) - Useful helpers for React Three Fiber
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

**Built with ❤️ and passion for automotive excellence**

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHarshuBuilds%2FVIBE-CODEING%2Ftree%2Fmain%2Fdream-garage)
