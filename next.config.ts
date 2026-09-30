import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { SITE_URL, migrationHosts } from "./src/lib/site-config";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return migrationHosts().map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host.replace(/\./g, "\\.") }],
      destination: `${SITE_URL}/:path*`,
      permanent: true,
    }));
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", "remark-frontmatter"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
