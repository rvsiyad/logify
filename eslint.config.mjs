import globals from "globals";

export default [{
    files: ["**/*.js"],
    languageOptions: {
        globals: {
            ...globals.commonjs,
            ...globals.node,
            ...globals.mocha,
            structuredClone: "readonly",  // Add this line
        },

        ecmaVersion: 2022,
        sourceType: "module",
    },

    rules: {
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": "warn",
        "constructor-super": "warn",
        "valid-typeof": "warn",
    },
}];