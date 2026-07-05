'use client';

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { motion } from "motion/react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle, Star, ChevronDown, ChevronUp,
  GraduationCap, FileText, Clock, Shield, Zap, Users, BookOpen, Award, Database
} from "lucide-react";
import Image from 'next/image';
import {Navbar} from '@/src/components/layout/navbar';
import HowItWorks from '@/src/components/layout/howitworks';
import { FloatingActions } from '@/src/components/layout/floatingaction';

interface LandingPageProps {
  onOrder: () => void;
}

export const stats = [
  { value: "1.500+", label: "Tugas diselesaikan" },
  { value: "98%", label: "Tingkat Kepuasan" },
  { value: "20+", label: "Tutor Ahli" },
  { value: "4.9", label: "Rating Kami" },
];

export const trustItems = [
  { icon: Shield, label: "100% Aman" },
  { icon: CheckCircle, label: "Bebas Plagiarisme" },
  { icon: Award, label: "Tutor Ahli" },
  { icon: Zap, label: "Penyelesaian Cepat" },
  { icon: Users, label: "Dukungan 24/7" },
  { icon: BookOpen, label: "Banyak Mata Pelajaran" },
]

const services = [
  { icon: BookOpen, title: "Tugas Sekolah", desc: "Matematika, Fisika, Kimia, Biologi, dan mapel lain", color: "#F3722C" },
  { icon: GraduationCap, title: "LKS Pembelajaran", desc: "Pembuatan Lembar Kerja Siswa", color: "#43AA8B" },
  { icon: FileText, title: "Esai & Thesis", desc: "Lembar penelitian dan tesis", color: "#577590" },
  { icon: Zap, title: "Jurnal", desc: "Pembuatan jurnal ilmiah", color: "#F8961E" },
  { icon: Users, title: "Skripsi", desc: "Pembuatan skripsi", color: "#F9C74F" },
  { icon: Database, title: "Olah Data", desc: "Menganalisis dan visualisasi data", color: "#90BE6D" },
];

const faqs = [
  {
    q: "Jika saya cancel, apa yang terjadi?",
    a: "Jika pesanan dibatalkan sebelum pengerjaan dimulai, Kami akan memberikan pengembalian dana secara penuh.",
  },
  {
    q: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan tugas saya?",
    a: "Kami menawarkan waktu penyelesaian dari 6 jam hingga 14 hari tergantung pada kompleksitasnya. Untuk sebagian besar tugas, kami menyelesaikannya dalam 24-72 jam.",
  },
  {
    q: "Apa yang terjadi jika saya tidak puas dengan hasilnya?",
    a: "Kami menawarkan revisi gratis yang hingga Anda sepenuhnya puas. Jika kami tidak dapat memenuhi kebutuhan Anda, kami memberikan pengembalian dana penuh tanpa pertanyaan."
  },
  {
    q: "Level pendidikan apa saja yang Kami dukung?",
    a: "Kami mendukung semua tingkat pendidikan: Sekolah Menengah, Diploma (D3/D4), Sarjana (S1), Magister (S2), Doktor (S3), pembelajaran jarak jauh (UT, dll.), mahasiswa RPL, dan profesional yang bekerja.",
  },
  {
    q: "Bagaimana cara memesan?",
    a: "Gunakan 8-langkah sederhana kami untuk menggambarkan tugas Anda, lalu konfirmasi melalui WhatsApp. Proses ini memakan waktu kurang dari 5 menit. Tim kami merespons dalam waktu 15 menit selama jam kerja.",
  },
];



function LandingPage({ onOrder }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const statAccentColors = ["#F3722C", "#43AA8B", "#F8961E", "#90BE6D"];
  const trustAccentColors = ["#F3722C", "#43AA8B", "#F9C74F", "#F8961E", "#90BE6D", "#577590"];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <>
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Inter', sans-serif", background: "var(--background)" }}
    >
    
    {/* Navbar */}
    <Navbar />

    {/* Floating Actions */}
    <FloatingActions />

    {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* Star Rating */}
            <div className="flex flex-col items-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium text-center"
                style={{ background: "rgba(249, 199, 79, 0.18)", border: "1px solid rgba(243, 114, 44, 0.28)" }}
                >
                <span style={{ color: "#F3722C" }}>✨</span>
                <span style={{ color: "var(--foreground)" }}>Dipercaya 1.000+ pelajar se-Indonesia</span>
              </div>
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
              Tugas numpuk?<br />
              <span
                style={{
                  background: "linear-gradient(120deg, #F3722C 10%, #F9C74F 45%, #43AA8B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Kami siap bantu!
              </span>
            </h1>

            {/* Deskripsi (rata kiri) */}

            <div className="flex flex-col items-center text-center">
            <p
              className="max-w-2xl mb-8 "
              style={{ fontSize: "1.125rem", color: "var(--muted-foreground)", lineHeight: 1.7 }}
            >
              Kami membantu menyelesaikan tugas akademik mulai dari esai, laporan, hingga presentasi dengan cepat dan berkualitas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOrder}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #F3722C 0%, #F8961E 100%)",
                  color: "#FFFFFF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "1rem",
                  boxShadow: "0 12px 28px rgba(243,114,44,0.28)",
                }}
              >
                Pesan Sekarang
                <ArrowRight size={18} />
              </motion.button>
              <button
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-200 hover:bg-muted"
                style={{
                  border: "1.5px solid rgba(67,170,139,0.35)",
                  color: "var(--foreground)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "1rem",
                  background: "rgba(67,170,139,0.08)",
                }}
              >
                Lihat Layanan
              </button>
            </div>
          </div>
          </motion.div>
{/* 
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-10 flex justify-center"
          >
            <div className="relative w-full max-w-4xl">
              <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-[#F9C74F]/30 via-white to-[#43AA8B]/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-4xl border border-border bg-white/80 p-3 shadow-[0_25px_60px_-25px_rgba(87,117,144,0.35)] backdrop-blur">
                <Image
                  src="/hero-illustration.svg"
                  alt="Ilustrasi bantuan tugas akademik yang fun dan menarik"
                  width={1200}
                  height={760}
                  priority
                  className="h-auto w-full rounded-3xl"
                />
              </div>
            </div>
          </motion.div> */}

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
                    color: statAccentColors[i],
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
                <item.icon size={15} color={trustAccentColors[i]} />
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--foreground)", fontFamily: "'Inter', sans-serif" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-12 bg-background" id="services">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[#F5B800] uppercase">
            Layanan Kami
          </p>
          <h2
            className="text-center mb-1"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "2rem",
              color: "var(--foreground)",
            }}
          >
            Jasa yang Kami Tawarkan
          </h2>
          {/* Konten layanan bisa ditambahkan di sini */}
          <p className="text-center text-muted-foreground mb-10" style={{ fontSize: "1rem" }}>
            Berikut beberapa jasa yang kami tawarkan untuk membantu tugas akademik Anda
          </p>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.01,
                  boxShadow: `0 20px 40px -10px ${svc.color}30` 
                }}
                className="relative overflow-hidden p-8 rounded-4xl border border-border cursor-pointer group bg-card"
                style={{ background: "var(--card)" }}
              >
                {/* Efek Glow / Cahaya samar di latar belakang */}
                <div 
                  className="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                  style={{ background: svc.color }}
                />

                {/* Menggunakan flex-row dan items-start agar ikon & teks bersandingan */}
                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5">
                  
                  {/* Kiri: Container Ikon */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" 
                    style={{ 
                      background: `${svc.color}15`,
                      border: `1px solid ${svc.color}25`
                    }}
                  >
                    <svc.icon size={29} color={svc.color} />
                  </div>

                  {/* Kanan: Konten Teks (Judul & Deskripsi) */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 
                        className="transition-colors duration-300 group-hover:text-primary" 
                        style={{ 
                          fontFamily: "'Plus Jakarta Sans', sans-serif", 
                          fontWeight: 700, 
                          fontSize: "1.25rem", 
                          color: "var(--foreground)" 
                        }}
                      >
                        {svc.title}
                      </h3>
                      
                      {/* Ikon Panah Kecil Interaktif */}
                      <div className="text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                    
                    <p 
                      className="leading-relaxed" 
                      style={{ fontSize: "0.95rem", color: "var(--muted-foreground)" }}
                    >
                      {svc.desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <HowItWorks />

      {/* FAQ */}
      <section className="py-20 bg-background" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          
          {/* Header FAQ */}
          <p className="text-center text-[#F8961E] uppercase">
            FAQ
          </p>
          <h2
            className="text-center mb-1"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "2rem",
              color: "var(--foreground)",
            }}
          >
            Pertanyaan yang Sering Diajukan
          </h2>
          {/* Konten layanan bisa ditambahkan di sini */}
          <p className="text-center text-muted-foreground mb-10" style={{ fontSize: "1rem" }}>
            Temukan jawaban atas pertanyaan umum seputar layanan kami
          </p>

          {/* Accordion Container */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div 
                  key={index} 
                  className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                    isOpen 
                      ? 'border-primary bg-white' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Tombol Header Pertanyaan */}
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                  >
                    <h3 className={`font-semibold text-lg pr-4 transition-colors duration-300 ${
                      isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {faq.q}
                    </h3>
                    
                    {/* Ikon Chevron yang berputar saat dibuka */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isOpen ? 'bg-primary text-primary-foreground' : 'bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary'
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </motion.div>
                  </button>

                  {/* Konten Jawaban dengan Animasi Buka/Tutup */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed text-[15px]">
                          <div className="h-px w-full bg-slate-100 mb-4" /> {/* Garis pemisah tipis */}
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center" style={{ fontSize: "0.875rem" }}>
            &copy; {new Date().getFullYear()} TugasKelar.io. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
    </>
  )
}

export default function Page() {
  const router = useRouter();
  return <LandingPage onOrder={() => router.push('/order')} />;
};