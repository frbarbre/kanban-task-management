import { useThemeStore } from "@/store";
import useStore from "@/store/useStore";
import { motion as m } from "framer-motion";

interface ModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export default function Modal({ setIsModalOpen, children }: ModalProps) {
  const theme = useStore(useThemeStore, (state) => state.theme);
  return (
    <div className="fixed w-[100svw] h-[100svh] top-0 left-0 flex items-center justify-center">
      <m.div
        initial={{ opacity: 0, scale: 0, transformOrigin: "center" }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-500"
        } w-[500px] rounded-[6px] p-8 z-20 relative`}
      >
        {children}
      </m.div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black/50 inset-0 fixed w-[100svw]"
        onClick={() => setIsModalOpen(false)}
      />
    </div>
  );
}
