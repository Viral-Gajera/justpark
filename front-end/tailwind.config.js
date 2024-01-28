/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                c1: "#0e1d34",
                c2: "#0d42ff",
                c3: "#1e345f",
                c4: "#F1FAEE",
                c5: "#E63946",
            },
        },
    },
    daisyui: {
        themes: ["light"],
    },
    plugins: [require("daisyui")],
};
