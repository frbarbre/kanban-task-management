import Image from "next/image";
import { Switch } from "./ui/switch";
import useStore from "@/store/useStore";
import { useThemeStore } from "@/store";
export default function DarkMode() {
  const theme = useStore(useThemeStore, (state) => state.theme);
  const changeTheme = useThemeStore((state) => state.changeTheme);

  return (
    <div
      className={`${theme === "light" ? "bg-gray-100" : "bg-gray-600"} rounded-md`}
    >
      <div className={`flex gap-6 w-max mx-auto items-center py-4`}>
        <Image
          src="/icon-light-theme.svg"
          alt="board"
          width={20}
          height={20}
          className="object-contain"
        />
        <Switch
          checked={theme === "light" ? false : true}
          onClick={() => {
            changeTheme();
          }}
          className="bg-primary data-[state=unchecked]:bg-primary"
        />
        <Image
          src="/icon-dark-theme.svg"
          alt="board"
          width={20}
          height={20}
          className="object-contain"
        />
      </div>
    </div>
  );
}
