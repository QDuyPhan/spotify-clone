import React, { useEffect } from "react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  console.log({ albums });

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
        </div>
        <ScrollArea className={"h-[calc(100vh-300px)]"}>
          <div className="space-y-2">
            {/* {isLoading ? <PlaylistSkeleton /> : <ItemAlbums></ItemAlbums>} */}
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
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
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;

const ItemAlbums = () => {
  const images = import.meta.glob("/public/cover-images/*.jpg", {
    eager: true,
  });
  const imageUrls = Object.values(images).map((mod) => mod.default);

  return (
    <div className="">
      {imageUrls.map((url, index) => (
        <Link
          to={`/albums/${index}`}
          key={index}
          className="p-2 hover:bg-zinc-900 rounded-md flex items-center gap-3 group cursor-pointer"
        >
          <div key={index} className="flex items-center gap-4">
            <img
              src={url}
              alt={`Album ${index + 1}`}
              className="size-12 rounded-md flex-shrink-0 object-cover"
            />
            <div className="flex-1 min-w-0 hidden md:block">
              <p className="font-medium truncate">My Album {index + 1}</p>
              <p className="text-sm text-zinc-400 truncate">
                Album • Various Artist
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
