module.exports = {
  parser: "vue-eslint-parser",
  plugins: ["vue", "@typescript-eslint", "prettier"],
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "prettier"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // override/add rules settings here, such as:
    "no-var": "error",
    "prettier/prettier": "error",
    "vue/no-unused-vars": "error",
    "vue/no-mutating-props": "off", // Need to adjust this later from BaseNote
    "vue/script-setup-uses-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/no-v-html": "off",
    "vue/multi-word-component-names": "off",
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
}
