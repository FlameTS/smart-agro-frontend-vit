const API_BASE = import.meta.env.VITE_API_URL;

export async function predictCrop(file: File) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      body: formData,
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
