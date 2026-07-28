import type {MetadataRoute} from "next";

const BASE_URL = "https://www.frimatechnology.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    {path: "", changeFrequency: "weekly" as const, priority: 1},
    {path: "/shop", changeFrequency: "daily" as const, priority: 0.9},
    {path: "/posts", changeFrequency: "weekly" as const, priority: 0.8},
    {path: "/training", changeFrequency: "weekly" as const, priority: 0.9},
    {path: "/about", changeFrequency: "monthly" as const, priority: 0.7},
    {path: "/contact", changeFrequency: "monthly" as const, priority: 0.7},
    {path: "/cart", changeFrequency: "weekly" as const, priority: 0.5},
    {path: "/auth/login", changeFrequency: "monthly" as const, priority: 0.3},
    {path: "/auth/register", changeFrequency: "monthly" as const, priority: 0.3},
  ];

  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
