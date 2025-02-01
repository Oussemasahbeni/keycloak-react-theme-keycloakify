import react from "@vitejs/plugin-react";
import { buildEmailTheme } from 'keycloakify-emails';
import { keycloakify } from "keycloakify/vite-plugin";
import path from "path";
import { defineConfig } from "vite";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            themeName: "keylearn-theme",
            keycloakVersionTargets: {
                "22-to-25": false,
                "all-other-versions": "keylearn-theme.jar"
            },
            postBuild: async (buildContext) => {
                await buildEmailTheme({
                  templatesSrcDirPath: import.meta.dirname + "/emails/templates",
                  themeNames: buildContext.themeNames,
                  keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
                  locales: ["en", "fr"],
                  cwd: import.meta.dirname,
                  esbuild: {}, // optional esbuild options
                });
              },
            
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
});
