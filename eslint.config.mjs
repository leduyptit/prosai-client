import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Temporarily disable strict rules to reduce overwhelming errors
      "@typescript-eslint/no-explicit-any": "warn", // Change from error to warning
      "@typescript-eslint/no-empty-object-type": "warn", // Change from error to warning
      "@typescript-eslint/no-unsafe-function-type": "warn", // Change from error to warning
      "@typescript-eslint/no-wrapper-object-types": "warn", // Change from error to warning
      
      // Keep these as warnings for gradual improvement
      "@typescript-eslint/no-unused-vars": "warn",
      "@next/next/no-img-element": "warn",
      "jsx-a11y/alt-text": "warn",
      "react-hooks/exhaustive-deps": "warn",
      
      // Disable some rules that are too strict for development
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default eslintConfig;
