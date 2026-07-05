'use client';

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight, CheckCircle, Star, ChevronDown, ChevronUp,
  GraduationCap, FileText, Clock, Shield, Zap, Users, BookOpen, Award
} from "lucide-react";
import Image from 'next/image';
import {Navbar} from '@/src/components/layout/navbar'

interface LandingPageProps {
  onOrder: () => void;
}

const services = [
  { icon: FileText, title: "Essay & Thesis", desc: "Research papers, dissertations, thesis writing", color: "#03BFB5" },
  { icon: BookOpen, title: "Homework Help", desc: "Math, science, humanities assignments", color: "#018076" },
  { icon: GraduationCap, title: "RPL Assistance", desc: "Recognition of Prior Learning documentation", color: "#03BFB5" },
  { icon: Zap, title: "Online Exams", desc: "Exam preparation and test-taking support", color: "#018076" },
  { icon: Users, title: "Group Projects", desc: "Collaborative assignments and presentations", color: "#03BFB5" },
  { icon: Award, title: "Certification Prep", desc: "Professional certification study materials", color: "#018076" },
];

const steps = [
  { num: "01", title: "Choose Your Service", desc: "Select your education level, service type, and subject from our wizard." },
  { num: "02", title: "Set Deadline & Details", desc: "Tell us your deadline, difficulty level, and provide your task summary." },
  { num: "03", title: "Review & Confirm", desc: "Review your order details, pricing, and confirm via WhatsApp." },
  { num: "04", title: "Get It Done", desc: "Our expert tutors complete your task with quality assurance." },
];

const testimonials = [
  {
    name: "Rania Kusuma",
    role: "University Student, UI",
    rating: 5,
    text: "My thesis was completed in just 3 days. The quality was incredible — my supervisor said it was one of the best submissions this semester.",
    avatar: "RK",
    avatarColor: "#03BFB5",
  },
  {
    name: "Budi Santoso",
    role: "Distance Learning Student",
    rating: 5,
    text: "Working full-time while studying was overwhelming. AcademicAI helped me stay on track with every assignment. Highly recommended!",
    avatar: "BS",
    avatarColor: "#018076",
  },
  {
    name: "Dewi Permata",
    role: "RPL Student",
    rating: 5,
    text: "The RPL documentation help was exactly what I needed. Professional, fast, and accurate. Got my recognition approved on the first try.",
    avatar: "DP",
    avatarColor: "#03BFB5",
  },
  {
    name: "Andi Wiratama",
    role: "Working Professional",
    rating: 5,
    text: "Balancing MBA coursework with my job was impossible before I found this platform. Now I can focus on work while they handle my assignments.",
    avatar: "AW",
    avatarColor: "#018076",
  },
];

const faqs = [
  {
    q: "Is my personal information kept confidential?",
    a: "Absolutely. We use bank-level encryption to protect all your personal data. Your identity, order details, and communication are 100% private and never shared with third parties.",
  },
  {
    q: "How fast can you complete my task?",
    a: "We offer turnaround times ranging from 6 hours (express) to 14 days depending on complexity. For most assignments, we deliver within 24–72 hours.",
  },
  {
    q: "What if I'm not satisfied with the result?",
    a: "We offer unlimited free revisions until you're fully satisfied. If we cannot meet your requirements, we provide a full refund — no questions asked.",
  },
  {
    q: "Which education levels do you support?",
    a: "We support all levels: High School, Diploma (D3/D4), Bachelor's (S1), Master's (S2), Doctoral (S3), distance learning (UT, etc.), RPL students, and working professionals.",
  },
  {
    q: "How do I place an order?",
    a: "Use our simple 8-step wizard to describe your task, then confirm via WhatsApp. It takes less than 5 minutes. Our team responds within 15 minutes during business hours.",
  },
];

export const stats = [
  { value: "15,000+", label: "Tasks Completed" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "500+", label: "Expert Tutors" },
  { value: "4.9/5", label: "Average Rating" },
];

export const trustItems = [
  { icon: Shield, label: "100% Confidential" },
  { icon: CheckCircle, label: "Plagiarism Free" },
  { icon: Award, label: "Expert Tutors" },
  { icon: Clock, label: "On-Time Delivery" },
  { icon: Zap, label: "24/7 Support" },
  { icon: Star, label: "Money-Back Guarantee" },
];


function LandingPage({ onOrder }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Inter', sans-serif", background: "var(--background)" }}
    >

      {/* Navbar */}
      <Navbar/>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
              style={{ background: "rgba(245,184,0,0.1)", border: "1px solid rgba(245,184,0,0.35)" }}
            >
              <span style={{ color: "#F5B800" }}>★</span>
              <span style={{ color: "var(--foreground)" }}>Dipercaya 15.000+ pelajar se-Indonesia</span>
            </div>

            <h1
              className="mb-6"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                color: "var(--foreground)",
                lineHeight: 1.1,
              }}
            >
              Academic Success,{" "}
              <span
                style={{
                  background: "linear-gradient(120deg, #03BFB5 30%, #F5B800 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Delivered Fast.
              </span>
            </h1>

            <p
              className="max-w-2xl mx-auto mb-8"
              style={{ fontSize: "1.125rem", color: "var(--muted-foreground)", lineHeight: 1.7 }}
            >
              From essays to theses, homework to RPL documentation — our expert tutors
              help students and professionals achieve their academic goals with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOrder}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold"
                style={{
                  background: "#03BFB5",
                  color: "#004146",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "1rem",
                  boxShadow: "0 8px 24px rgba(3,191,181,0.35)",
                }}
              >
                Start Your Order
                <ArrowRight size={18} />
              </motion.button>
              <button
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 hover:bg-muted"
                style={{
                  border: "1.5px solid var(--border)",
                  color: "var(--foreground)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "1rem",
                }}
              >
                Lihat Layanan
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-border"
                style={{ background: "var(--card)", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
              >
                <p
                  className="mb-1"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.75rem",
                    color: i % 2 === 0 ? "#03BFB5" : "#F5B800",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon size={15} color={i % 2 === 0 ? "#03BFB5" : "#F5B800"} />
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--foreground)", fontFamily: "'Inter', sans-serif" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ height: "clamp(220px, 40vw, 400px)", boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}
          >
            <Image
              width={500}
              height={500}
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=500&fit=crop&auto=format"
              alt="Students studying together in a modern library"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(0,65,70,0.5) 0%, rgba(1,128,118,0.3) 100%)" }}
            />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
              {[
                { icon: CheckCircle, text: "Expert tutors available 24/7" },
                { icon: Shield, text: "100% confidential & secure" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <badge.icon size={15} color="#03BFB5" />
                  <span style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 500 }}>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#03BFB5" }}>Services</p>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "var(--foreground)",
                lineHeight: 1.2,
              }}
            >
              Everything You Need to Succeed
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-3xl border border-border cursor-pointer"
                style={{ background: "var(--card)", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${svc.color}18` }}
                >
                  <svc.icon size={22} color={svc.color} />
                </div>
                <h3
                  className="mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--foreground)" }}
                >
                  {svc.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-8 md:p-12" style={{ background: "#004146" }}>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#03BFB5" }}>Process</p>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  color: "#EFF5F9",
                }}
              >
                How It Works
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl"
                  style={{ background: "rgba(239,245,249,0.05)", border: "1px solid rgba(239,245,249,0.08)" }}
                >
                  <span
                    className="block mb-4"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: "2rem",
                      color: "#F5B800",
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>
                  <h3 className="mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#EFF5F9" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "rgba(239,245,249,0.6)", lineHeight: 1.6 }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOrder}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold"
                style={{ background: "#03BFB5", color: "#004146", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem" }}
              >
                Get Started Now <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#03BFB5" }}>Testimonials</p>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "var(--foreground)",
              }}
            >
              Students Love Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl border border-border"
                style={{ background: "var(--card)", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#F5B800" color="#F5B800" />
                  ))}
                </div>
                <p className="mb-5" style={{ fontSize: "0.9rem", color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                  `{t.text}`
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: `${t.avatarColor}20`, color: t.avatarColor }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{t.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#03BFB5" }}>FAQ</p>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "var(--foreground)",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border overflow-hidden"
                style={{ background: "var(--card)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                      color: "var(--foreground)",
                    }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className="ml-4 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: openFaq === i ? "#F5B800" : "var(--muted)" }}
                  >
                    {openFaq === i
                      ? <ChevronUp size={16} color="#004146" />
                      : <ChevronDown size={16} color="var(--muted-foreground)" />}
                  </div>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 pb-4"
                  >
                    <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.7 }}>{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.97 }}
            viewport={{ once: true }}
            className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #018076 0%, #015f59 100%)",
              boxShadow: "0 24px 64px rgba(1,128,118,0.35)",
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "#03BFB5", transform: "translate(30%, -30%)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: "#03BFB5", transform: "translate(-30%, 30%)" }} />
            <div className="relative z-10">
              <Shield size={32} color="#03BFB5" className="mx-auto mb-4" />
              <h2
                className="mb-4"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                Ready to Excel Academically?
              </h2>
              <p className="mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.7 }}>
                Join 15,000+ students who trust AcademicAI for their academic success. Get your first consultation free.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOrder}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold"
                  style={{
                    background: "#03BFB5",
                    color: "#004146",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "1rem",
                    boxShadow: "0 8px 24px rgba(3,191,181,0.4)",
                  }}
                >
                  Order Now — It`s Fast <ArrowRight size={18} />
                </motion.button>
                <button
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "1rem",
                  }}
                >
                  <Clock size={16} />
                  Chat via WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "#03BFB5" }}>
              <BookOpen size={14} color="#004146" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "var(--foreground)", fontSize: "0.9rem" }}>
              Academic<span style={{ color: "#018076" }}>AI</span>
            </span>
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
            © 2026 AcademicAI. All rights reserved. Trusted by students across Indonesia.
          </p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <button key={item} style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }} className="hover:text-foreground transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  return <LandingPage onOrder={() => router.push('/order')} />;
};