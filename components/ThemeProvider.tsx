"use client";

import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store";
import useStore from "@/store/useStore";

export default function ThemeProvider({
  children,
  font,
}: {
  children: React.ReactNode;
  font: string;
}) {
  const theme = useStore(useThemeStore, (state) => state.theme);

  const lightTheme = "bg-gray-100 text-black";
  const darkTheme = "bg-gray-600 text-white";

  const themeClass = theme === "light" ? lightTheme : darkTheme;

  return (
    <body
      className={cn(`flex h-[100svh] transition-colors ${font}`, themeClass)}
    >
      {children}
    </body>
  );
}
