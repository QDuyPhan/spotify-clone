import React from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { HeartIcon, Clock, Pause, Play } from "lucide-react";

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const FavoriteSongsPage = () => {
  const { favoriteSongs, isLoading, error } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  const handlePlayAlbum = () => {
    if (!favoriteSongs.length) return;
    const isCurrentAlbumPlaying = favoriteSongs.some(
      (song) => song.id === currentSong?.id
    );
    if (isCurrentAlbumPlaying) togglePlay();
    else {
      playAlbum(favoriteSongs, 0);
    }
  };

  const handlePlaySong = (index) => {
    if (!favoriteSongs.length) return;
    playAlbum(favoriteSongs, index);
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        <div className="relative min-h-full">
          {/* bg gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-pink-600/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <div className="w-[240px] h-[240px] flex items-center justify-center bg-pink-600 rounded shadow-xl">
                <HeartIcon className="w-32 h-32 text-white" />
              </div>
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">Favorite Songs</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">Favorite</span>
                  <span>• {favoriteSongs.length} songs</span>
                </div>
              </div>
            </div>
            {/* play button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                {isPlaying && favoriteSongs.some((song) => song.id === currentSong?.id) ? (
                  <Pause className="h-7 w-7 text-black" />
                ) : (
                  <Play className="h-7 w-7 text-black" />
                )}
              </Button>
            </div>
            {/* Table Section */}
            <div className="bg-black/20 backdrop-blur-sm">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div className="px-6">
                <div className="space-y-2 py-4">
                  {favoriteSongs.map((song, index) => {
                    const isCurrentSong = currentSong?.id === song.id;
                    return (
                      <div
                        key={song.id}
                        onClick={() => handlePlaySong(index)}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
                      >
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <div className="size-4 text-green-500">♫</div>
                          ) : (
                            <span className="group-hover:hidden">{index + 1}</span>
                          )}
                          {!isCurrentSong && <Play className="h-4 w-4 hidden group-hover:block" />}
                        </div>
                        <div className="flex items-center gap-3">
                          <img
                            src={song.image_url}
                            alt={song.title}
                            className="size-10"
                          />
                          <div>
                            <div className="font-medium text-white">{song.title}</div>
                            <div>{song.artist}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {song.created_at?.split("T")[0]}
                        </div>
                        <div className="flex items-center">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                  {favoriteSongs.length === 0 && (
                    <div className="text-center text-zinc-400 py-8">No favorite songs yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FavoriteSongsPage; 