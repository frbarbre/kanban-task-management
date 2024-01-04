import { useThemeStore } from "@/store";
import useStore from "@/store/useStore";
import { AnimatePresence, motion as m } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Toggle({ toggleMenu }: { toggleMenu: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useStore(useThemeStore, (state) => state.theme);
  return (
    <button
      onClick={toggleMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-gray-300 font-bold text-[15px] flex items-center relative hover:text-primary transition-colors h-[48px]"
    >
      <Image
        src={`icon-hide-sidebar${isHovered ? "-hovered" : ""}.svg`}
        alt="hide-sidebar"
        width={18}
        height={16}
        className="object-contain mr-4"
      />
      Hide Sidebar
      <AnimatePresence>
        {isHovered && (
          <m.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.2, type: "tween" }}
            className={`${
              theme === "light" ? "bg-gray-100" : "bg-white"
            } absolute right-0 rounded-r-full h-[48px] -left-8 z-[-1]`}
          />
        )}
      </AnimatePresence>
    </button>
  );
}
