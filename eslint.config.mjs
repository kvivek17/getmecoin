import { dirname } from "path";
import { fileNEXT_PUBLIC_URLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileNEXT_PUBLIC_URLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;
