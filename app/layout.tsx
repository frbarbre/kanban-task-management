import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";
import ThemeProvider from "@/components/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Task Management",
  description: "Take your productivity to the next level with Kanban.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider font={plusJakartaSans.className}>
        <div className="hidden sm:block">
          <NavBar />
        </div>
        <div className="flex flex-col flex-1">
          <TopBar />
          {children}
        </div>
      </ThemeProvider>
    </html>
  );
}
