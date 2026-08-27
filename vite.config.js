import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

// Repo-Name auf GitHub muss zu diesem base passen:
// https://DEIN-USER.github.io/gemeindesporttag/
export default defineConfig({
  base: "/gemeindesporttag/",
  plugins: [tailwindcss(), svelte()],
});
