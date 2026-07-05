'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { FloatingActions } from "@/src/components/layout/floatingaction";
import { ArrowLeft, ArrowRight, Check, ChevronRight, MessageCircle, User, Copy, CheckCircle } from "lucide-react";
import { Navbar } from "@/src/components/layout/navbar";

type View = "landing" | "order" | "dashboard" | "admin";

type MasterItem = {
  id: number;
  name: string;
};

interface OrderWizardProps {
  onBack: () => void;
  onNavigate: (view: View) => void;
}

const todayStr = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};

const difficultyMetadata: Record<string, { desc: string; stars: number; color: string }> = {
  mudah: { desc: "Tugas dasar, tidak butuh riset mendalam", stars: 1, color: "#22c55e" },
  sedang: { desc: "Cukup kompleks, perlu analisis dan referensi", stars: 2, color: "#03BFB5" },
  sulit: { desc: "Sangat teknis, butuh keahlian khusus", stars: 3, color: "#018076" },
};

const stepTitles = [
  "Identitas Pemesan",
  "Pilih Jenjang Pendidikan",
  "Pilih Jenis Bantuan",
  "Mata Pelajaran / Kuliah",
  "Pilih Deadline",
  "Tingkat Kesulitan",
  "Deskripsi Tugas",
  "Review Order",
  "Lanjut ke WhatsApp",
];

const stepSubtitles = [
  "Isi data dirimu agar kami bisa menghubungimu dan memproses ordermu.",
  "Pilih jenjang pendidikanmu saat ini.",
  "Jenis bantuan apa yang kamu butuhkan?",
  "Ketik nama mata pelajaran atau mata kuliah yang ingin dibantu.",
  "Kapan tugasmu harus selesai?",
  "Seberapa kompleks tugasmu?",
  "Ceritakan detail tugasmu agar tim kami bisa mempersiapkan yang terbaik.",
  "Cek kembali ringkasan ordermu sebelum dikirim.",
  "Order siap! Kirim ke WhatsApp admin kami.",
];

function generateOrderId() {
  const year = new Date().getFullYear();
  const rand = String(Math.floor(Math.random() * 9000) + 1000).padStart(4, "0");
  return `ORD-${year}${rand}`;
}

function StepDots({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNum = i + 1;
        const done = stepNum < currentStep;
        const active = stepNum === currentStep;
        return (
          <motion.div
            key={i}
            animate={{
              width: active ? 28 : done ? 16 : 8,
              background: active ? "#03BFB5" : done ? "#F5B800" : "var(--muted)",
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full"
          />
        );
      })}
      <span className="ml-2 text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
}

function OptionCard({
  selected, onClick, children,
}: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 flex items-center gap-3"
      style={{
        borderColor: selected ? "#03BFB5" : "var(--border)",
        background: selected ? "rgba(3,191,181,0.08)" : "var(--card)",
        boxShadow: selected ? "0 0 0 1px #03BFB5" : "0 4px 12px rgba(0,0,0,0.04)",
      }}
    >
      {children}
      {selected && (
        <div className="ml-auto w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: "#03BFB5" }}>
          <Check size={12} color="#004146" strokeWidth={3} />
        </div>
      )}
    </motion.button>
  );
}

function InputField({
  label, placeholder, value, onChange, type = "text", required = false, hint,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-1 mb-2">
        <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>
          {label}
        </label>
        {required && <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>*</span>}
        {!required && <span style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>(opsional)</span>}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all"
        style={{
          background: "var(--card)",
          color: "var(--foreground)",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.9375rem",
          borderColor: focused ? "#03BFB5" : "var(--border)",
          boxShadow: focused ? "0 0 0 3px rgba(3,191,181,0.12)" : "none",
        }}
      />
      {hint && <p className="mt-1.5" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{hint}</p>}
    </div>
  );
}


export function OrderWizard({ onBack, onNavigate }: OrderWizardProps) {
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState(generateOrderId);
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState({
    nama: "",
    whatsapp: "",
    email: "",
    jenjang: 0,
    jenisBantuan: 0,
    mataPelajaran: "",
    deadline: "",
    kesulitan: 0,
    deskripsi: "",
  });

  const [educationLevels, setEducationLevels] = useState<MasterItem[]>([]);
  const [serviceTypes, setServiceTypes] = useState<MasterItem[]>([]);
  const [difficultyLevels, setDifficultyLevels] = useState<MasterItem[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<MasterItem[]>([]);
  const [loadingMasters, setLoadingMasters] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [orderSaved, setOrderSaved] = useState(false);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const res = await fetch("/api/master-data");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Gagal memuat data master.");
        }

        setEducationLevels(data.educationLevels ?? []);
        setServiceTypes(data.serviceTypes ?? []);
        setDifficultyLevels(data.difficultyLevels ?? []);
        setOrderStatuses(data.orderStatuses ?? []);
      } catch (error) {
        setApiError(error instanceof Error ? error.message : "Gagal memuat data master.");
      } finally {
        setLoadingMasters(false);
      }
    };

    fetchMasterData();
  }, []);

  const totalSteps = 9;

  const canProceed = () => {
    switch (step) {
      case 1: return !!order.nama.trim() && !!order.whatsapp.trim() && !!order.email.trim();
      case 2: return !!order.jenjang;
      case 3: return !!order.jenisBantuan;
      case 4: return !!order.mataPelajaran.trim();
      case 5: return !!(order.deadline.split("T")[0] && order.deadline.split("T")[1]);
      case 6: return !!order.kesulitan;
      case 7: return !!order.deskripsi.trim();
      case 8: return true;
      default: return true;
    }
  };

  const buildWAMsg = () => {
    const jenjang = educationLevels.find(e => e.id === order.jenjang)?.name || "-";
    const jenis = serviceTypes.find(s => s.id === order.jenisBantuan)?.name || "-";
    const kes = difficultyLevels.find(d => d.id === order.kesulitan)?.name || "-";

    const msg = [
      `🎓 *ORDER BARU — ${orderId}*`,
      ``,
      `👤 *Identitas Pemesan*`,
      `Nama     : ${order.nama}`,
      `WhatsApp : ${order.whatsapp}`,
      order.email ? `Email    : ${order.email}` : null,
      ``,
      `📋 *Detail Order*`,
      `Jenjang  : ${jenjang}`,
      `Jenis    : ${jenis}`,
      `Mapel    : ${order.mataPelajaran}`,
      `Deadline : ${order.deadline}`,
      `Kesulitan: ${kes}`,
      ``,
      `📝 *Deskripsi Tugas*`,
      order.deskripsi,
      ``,
      `_Harga akan dikonfirmasi oleh admin._`,
      ``,
      `_Mohon konfirmasi order ini. Terima kasih!_`,
    ].filter(Boolean).join("\n");

    return `https://wa.me/6285875015777?text=${encodeURIComponent(msg)}`;
  };

  const handleSendOrder = async () => {
    if (submitting) return;
    setApiError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: order.nama,
          whatsapp: order.whatsapp,
          email: order.email || null,
          education_level_id: order.jenjang,
          service_type_id: order.jenisBantuan,
          difficulty_level_id: order.kesulitan,
          order_code: orderId,
          mata_pelajaran: order.mataPelajaran,
          deadline: order.deadline,
          description: order.deskripsi,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Gagal menyimpan order.");
      }

      if (data.order_code) {
        setOrderId(data.order_code);
      }
      setOrderSaved(true);
      window.open(buildWAMsg(), "_blank");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim order.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const next = () => { if (canProceed() && step < totalSteps) setStep(s => s + 1); };
  const prev = () => { if (step > 1) setStep(s => s - 1); };

  const reviewItems = [
    { label: "Nomor Order", value: orderId, highlight: true },
    { label: "Nama", value: order.nama || "-" },
    { label: "WhatsApp", value: order.whatsapp || "-" },
    { label: "Email", value: order.email || "(tidak diisi)" },
    { label: "Jenjang", value: educationLevels.find(e => e.id === order.jenjang)?.name || "-" },
    { label: "Jenis Bantuan", value: serviceTypes.find(s => s.id === order.jenisBantuan)?.name || "-" },
    { label: "Mata Pelajaran", value: order.mataPelajaran || "-" },
    {
      label: "Deadline",
      value: order.deadline && order.deadline.includes("T")
        ? `${new Date(order.deadline).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}, ${order.deadline.split("T")[1]} WIB`
        : "-",
    },
    { label: "Kesulitan", value: difficultyLevels.find(d => d.id === order.kesulitan)?.name || "-" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4" style={{ background: "var(--background)" }}>
    {/* <Navbar /> */}
    <FloatingActions />
      <div className="max-w-xl mx-auto ">
        {/* Back button */}
        <button
          onClick={step === 1 ? onBack : prev}
          className="flex items-center gap-2 mb-8 group hover:text-[#03BFB5] transition-colors"
          style={{  fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          {step === 1 ? "Kembali ke Beranda" : "Langkah Sebelumnya"}
        </button>

        {/* Step dots */}
        <StepDots currentStep={step} totalSteps={totalSteps} />

        {/* Header */}
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#03BFB5", fontFamily: "'Inter', sans-serif" }}>
            Langkah {step} dari {totalSteps}
          </p>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.4rem, 4vw, 1.875rem)",
              color: "var(--foreground)",
              lineHeight: 1.2,
            }}
          >
            {stepTitles[step - 1]}
          </h1>
          <p className="mt-2" style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            {stepSubtitles[step - 1]}
          </p>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {/* ── Step 1: Identitas ── */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <InputField
                  label="Nama Lengkap"
                  placeholder="Contoh: Budi Santoso"
                  value={order.nama}
                  onChange={v => setOrder(o => ({ ...o, nama: v }))}
                  required
                />
                <InputField
                  label="Nomor WhatsApp"
                  placeholder="Contoh: 08123456789"
                  value={order.whatsapp}
                  onChange={v => setOrder(o => ({ ...o, whatsapp: v }))}
                  type="tel"
                  required
                  hint="Nomor ini digunakan untuk konfirmasi order dan pengiriman hasil."
                />
                <InputField
                  label="Email"
                  placeholder="Contoh: budi@email.com"
                  value={order.email}
                  onChange={v => setOrder(o => ({ ...o, email: v }))}
                  type="email"
                  required
                  hint="Untuk notifikasi & persiapan akun ke depannya."
                />

                <div
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: "rgba(1,128,118,0.06)", border: "1px solid rgba(1,128,118,0.15)" }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(1,128,118,0.12)" }}>
                    <User size={15} color="#018076" />
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                    Data kamu aman dan hanya digunakan untuk keperluan order. 
                    <br />
                    Kami tidak akan menyebarkan informasi pribadimu.
                  </p>
                </div>
              </div>
            )}

            {/* ── Step 2: Jenjang ── */}
            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {loadingMasters ? (
                  <div className="p-6 rounded-2xl text-center border border-border" style={{ background: "var(--card)" }}>
                    Memuat jenjang pendidikan...
                  </div>
                ) : educationLevels.length ? (
                  educationLevels.map((lvl) => (
                    <OptionCard
                      key={lvl.id}
                      selected={order.jenjang === lvl.id}
                      onClick={() => setOrder(o => ({ ...o, jenjang: lvl.id }))}
                    >
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--foreground)", fontWeight: 500 }}>
                        {lvl.name}
                      </span>
                    </OptionCard>
                  ))
                ) : (
                  <div className="p-6 rounded-2xl text-center border border-border" style={{ background: "var(--card)" }}>
                    Data jenjang tidak tersedia. Silakan hubungi admin.
                  </div>
                )}
              </div>
            )}

            {/* ── Step 3: Jenis Bantuan ── */}
            {step === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {loadingMasters ? (
                  <div className="p-6 rounded-2xl text-center border border-border" style={{ background: "var(--card)" }}>
                    Memuat jenis layanan...
                  </div>
                ) : serviceTypes.length ? (
                  serviceTypes.map((svc) => (
                    <OptionCard
                      key={svc.id}
                      selected={order.jenisBantuan === svc.id}
                      onClick={() => setOrder(o => ({ ...o, jenisBantuan: svc.id }))}
                    >
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--foreground)", fontWeight: 500 }}>
                        {svc.name}
                      </span>
                    </OptionCard>
                  ))
                ) : (
                  <div className="p-6 rounded-2xl text-center border border-border" style={{ background: "var(--card)" }}>
                    Data jenis layanan tidak tersedia. Silakan hubungi admin.
                  </div>
                )}
              </div>
            )}

            {/* ── Step 4: Mata Pelajaran ── */}
            {step === 4 && (
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>
                      Nama Mata Pelajaran / Mata Kuliah
                    </label>
                    <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>*</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Contoh: Matematika, Akuntansi Keuangan, Algoritma & Pemrograman..."
                    value={order.mataPelajaran}
                    onChange={e => setOrder(o => ({ ...o, mataPelajaran: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all"
                    style={{
                      background: "var(--card)",
                      color: "var(--foreground)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9375rem",
                      borderColor: order.mataPelajaran ? "#03BFB5" : "var(--border)",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#03BFB5")}
                    onBlur={e => (e.target.style.borderColor = order.mataPelajaran ? "#03BFB5" : "var(--border)")}
                    autoFocus
                  />
                  <p className="mt-2" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                    Ketik nama mata pelajaran atau mata kuliah yang ditugaskan.
                  </p>
                </div>

                {/* Quick suggestions */}
                <div>
                  <p className="mb-2 text-sm font-bold" style={{ fontWeight: 600 }}>Pilih Cepat:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Matematika", "Fisika", "Bahasa Indonesia", "Akuntansi", "Pemrograman", "Statistika", "Manajemen", "Hukum"].map(s => (
                      <button
                        key={s}
                        onClick={() => setOrder(o => ({ ...o, mataPelajaran: s }))}
                        className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all border border-input hover:bg-primary/10 hover:text-primary hover:border-primary"
                        style={{
                          background: order.mataPelajaran === s ? "rgba(3,191,181,0.15)" : "var(--muted)",
                          // color: order.mataPelajaran === s ? "#028d85" : "var(--muted-foreground)",
                          // border: order.mataPelajaran === s ? "1.5px solid #03BFB5" : "1.5px solid #D9D9D9",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 5: Deadline ── */}
            {step === 5 && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tanggal */}
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>
                        Tanggal Deadline
                      </label>
                      <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>*</span>
                    </div>
                    <input
                      type="date"
                      min={todayStr()}
                      value={order.deadline.split("T")[0] || ""}
                      onChange={e => {
                        const time = order.deadline.split("T")[1] || "23:59";
                        setOrder(o => ({ ...o, deadline: `${e.target.value}T${time}` }));
                      }}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all"
                      style={{
                        background: "var(--card)",
                        color: "var(--foreground)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9375rem",
                        borderColor: order.deadline.split("T")[0] ? "#03BFB5" : "var(--border)",
                        colorScheme: "light dark",
                      }}
                      onFocus={e => (e.target.style.borderColor = "#03BFB5")}
                      onBlur={e => (e.target.style.borderColor = order.deadline.split("T")[0] ? "#03BFB5" : "var(--border)")}
                    />
                  </div>

                  {/* Jam */}
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>
                        Jam Deadline
                      </label>
                      <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>*</span>
                    </div>
                    <input
                      type="time"
                      value={order.deadline.split("T")[1] || ""}
                      onChange={e => {
                        const date = order.deadline.split("T")[0] || todayStr();
                        setOrder(o => ({ ...o, deadline: `${date}T${e.target.value}` }));
                      }}
                      className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all"
                      style={{
                        background: "var(--card)",
                        color: "var(--foreground)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9375rem",
                        borderColor: order.deadline.split("T")[1] ? "#03BFB5" : "var(--border)",
                        colorScheme: "light dark",
                      }}
                      onFocus={e => (e.target.style.borderColor = "#03BFB5")}
                      onBlur={e => (e.target.style.borderColor = order.deadline.split("T")[1] ? "#03BFB5" : "var(--border)")}
                    />
                  </div>
                </div>

                {/* Preview */}
                {order.deadline && order.deadline.includes("T") && order.deadline.split("T")[0] && order.deadline.split("T")[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-2xl"
                    style={{ background: "rgba(3,191,181,0.08)", border: "1.5px solid rgba(3,191,181,0.3)" }}
                  >
                    <span className="text-xl">📅</span>
                    <div>
                      <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: 2 }}>Deadline kamu:</p>
                      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--foreground)" }}>
                        {new Date(`${order.deadline}`).toLocaleDateString("id-ID", {
                          weekday: "long", day: "numeric", month: "long", year: "numeric"
                        })}
                        {", pukul "}
                        {order.deadline.split("T")[1]} WIB
                      </p>
                    </div>
                  </motion.div>
                )}

                <div
                  className="p-4 rounded-2xl"
                  style={{ background: "rgba(1,128,118,0.06)", border: "1px solid rgba(1,128,118,0.12)" }}
                >
                  <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                    💡 Masukkan tanggal dan jam pengumpulan sesuai instruksi dosen atau platform belajarmu.
                    Harga akan ditentukan oleh admin berdasarkan sisa waktu yang tersedia.
                  </p>
                </div>
              </div>
            )}

            {/* ── Step 6: Kesulitan ── */}
            {step === 6 && (
              <div className="flex flex-col gap-3">
                {loadingMasters ? (
                  <div className="p-6 rounded-2xl text-center border border-border" style={{ background: "var(--card)" }}>
                    Memuat tingkat kesulitan...
                  </div>
                ) : difficultyLevels.length ? (
                  difficultyLevels.map((diff) => {
                    const meta = difficultyMetadata[diff.name.toLowerCase()] ?? {
                      desc: "Tentukan tingkat kesulitan tugasmu.",
                      stars: 2,
                      color: "#03BFB5",
                    };
                    return (
                      <OptionCard
                        key={diff.id}
                        selected={order.kesulitan === diff.id}
                        onClick={() => setOrder(o => ({ ...o, kesulitan: diff.id }))}
                      >
                        <div className="flex flex-col gap-1 flex-1">
                          <div className="flex items-center gap-3">
                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--foreground)" }}>
                              {diff.name}
                            </span>
                            <div className="flex gap-1">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="w-3 h-3 rounded-full"
                                  style={{ background: i < meta.stars ? meta.color : "var(--muted)" }}
                                />
                              ))}
                            </div>
                          </div>
                          <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{meta.desc}</p>
                        </div>
                      </OptionCard>
                    );
                  })
                ) : (
                  <div className="p-6 rounded-2xl text-center border border-border" style={{ background: "var(--card)" }}>
                    Data tingkat kesulitan tidak tersedia. Silakan hubungi admin.
                  </div>
                )}
              </div>
            )}

            {/* ── Step 7: Deskripsi ── */}
            {step === 7 && (
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>
                        Deskripsi Tugas
                      </label>
                      <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>*</span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: order.deskripsi.length > 20 ? "#03BFB5" : "var(--muted-foreground)" }}>
                      {order.deskripsi.length} karakter
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    placeholder="Ceritakan detail tugasmu di sini. Contoh: jumlah halaman, format, referensi yang dibutuhkan, instruksi khusus dari dosen, file yang perlu dilampirkan, dll."
                    value={order.deskripsi}
                    onChange={e => setOrder(o => ({ ...o, deskripsi: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 outline-none transition-all resize-none"
                    style={{
                      background: "var(--card)",
                      color: "var(--foreground)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      borderColor: order.deskripsi ? "#03BFB5" : "var(--border)",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#03BFB5")}
                    onBlur={e => (e.target.style.borderColor = order.deskripsi ? "#03BFB5" : "var(--border)")}
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 ">
                  {[
                    "📄 Jumlah halaman/kata",
                    "📚 Format referensi (APA, dll)",
                    "🔗 Link soal / materi",
                    "⏰ Jam pengumpulan",
                  ].map((hint, i) => (
                    <div
                      key={i}
                      className="flex items-center font-bold gap-2 p-3 rounded-xl border border-01 rounded-2xl p-3" 
                      style={{ background: "var(--muted)" }}
                    >
                      <span style={{ fontSize: "0.775rem", color: "var(--muted-foreground)" }}>{hint}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.775rem", color: "var(--muted-foreground)" }}>
                  Semakin detail deskripsimu, semakin akurat hasil yang kami berikan.
                </p>
              </div>
            )}

            {/* ── Step 8: Review ── */}
            {step === 8 && (
              <div className="flex flex-col gap-4">
                {/* Order ID card */}
                <div
                  className="flex items-center justify-between p-4 rounded-2xl"
                  style={{ background: "linear-gradient(135deg, rgba(245,184,0,0.1), rgba(245,184,0,0.05))", border: "1.5px solid rgba(245,184,0,0.3)" }}
                >
                  <div>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: 2 }}>Nomor Order (simpan ini)</p>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.375rem", color: "#F5B800", letterSpacing: "0.05em" }}>
                      {orderId}
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: copied ? "rgba(34,197,94,0.15)" : "var(--card)",
                      color: copied ? "#16a34a" : "var(--foreground)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copied ? "Disalin!" : "Salin"}
                  </button>
                </div>

                {/* Summary */}
                <div className="rounded-2xl border border-border overflow-hidden" style={{ background: "var(--card)" }}>
                  {reviewItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-start gap-3 px-5 py-3"
                      style={{ borderBottom: i < reviewItems.length - 1 ? "1px solid var(--border)" : "none" }}
                    >
                      <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", flexShrink: 0 }}>
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: item.highlight ? "#03BFB5" : "var(--foreground)",
                          fontFamily: item.highlight ? "'Plus Jakarta Sans', sans-serif" : "'Inter', sans-serif",
                          fontWeight: item.highlight ? 700 : 500,
                          textAlign: "right",
                          maxWidth: "55%",
                        }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Deskripsi preview */}
                <div className="p-4 rounded-2xl border border-border" style={{ background: "var(--card)" }}>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: 6, fontWeight: 600 }}>Deskripsi Tugas</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--foreground)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                    {order.deskripsi || "-"}
                  </p>
                </div>

                {/* Harga info */}
                <div
                  className="flex items-center gap-3 p-4 rounded-2xl"
                  style={{ background: "rgba(1,128,118,0.06)", border: "1px solid rgba(1,128,118,0.15)" }}
                >
                  <span className="text-2xl">💬</span>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                    <strong style={{ color: "var(--foreground)" }}>Harga ditentukan oleh admin</strong> setelah kamu mengirim order via WhatsApp. Admin akan menghubungimu dan menyepakati harga bersama.
                  </p>
                </div>
              </div>
            )}

            {/* ── Step 9: WhatsApp Checkout ── */}
            {step === 9 && (
              <div className="flex flex-col items-center text-center gap-6">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="w-24 h-24 rounded-3xl flex items-center justify-center"
                  style={{ background: "rgba(37,211,102,0.12)", border: "2px solid rgba(37,211,102,0.25)" }}
                >
                  <MessageCircle size={42} color="#25D166" />
                </motion.div>

                <div>
                  <h2
                    className="mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "var(--foreground)" }}
                  >
                    Order Siap Dikirim! 🎉
                  </h2>
                  <p style={{ fontSize: "0.9rem", color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: 360 }}>
                    Klik tombol di bawah untuk mengirim detail ordermu ke WhatsApp admin kami.
                    Tim kami akan membalas dalam <strong style={{ color: "var(--foreground)" }}>15 menit</strong>.
                  </p>
                </div>

                {/* Order ID reminder */}
                <div
                  className="w-full flex items-center justify-between p-4 rounded-2xl"
                  style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
                >
                  <div className="text-left">
                    <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: 2 }}>Nomor Ordermu</p>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#03BFB5" }}>{orderId}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold"
                    style={{
                      background: copied ? "rgba(34,197,94,0.12)" : "var(--muted)",
                      color: copied ? "#16a34a" : "var(--muted-foreground)",
                    }}
                  >
                    {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
                    {copied ? "Disalin!" : "Salin"}
                  </button>
                </div>

                {/* Summary pill */}
                <div
                  className="w-full p-4 rounded-2xl text-left"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: 6 }}>Ringkasan</p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {serviceTypes.find(s => s.id === order.jenisBantuan)?.name} — {order.mataPelajaran}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginTop: 2 }}>
                    {order.deadline && order.deadline.includes("T")
                      ? `${new Date(order.deadline).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}, ${order.deadline.split("T")[1]} WIB`
                      : "-"
                    } · {difficultyLevels.find(d => d.id === order.kesulitan)?.name}
                  </p>
                  <p style={{ fontSize: "0.775rem", color: "var(--muted-foreground)", marginTop: 8, fontStyle: "italic" }}>
                    Harga akan disepakati bersama admin via WhatsApp.
                  </p>
                </div>

                {/* WhatsApp button */}
                <motion.button
                  type="button"
                  onClick={handleSendOrder}
                  whileHover={{ scale: submitting ? 1 : 1.03 }}
                  whileTap={{ scale: submitting ? 1 : 0.97 }}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold"
                  style={{
                    background: submitting ? "rgba(37,209,102,0.4)" : "linear-gradient(135deg, #25D166, #1da851)",
                    color: "#fff",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "1.0625rem",
                    boxShadow: submitting ? "none" : "0 10px 28px rgba(37,209,102,0.35)",
                    textDecoration: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  <MessageCircle size={20} />
                  {submitting ? "Menyimpan order..." : "Kirim Order via WhatsApp"}
                </motion.button>

                {/* Secondary actions */}
                <div className="flex items-center gap-5 pt-1">
                  <button
                    onClick={() => onNavigate("dashboard")}
                    className="flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: "#018076", fontFamily: "'Inter', sans-serif" }}
                  >
                    Lihat Dashboard
                    <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() => onNavigate("landing")}
                    className="text-sm"
                    style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {step < 9 && (
          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <button
                onClick={prev}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-border font-semibold transition-all hover:bg-muted"
                style={{ color: "var(--foreground)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
              >
                <ArrowLeft size={15} />
                Kembali
              </button>
            )}
            <motion.button
              whileHover={{ scale: canProceed() ? 1.02 : 1 }}
              whileTap={{ scale: canProceed() ? 0.97 : 1 }}
              onClick={next}
              disabled={!canProceed()}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold"
              style={{
                background: canProceed() ? "#03BFB5" : "var(--muted)",
                color: canProceed() ? "#004146" : "var(--muted-foreground)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.9375rem",
                cursor: canProceed() ? "pointer" : "not-allowed",
                boxShadow: canProceed() ? "0 6px 20px rgba(3,191,181,0.3)" : "none",
                transition: "all 0.2s",
              }}
            >
              {step === 8 ? "Lanjut ke WhatsApp →" : "Lanjutkan"}
              {step < 8 && <ArrowRight size={16} />}
            </motion.button>
          </div>
        )}

        {/* Wajib isi note */}
        {!canProceed() && step < 9 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-3"
            style={{ fontSize: "0.775rem", color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}
          >
            {step === 1 ? "Nama, nomor WhatsApp, dan email wajib diisi." : "Pilih salah satu untuk melanjutkan."}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default function OrderPage() {
  const router = useRouter();

  return (
    <OrderWizard
      onBack={() => router.push('/')}
      onNavigate={(view) => {
        if (view === 'landing') router.push('/');
        if (view === 'dashboard') router.push('/dashboard');
        if (view === 'admin') router.push('/admin');
      }}
    />
  );
}
