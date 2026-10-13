"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function isPlaceholderConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return url.includes("placeholder") || key.includes("placeholder") || !url || !key;
}

export async function login(formData: FormData) {
  if (isPlaceholderConfig()) {
    return { 
      error: "Koneksi Supabase belum terpasang. Silakan masukkan Supabase URL & Anon Key asli di file .env.local." 
    };
  }

  try {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }
  } catch (err: any) {
    return { error: err?.message || "Gagal menghubungi server database Supabase." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  if (isPlaceholderConfig()) {
    return { 
      error: "Koneksi Supabase belum terpasang. Silakan masukkan Supabase URL & Anon Key asli di file .env.local." 
    };
  }

  try {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }
  } catch (err: any) {
    return { error: err?.message || "Gagal menghubungi server database Supabase." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signOut() {
  if (!isPlaceholderConfig()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore logout error if disconnected
    }
  }
  revalidatePath("/", "layout");
  redirect("/login");
}
