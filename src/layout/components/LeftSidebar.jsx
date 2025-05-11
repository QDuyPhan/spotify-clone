import React, { useEffect, useState } from "react";
import { HomeIcon, Library, MessageCircle, Plus, HeartIcon, ArrowUp, ArrowUpDown, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import AddAlbumDialog from "./AddAlbumDialog";
import AddSongDialog from "./AddSongDialog";
import { CreateMenu } from "./CreateMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PlayButton from "@/pages/home/components/PlayButton";

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading, fetchMyAlbums, myAlbums, favoriteSongs, fetchFavoriteSongs } =
    useMusicStore();
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchAlbums();
    fetchMyAlbums();
    fetchFavoriteSongs();
  }, [fetchAlbums, fetchMyAlbums, fetchFavoriteSongs]);

  // console.log("myAlbums: ", myAlbums);
  // console.log("favoriteSongs: ", favoriteSongs);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* navigation meu */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
            to={"/"}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <SignedIn>
            <Link
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
              to={"/chat"}
            >
              <MessageCircle className="mr-2 size-5" />
              <span className="hidden md:inline">Message</span>
            </Link>
          </SignedIn>
        </div>
      </div>
      {/* left section */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Playlists</span>
          </div>
          <SignedIn>
            <AddAlbumDialog />
            <AddSongDialog />
          </SignedIn>
        </div>
        <SignedIn>
          <ScrollArea className={"h-[calc(100vh-300px)]"}>
            <div className="space-y-2">
              {isLoading ? (
                <PlaylistSkeleton />
              ) : (
                <>
                  {/* Favorite Songs as a special album */}
                  {favoriteSongs.length > 0 && (
                    <Link
                      to="/albums/favorites"
                      className="p-2 hover:bg-zinc-900 rounded-md flex items-center gap-3 group cursor-pointer"
                    >
                      <HeartIcon className="size-12 rounded-md flex-shrink-0 object-cover bg-pink-600 p-2 text-white" />
                      <div className="flex-1 min-w-0 hidden md:block">
                        <p className="font-medium truncate">Favorite Songs</p>
                        <p className="text-sm text-zinc-400 truncate">
                          Favorite Songs
                        </p>
                      </div>
                    </Link>
                  )}
                  {/* Render user albums */}
                  {myAlbums.map((album) => (
                    <Link
                      to={`/albums/${album.id}`}
                      key={album.id}
                      className="p-2 hover:bg-zinc-900 rounded-md flex items-center gap-3 group cursor-pointer"
                    >
                      <img
                        src={album.image_url}
                        alt="Playlist img"
                        className="size-12 rounded-md flex-shrink-0 object-cover"
                      />
                      <div className="flex-1 min-w-0 hidden md:block">
                        <p className="font-medium truncate">{album.title}</p>
                        <p className="text-sm text-zinc-400 truncate">
                          Album • {album.artist}
                        </p>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </SignedIn>
      </div>
    </div>
  );
};

export default LeftSidebar;
