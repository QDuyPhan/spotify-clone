import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { Clock, Play } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  // const handlePlayAlbum = () => {
  // 	if (!currentAlbum) return;

  // 	const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);
  // 	if (isCurrentAlbumPlaying) togglePlay();
  // 	else {
  // 		// start playing the album from the beginning
  // 		playAlbum(currentAlbum?.songs, 0);
  // 	}
  // };

  console.log("albumId", albumId);
  console.log("currentAlbum", currentAlbum);
  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        {/* Main Content */}
        <div className="relative min-h-full">
          {/* bg gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />
          {/* Content */}
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <div className="flex p-6 gap-6 pb-8">
                <img
                  src={currentAlbum?.image_url}
                  alt={currentAlbum?.title}
                  className="w-[240px] h-[240px] shadow-xl rounded"
                />
                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium">Album</p>
                  <h1 className="text-7xl font-bold my-4">
                    {currentAlbum?.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-zinc-100">
                    <span className="font-medium text-white">
                      {currentAlbum?.artist}
                    </span>
                    <span>• {currentAlbum?.songs.length ?? 0} songs</span>
                    <span>• {currentAlbum?.release_year}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* play button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                // onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all"
              >
                {/* {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="h-7 w-7 text-black" />
                ) : (
                  <Play className="h-7 w-7 text-black" />
                )} */}
                <Play className="h-7 w-7 text-black" />
              </Button>
            </div>

            {/* Table Section */}
            <div className="bg-black/20 backdrop-blur-sm"></div>
            {/* table header */}
            <div
              className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
            text-zinc-400 border-b border-white/5"
            >
              <div>#</div>
              <div>Title</div>
              <div>Released Date</div>
              <div>
                <Clock className="h-4 w-4" />
              </div>
            </div>
            {/* songs list */}
            <div className="px-6">
              <div className="space-y-2 py-4">
                <div className="flex items-center justify-center"></div>
                {currentAlbum?.songs.map((song, index) => {
                  {
                    /* const isCurrentSong = currentSong?._id === song._id; */
                  }

                  return (
                    <div
                      key={song.id}
                      // onClick={() => handlePlaySong(index)}
                      className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
                    >
                      <div className="flex items-center justify-center">
                        {/* {isCurrentSong ? (
                          <div className="size-4 text-green-500">♫</div>
                        ) : (
                          <span className="group-hover:hidden">
                            {index + 1}
                          </span>
                        )}
                        {!isCurrentSong && (
                          <Play className="h-4 w-4 hidden group-hover:block" />
                        )} */}
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={song.image_url}
                          alt={song.title}
                          className="size-10"
                        />

                        <div>
                          <div className={`font-medium text-white`}>
                            {song.title}
                          </div>
                          <div>{song.artist}</div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {song.created_at.split("T")[0]}
                      </div>
                      <div className="flex items-center">
                        {formatDuration(song.duration)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;

export const ItemSong = () => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={"https://i.scdn.co/image/ab67616d0000485174098980262cc5adf177c630"}
        className="size-10"
      />

      <div>
        <div className={`font-medium text-white`}>Simp Gái 808</div>
        <div>Low G</div>
      </div>
    </div>
  );
};
