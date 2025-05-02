import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AudioLines, Calendar, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const AddSongDialog = () => {
  const { albums, songs, fetchSongs } = useMusicStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchValueSong, setSearchValueSong] = useState("");
  const [searchValueAlbum, setSearchValueAlbum] = useState("");

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchValueSong.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchValueSong.toLowerCase())
  );
  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchValueAlbum.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchValueAlbum.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!selectedSongId || !selectedAlbumId) {
      toast.error("Please select both a song and an album");
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post("/songs/user-albums/add-song/", {
        song_id: selectedSongId,
        album_id: selectedAlbumId,
      });

      toast.success("Song added to your album!");
      setDialogOpen(false);
      setSelectedSongId("");
      setSelectedAlbumId("");
    } catch (error) {
      toast.error("Failed to add song: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 text-sm font-medium shadow-none">
          <Plus className="w-4 h-4" />
          <AudioLines />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border border-zinc-700 min-w-[90vw] w-full">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-white text-xl">
            Add Song to Your Album
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Click a song and an album to add the song to it.
          </DialogDescription>
        </DialogHeader>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Songs Section */}
          <div className="min-w-[400px]">
            <h3 className="text-white font-semibold mb-2">Songs</h3>
            <Input
              type="text"
              placeholder="Search songs..."
              className="mb-3 bg-zinc-800 border-zinc-700 text-white"
              value={searchValueSong}
              onChange={(e) => setSearchValueSong(e.target.value)}
            />
            <ScrollArea className="h-[350px] rounded-md border border-zinc-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-zinc-800">
                  <TableRow>
                    <TableHead className="w-[50px]"> </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Release</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSongs.map((song) => {
                    const isSelected = selectedSongId === song.id;
                    return (
                      <TableRow
                        key={song.id}
                        onClick={() => setSelectedSongId(song.id)}
                        className={`hover:bg-zinc-800 cursor-pointer ${
                          isSelected ? "bg-emerald-900/50" : ""
                        }`}
                      >
                        <TableCell>
                          <img
                            src={song.image_url}
                            alt={song.title}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="text-white font-medium">
                          {song.title}
                        </TableCell>
                        <TableCell className="text-zinc-300 truncate">
                          {song.artist}
                        </TableCell>
                        <TableCell className="text-zinc-400 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {song.created_at?.split("T")[0]}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* Albums Section */}
          <div className="min-w-[400px]">
            <h3 className="text-white font-semibold mb-2">Albums</h3>
            <Input
              type="text"
              placeholder="Search albums..."
              className="mb-3 bg-zinc-800 border-zinc-700 text-white"
              value={searchValueAlbum}
              onChange={(e) => setSearchValueAlbum(e.target.value)}
            />
            <ScrollArea className="h-[350px] rounded-md border border-zinc-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-zinc-800">
                  <TableRow>
                    <TableHead className="w-[50px]"> </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlbums.map((album) => {
                    const isSelected = selectedAlbumId === album.id;
                    return (
                      <TableRow
                        key={album.id}
                        onClick={() => setSelectedAlbumId(album.id)}
                        className={`hover:bg-zinc-800 cursor-pointer ${
                          isSelected ? "bg-emerald-900/50" : ""
                        }`}
                      >
                        <TableCell>
                          <img
                            src={album.image_url}
                            alt={album.title}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="text-white font-medium">
                          {album.title}
                        </TableCell>
                        <TableCell className="text-zinc-300 truncate">
                          {album.artist}
                        </TableCell>
                        <TableCell className="text-zinc-400 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {album.release_year}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => setDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !selectedSongId || !selectedAlbumId}
          >
            {isLoading ? "Adding..." : "Add to Album"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
