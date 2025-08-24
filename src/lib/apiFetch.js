
export async function apiFetch(path, options = {}) {
  const res = await fetch(path, {
    ...options,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`❌ Fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
