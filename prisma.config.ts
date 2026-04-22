import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use DIRECT_URL (non-pooling, port 5432) for migrations and schema push
    // PgBouncer pooler (port 6543) doesn't support DDL operations
    url: process.env["DIRECT_URL"] || process.env["DATABASE_URL"]!,
  },
});
