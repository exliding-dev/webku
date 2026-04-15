import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // DIRECT_URL: direct connection for migrations (port 5432)
    // DATABASE_URL: pooled connection for runtime queries (port 6543, pgbouncer)
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"]!,
  },
});
