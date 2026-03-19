/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        button: "#b86748",
        "button-hover": "#9e5638",
        "button-5": "rgba(184,103,72,0.36)",
        "button-5-hover" : "rgba(184,103,72,0.6)",
        bg:"rgba(232,223,223,0.49)",  
        "bg-hover":"rgba(200,190,190,0.6)",
        product: "#d19000",
        light: "#d9d9d9",
        grey: "#9a9999",
      },
      backgroundImage: {
        "backgroundImg": "url('/src/assets/background.avif')",
        "sidebar": "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), conic-gradient(from 90deg, #b86748 -14%, #c4a58f 3%, #e8dfdf 28%, #b86748 47%, #dbb3a3 64%, #b86748 86%)",
        "menu-gradient": "conic-gradient(from 90deg, #b86748 -14%, #be866c -5%, #c4a58f 3%, #d6c2b7 16%, #e8dfdf 28%, #dcc1b9 33%, #d0a393 38%, #c4856e 42%, #b86748 47%, #ca8d76 56%, #dbb3a3 64%, #ca8d76 75%, #b86748 86%, #be866c 95%, #c4a58f 103%)",
      },
       fontFamily: {
        global: ["Work Sans", "sans-serif"],
      },
      fontSize: {
        title: "26px",
        secondaryTitle: "20px",
        product: "21px",
         button:"18px",
        normal: "13px",
      },
    },
  },
  plugins: [],
}

