const API_BASE = import.meta.env.VITE_API_URL;
import { supabase } from "./supabase";

export async function getAuthHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function predictCrop(file: File, lang: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  const formData = new FormData();
  formData.append("file", file);

  formData.append("lang", lang);

  console.log("LANG SENT:", lang);
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      body: formData,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
