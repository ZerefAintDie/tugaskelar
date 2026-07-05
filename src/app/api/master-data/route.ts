import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const fallbackData = {
  educationLevels: [
    { id: 1, name: "Sekolah Menengah (SMA/SMK/MA)" },
    { id: 2, name: "Diploma (D3/D4)" },
    { id: 3, name: "Sarjana (S1)" },
    { id: 4, name: "Magister (S2)" },
    { id: 5, name: "Doktor (S3)" },
  ],
  serviceTypes: [
    { id: 1, name: "Tugas Sekolah" },
    { id: 2, name: "LKS Pembelajaran" },
    { id: 3, name: "Esai & Thesis" },
    { id: 4, name: "Jurnal" },
    { id: 5, name: "Skripsi" },
    { id: 6, name: "Olah Data" },
  ],
  difficultyLevels: [
    { id: 1, name: "Mudah" },
    { id: 2, name: "Sedang" },
    { id: 3, name: "Sulit" },
  ],
  orderStatuses: [
    { id: 1, name: "Menunggu" },
    { id: 2, name: "Diproses" },
    { id: 3, name: "Selesai" },
  ],
};

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(fallbackData);
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

  try {
    const [educationRes, serviceRes, difficultyRes, statusRes] = await Promise.all([
      supabaseAdmin.from("education_levels").select("id,name").order("id", { ascending: true }),
      supabaseAdmin.from("service_types").select("id,name").order("id", { ascending: true }),
      supabaseAdmin.from("difficulty_levels").select("id,name").order("id", { ascending: true }),
      supabaseAdmin.from("order_statuses").select("id,name").order("id", { ascending: true }),
    ]);

    const error = educationRes.error || serviceRes.error || difficultyRes.error || statusRes.error;
    if (error) {
      return NextResponse.json(fallbackData);
    }

    return NextResponse.json({
      educationLevels: educationRes.data ?? fallbackData.educationLevels,
      serviceTypes: serviceRes.data ?? fallbackData.serviceTypes,
      difficultyLevels: difficultyRes.data ?? fallbackData.difficultyLevels,
      orderStatuses: statusRes.data ?? fallbackData.orderStatuses,
    });
  } catch {
    return NextResponse.json(fallbackData);
  }
}
