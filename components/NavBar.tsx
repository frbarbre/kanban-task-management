"use client";

import Image from "next/image";
import AllBoards from "./AllBoards";
import DarkMode from "./DarkMode";
import { useMenuStore, useThemeStore } from "@/store";
import useStore from "@/store/useStore";
import Toggle from "./Toggle";
import { useState } from "react";
export default function NavBar() {
  const theme = useStore(useThemeStore, (state) => state.theme);
  const isOpen = useStore(useMenuStore, (state) => state.isOpen);
  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  const [isHovered, setIsHovered] = useState(false);

  return isOpen ? (
    <aside
      className={`max-w-[300px] h-[100svh] w-full p-8 justify-between flex flex-col ${
        theme === "light" ? "bg-white" : "bg-gray-500"
      }`}
    >
      <div className="flex flex-col gap-[54px]">
        <Image
          src={`/logo-${theme}.svg`}
          alt="logo"
          width={152}
          height={25}
          className="object-contain"
        />
        <AllBoards />
      </div>
      <div className="flex flex-col gap-6">
        <DarkMode />
        <Toggle toggleMenu={toggleMenu} />
      </div>
    </aside>
  ) : (
    <button
      onClick={() => toggleMenu()}
      className="fixed left-0 bottom-8 p-[18px] rounded-r-full bg-primary hover:bg-primary-foreground transition-colors duration-200"
    >
      <Image
        src={"/icon-show-sidebar.svg"}
        width={16}
        height={10.66}
        alt="show sidebar"
        className="object-contain"
      />
    </button>
  );
}
