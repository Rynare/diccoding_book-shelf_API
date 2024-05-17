import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: js.configs.recommended });

export default [
  ...compat.extends("airbnb-base"),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        myCustomGlobal: "readonly",
        node: true,
      },
    },
    rules: {
      "import/no-extraneous-dependencies": 0,
      "import/prefer-default-export": "off",
      "import/no-named-as-default-member": "off",
      "import/no-named-as-default": 0,
      "no-console": 0,
      "no-underscore-dangle": 0,
      "no-restricted-globals": 0,
      "linebreak-style": 0,
      "max-len": "off",
      "import/no-unresolved": 0,
      "no-use-before-define": 0,
      "no-plusplus": 0,
      "no-continue": 0,
      "class-methods-use-this": 0,
      "consistent-return": 0,
      "import/no-cycle": 0,
      "no-useless-constructor": 0,
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "always",
        },
      ],
      indent: [
        "error",
        2,
      ],
      quotes: [
        "error",
        "double",
      ],
      semi: [
        "error",
        "always",
      ],
    },
  },
  {
    ignores: ["dist/", "tests/", "e2e/"],
  },
];