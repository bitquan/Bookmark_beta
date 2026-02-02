type OpenLibraryDoc = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
};

export type BookResult = {
  externalId: string;
  title: string;
  author: string | null;
  coverUrl: string | null;
  year: number | null;
};

const baseUrl = process.env.OPEN_LIBRARY_BASE_URL || "https://openlibrary.org";

export async function searchOpenLibrary(query: string): Promise<BookResult[]> {
  const url = `${baseUrl}/search.json?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch Open Library data");
  }
  const json = (await res.json()) as { docs?: OpenLibraryDoc[] };
  return (json.docs ?? []).slice(0, 10).map((doc) => ({
    externalId: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? null,
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    year: doc.first_publish_year ?? null,
  }));
}