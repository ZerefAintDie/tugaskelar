import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "../../../lib/supabase/server";

function generateOrderCode() {
  const year = new Date().getFullYear();
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `ORD-${year}${rand}`;
}

async function getInitialStatusId() {
  const { data, error } = await supabaseAdmin
    .from("order_statuses")
    .select("id")
    .ilike("name", "%pending%")
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.id ?? 1;
}

export async function POST(req: Request) {
  const payload = await req.json();
  const {
    full_name,
    whatsapp,
    email,
    education_level_id,
    service_type_id,
    difficulty_level_id,
    order_code,
    mata_pelajaran,
    deadline,
    description,
  } = payload;

  if (
    !full_name ||
    !whatsapp ||
    !education_level_id ||
    !service_type_id ||
    !difficulty_level_id ||
    !mata_pelajaran ||
    !deadline ||
    !description
  ) {
    return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
  }

  const deadlineDate = deadline.split("T")[0];
  if (!deadlineDate) {
    return NextResponse.json({ error: "Format deadline tidak valid." }, { status: 400 });
  }

  try {
    const { data: existingCustomer, error: existingCustomerError } = await supabaseAdmin
      .from("customers")
      .select("id")
      .eq("whatsapp", whatsapp)
      .maybeSingle();

    if (existingCustomerError) {
      throw existingCustomerError;
    }

    const customerId = existingCustomer?.id ?? randomUUID();

    if (!existingCustomer) {
      const { error: customerInsertError } = await supabaseAdmin
        .from("customers")
        .insert({
          id: customerId,
          full_name,
          email: email || null,
          whatsapp,
        });

      if (customerInsertError) {
        throw customerInsertError;
      }
    }

    const statusId = await getInitialStatusId();
    const orderCode = typeof order_code === "string" && order_code.trim() ? order_code : generateOrderCode();
    const orderId = randomUUID();

    const { data: orderData, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        id: orderId,
        order_code: orderCode,
        customer_id: customerId,
        education_level_id,
        service_type_id,
        difficulty_level_id,
        status_id: statusId,
        deadline_date: deadlineDate,
        description,
        estimated_price: null,
        final_price: null,
      })
      .select("*")
      .single();

    if (orderError) {
      throw orderError;
    }

    return NextResponse.json({ order: orderData, order_code: orderCode });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Terjadi kesalahan server.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
