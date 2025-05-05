import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/migration",
  schema: "./drizzle/schema.js",
  dialect: "mysql",
  dbCredentials: {
  url: 'mysql://root:Th@kur3g@localhost:3306/url_drizzle',
}
,
});