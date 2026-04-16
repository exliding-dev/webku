import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Using pooler URL (port 6543) for both migrations and runtime
    // since port 5432 (direct) may be blocked by firewall/network
    url: process.env["DATABASE_URL"]!,
  },
});
