"use client";

import Image from "next/image";
import AllBoards from "./AllBoards";
import DarkMode from "./DarkMode";
import { useMenuStore, useThemeStore } from "@/store";
import useStore from "@/store/useStore";
import Toggle from "./Toggle";
import { motion as m } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function NavBar() {
  const theme = useStore(useThemeStore, (state) => state.theme);
  const isOpen = useStore(useMenuStore, (state) => state.isOpen);
  const toggleMenu = useMenuStore((state) => state.toggleMenu);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <m.aside
            initial={{ x: "-100%" }}
            animate={{ x: "0%", transition: { delay: 0.2, type: "tween" } }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.2 }}
            className={`w-[300px] h-[100svh] p-8 justify-between flex flex-col border-r ${
              theme === "light"
                ? "bg-white border-r-gray-200"
                : "bg-gray-500 border-r-gray-400"
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
            <div className="flex flex-col gap-2">
              <DarkMode />
              <Toggle toggleMenu={toggleMenu} />
            </div>
          </m.aside>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isOpen && (
          <m.button
            initial={{ x: "-100%" }}
            animate={{ x: "0%", transition: { delay: 0.2, type: "tween" } }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.2 }}
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
          </m.button>
        )}
      </AnimatePresence>
    </>
  );
}
