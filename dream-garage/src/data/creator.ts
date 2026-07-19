// Creator Information
import { Car } from '@/types';

export interface CreatorInfo {
  name: string;
  title: string;
  bio: string;
  website: string;
  portfolio: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  email: string;
  location: string;
  skills: string[];
  passion: string;
  quote: string;
  favoriteCar: string;
  dreamCar: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  avatar: string;
  signature: string;
}

export const creator: CreatorInfo = {
  name: 'HARSHVARDHAN SINGH CHAUHAN',
  title: 'Automotive Enthusiast & Full-Stack Developer',
  bio: `I'm a passionate automotive lover and full-stack developer with a deep appreciation for engineering excellence. This Dream Garage is my tribute to the world's most iconic cars, combining my love for automobiles with my technical skills to create an immersive 3D experience.`,
  website: 'https://harshu-builds.vercel.app/',
  portfolio: 'https://harshu-builds.vercel.app/',
  github: 'https://github.com/HarshuBuilds',
  linkedin: 'https://linkedin.com/in/harshvardhan-singh-chauhan',
  twitter: 'https://twitter.com/HarshuBuilds',
  instagram: 'https://instagram.com/HarshuBuilds',
  email: 'harshvardhan.singh.chauhan@gmail.com',
  location: 'India 🇮🇳',
  skills: [
    'Full-Stack Development',
    '3D Graphics & WebGL',
    'React & Next.js',
    'TypeScript',
    'UI/UX Design',
    'Automotive Enthusiast',
    'Performance Optimization',
    'Interactive Experiences',
  ],
  passion: 'Creating immersive digital experiences that combine technology and passion',
  quote: '"Engineering is not just about building things, it\'s about creating experiences that move people."',
  favoriteCar: 'Toyota Supra MK4',
  dreamCar: 'Bugatti Chiron Super Sport 300+',
  yearsOfExperience: 5,
  projectsCompleted: 50,
  avatar: '/images/creator-avatar.jpg',
  signature: '/images/creator-signature.png',
};

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'Website',
    url: creator.website,
    icon: 'globe',
    color: 'text-primary-400',
  },
  {
    name: 'GitHub',
    url: creator.github,
    icon: 'github',
    color: 'text-dark-400',
  },
  {
    name: 'LinkedIn',
    url: creator.linkedin,
    icon: 'linkedin',
    color: 'text-blue-400',
  },
  {
    name: 'Twitter',
    url: creator.twitter,
    icon: 'twitter',
    color: 'text-sky-400',
  },
  {
    name: 'Instagram',
    url: creator.instagram,
    icon: 'instagram',
    color: 'text-pink-400',
  },
  {
    name: 'Email',
    url: `mailto:${creator.email}`,
    icon: 'mail',
    color: 'text-red-400',
  },
];

export interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

export const creatorStats: StatCard[] = [
  {
    label: 'Years of Experience',
    value: creator.yearsOfExperience,
    icon: 'clock',
    color: 'text-primary-400',
  },
  {
    label: 'Projects Completed',
    value: creator.projectsCompleted,
    icon: 'briefcase',
    color: 'text-green-400',
  },
  {
    label: 'Dream Cars',
    value: 5,
    icon: 'car',
    color: 'text-blue-400',
  },
  {
    label: 'Total Horsepower',
    value: '3,032 hp',
    icon: 'zap',
    color: 'text-yellow-400',
  },
];

export interface FunFact {
  icon: string;
  title: string;
  description: string;
}

export const funFacts: FunFact[] = [
  {
    icon: 'heart',
    title: 'Passion for Cars',
    description: 'I\'ve been obsessed with cars since I was a kid, collecting toy cars and watching Top Gear religiously.',
  },
  {
    icon: 'code',
    title: 'Coding Since 2019',
    description: 'I started my coding journey in 2019 and have been building amazing digital experiences ever since.',
  },
  {
    icon: 'star',
    title: 'Dream Project',
    description: 'This Dream Garage is my passion project, combining my two greatest loves: cars and technology.',
  },
  {
    icon: 'rocket',
    title: 'Always Learning',
    description: 'I\'m constantly learning new technologies and techniques to create even better experiences.',
  },
];

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  message: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Alex Johnson',
    role: 'Automotive Blogger',
    avatar: '/images/testimonial-1.jpg',
    message: 'Harshvardhan\'s Dream Garage is the most impressive car showcase I\'ve ever seen online. The attention to detail and the 3D experience is mind-blowing!',
    rating: 5,
  },
  {
    name: 'Sarah Miller',
    role: 'UX Designer',
    avatar: '/images/testimonial-2.jpg',
    message: 'The user experience is incredible. Every interaction feels smooth and premium. This is how all car websites should be designed!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Full-Stack Developer',
    avatar: '/images/testimonial-3.jpg',
    message: 'The technical implementation is top-notch. Clean code, great architecture, and excellent performance optimizations.',
    rating: 5,
  },
];

export default creator;
