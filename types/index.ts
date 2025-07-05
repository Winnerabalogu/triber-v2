// import { VideoSource } from "@/components/education-card"

export interface Panel {
  id: number
  src: string
  alt: string
  title?: string
  description?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Logo {
  name: string
  logo: string
}


export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  quote: string
  image: string
}

export interface BusinessStep {
  label: string
  subtitle: string
  title: string
  description: string
}

export interface ChallengeItem {
  title: string
  description: string
}

export interface Capability {
  number: string;
  title: string;
  description: string;
  modalContent?: React.ReactNode;
  video?: VideoSource;
}

import React from 'react';

export interface Panel {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Logo {
  name: string;
  logo: string;
}

export interface VideoSource {
  type: "youtube" | "vimeo" | "mp4" | "other";
  url: string;
  title?: string;
  poster?: string;
}

export interface Capability {
  number: string;
  title: string;
  description: string;
  modalContent?: React.ReactNode;
  video?: VideoSource;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

export interface BusinessStep {
  label: string;
  subtitle: string;
  title: string;
  description: string;
}

export interface EducationVideoSource {
  type: "youtube" | "vimeo" | "mp4" | "other"; 
  url: string;
  title?: string;
  poster?: string;
}

export interface EducationCardProps {
  image: string;
  title: string;
  description: string;
  modalContent?: React.ReactNode;
  video?: VideoSource; 
}