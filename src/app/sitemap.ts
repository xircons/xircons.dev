import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://xircons.dev";

  const staticPages = ["", "/contact", "/privacy", "/terms"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: "2026-10-21",
  }));

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/project/${project.slug}`,
    lastModified: project.updated,
  }));

  return [...staticPages, ...projectPages];
}
