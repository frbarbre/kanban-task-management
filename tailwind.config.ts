const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,jsx,js}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: {
        nav: "calc(100% - 48px)",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(280px, 1fr))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "gray-700": "#000112",
        "gray-600": "#20212C",
        "gray-500": "#2B2C37",
        "gray-400": "#3E3F4E",
        "gray-300": "#828FA3",
        "gray-200": "#E4EBFA",
        "gray-100": "#F4F7FD",
        idle: "#EFEFF9",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      boxShadow: {
        shad: "0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
      },
      height: {
        nav: "calc(100vh - 92px)",
        navDesktop: "calc(100vh - 108px)",
        container: "calc(100% - 94px)",
        pay: "calc(100% - 50px)",
        calender: "calc(100svh - 202px)",
        messages: "calc(100svh - 638px)",
        innerMessage: "calc(100svh - 717px)",
        registrations: "calc(100svh - 678px)",
      },
      minHeight: {
        calender: "calc(100svh - 202px)",
        messages: "calc(100svh - 638px)",
        registrations: "calc(100svh - 678px)",
      },
    },
    screens: {
      xxxs: "337px",
      xxs: "350px",
      xs: "430px",
      sm: "640px",
      md: "1024px",
      lg: "1400px",
      xl: "1560px",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
