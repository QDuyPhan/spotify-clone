import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

export function CreateMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 text-sm font-medium">
          <Plus className="w-4 h-4" />
          Create
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-zinc-900 border border-zinc-700 text-white w-56">
        <DropdownMenuItem
          className="cursor-pointer hover:bg-zinc-800"
          onClick={() => document.getElementById("add-album-btn")?.click()}
        >
          Add Album
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-zinc-800"
          onClick={() => document.getElementById("add-song-btn")?.click()}
        >
          Add Song
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
