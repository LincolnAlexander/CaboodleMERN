/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                mainColors: {
                    gray: "#2C2C2C",
                    lightGray: "#505050",
                    silver: "#E6E6E6",
                    green: "#4B924E",
                },
            },

            height: {
                75: "19rem",
            },
        },
    },
    plugins: [],
};
