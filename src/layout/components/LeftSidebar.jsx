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

  console.log("myAlbums: ", myAlbums);
  console.log("favoriteSongs: ", favoriteSongs);

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

                  {/* Favorite Songs Section with toggle */}
                  {favoriteSongs.length > 0 && (
                    <div className="mt-6">
                      <button
                        className="flex items-center text-white px-2 mb-2 w-full focus:outline-none"
                        onClick={() => setShowFavorites((prev) => !prev)}
                      >
                        <HeartIcon className="size-5 mr-2" />
                        <span className="hidden md:inline">Favorite Songs</span>
                        <span className="ml-auto text-xs text-zinc-400">
                          {showFavorites ? <ArrowUp size={16}/> : <ArrowDown size={16}/>}
                        </span>
                      </button>
                      {showFavorites && (
                        <div className="space-y-2">
                          {favoriteSongs.map((song) => (
                            <div
                              key={song.id}
                              className="p-2 hover:bg-zinc-900 rounded-md flex items-center gap-3 group cursor-pointer relative"
                            >
                              <img
                                src={song.image_url}
                                alt={song.title}
                                className="size-10 rounded-md flex-shrink-0 object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{song.title}</p>
                                <p className="text-sm text-zinc-400 truncate">
                                  {song.artist}
                                </p>
                              </div>
                              <PlayButton song={song} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
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
