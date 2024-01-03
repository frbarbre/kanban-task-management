import Image from "next/image";

export default function Toggle({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <button
      onClick={toggleMenu}
      className="text-gray-300 font-bold text-[15px] flex items-center"
    >
      <Image
        src="icon-hide-sidebar.svg"
        alt="hide-sidebar"
        width={18}
        height={16}
        className="object-contain mr-4"
      />
      Hide Sidebar
    </button>
  );
}
