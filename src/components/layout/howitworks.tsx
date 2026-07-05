'use client';

import React from "react";
import { motion } from "framer-motion";

const caraKerja = [
  { title: "Masukkan Identitas", desc: "Isi formulir dengan identitas Anda." },
  { title: "Pilih Jenjang Pendidikan", desc: "Pilih jenjang pendidikan Anda saat ini." },
  { title: "Pilih Jenis Layanan", desc: "Pilih jenis layanan yang Anda butuhkan." },
  { title: "Pilih Topik/Mata Pelajaran", desc: "Pilih jenis topik atau mata pelajaran terkait." },
  { title: "Tentukan Deadline", desc: "Tentukan tanggal deadline pengerjaan." },
  { title: "Pilih Tingkat Kesulitan", desc: "Tentukan tingkat kesulitan tugas Anda." },
  { title: "Deskripsikan Tugas", desc: "Berikan detail tentang tugas yang ingin Anda kerjakan." },
  { title: "Chat Admin", desc: "Chat dengan admin untuk konfirmasi dan bantuan." },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background" id="how-it-works">
      <div className="max-w-5xl mx-auto px-6">
        
        <p className="text-center text-[#F5B800] uppercase">
            cara kerja
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
            Bagaimana cara kerjanya?
          </h2>
          {/* Konten layanan bisa ditambahkan di sini */}
          <p className="text-center text-muted-foreground mb-10" style={{ fontSize: "1rem" }}>
            Ikuti langkah-langkah mudah berikut untuk mendapatkan bantuan akademik dari kami
          </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 lg:gap-x-12">
          {caraKerja.map((step, index) => {
            // Mengubah index 0, 1, 2 menjadi "01", "02", "03"
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // border-l dan pl-6 adalah kunci untuk membuat garis di sebelah kiri
                className="relative border-l border-slate-200/80 pl-6 sm:pl-8 group hover:border-primary transition-colors duration-300"
              >
                {/* Angka Biru */}
                <span className="block text-primary font-semibold text-lg mb-3 tracking-wide">
                  {stepNumber}
                </span>

                {/* Judul Langkah */}
                <h3 className="text-xl font-bold text-foreground mb-3 pr-4 leading-snug font-jakarta group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Deskripsi */}
                <p className="text-slate-500 text-[15px] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;