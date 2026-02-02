import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/curriculum`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/feed`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: new Date(),
    },
  ];
}
