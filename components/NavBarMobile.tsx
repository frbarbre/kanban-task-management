"use client";

import AllBoards from "./AllBoards";
import DarkMode from "./DarkMode";

export default function NavBar() {
  return (
    <div>
      <AllBoards />
      <div className="flex flex-col gap-2 mt-4">
        <DarkMode />
      </div>
    </div>
  );
}
