// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  { ignores: ['dist/', 'webpack/'] },
  eslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      globals: { ...globals.browser, ...globals.webextensions },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // chrome.* のイベントリスナーは async 関数を受け付ける
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { arguments: false } },
      ],
    },
  },
  prettier,
);
