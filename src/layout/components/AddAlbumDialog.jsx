import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Album, Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

/**
 * @component
 * @returns {JSX.Element}
 */
const AddAlbumDialog = () => {
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /** @type {React.MutableRefObject<HTMLInputElement | null>} */
  const fileInputRef = useRef(null);

  /**
   * @typedef {{ title: string, artist: string, releaseYear: number }} NewAlbum
   * @type {[NewAlbum, React.Dispatch<React.SetStateAction<NewAlbum>>]}
   */
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
  });

  /** @type {[File | null, React.Dispatch<React.SetStateAction<File | null>>]} */
  const [imageFile, setImageFile] = useState(null);

  /**
   * Handles selecting an image file for the album artwork.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the file input.
   */
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  /**
   * Submits the form data to the backend to create a new album.
   * Validates required fields and uploads image file and metadata.
   * Displays success or error messages using toast notifications.
   */
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!imageFile) {
        return toast.error("Please upload an image");
      }

      const formData = new FormData();
      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("release_year", newAlbum.releaseYear.toString());
      formData.append("imageFile", imageFile);

      await axiosInstance.post("albums/user/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewAlbum({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
      });
      setImageFile(null);
      setAlbumDialogOpen(false);
      toast.success("Album created successfully");
    } catch (error) {
      toast.error("Failed to create album: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 text-sm font-medium shadow-none">
          <Plus className="w-4 h-4" />
          <Album />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle>Add New Album</DialogTitle>
          <DialogDescription>
            Add a new album to your collection
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                <Upload className="h-6 w-6 text-zinc-400" />
              </div>
              <div className="text-sm text-zinc-400 mb-2">
                {imageFile ? imageFile.name : "Upload album artwork"}
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Choose File
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Album Title</label>
            <Input
              value={newAlbum.title}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, title: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter album title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              value={newAlbum.artist}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, artist: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter artist name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Release Year</label>
            <Input
              type="number"
              value={newAlbum.releaseYear}
              onChange={(e) =>
                setNewAlbum({
                  ...newAlbum,
                  releaseYear: parseInt(e.target.value),
                })
              }
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter release year"
              min={1900}
              max={new Date().getFullYear()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setAlbumDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-violet-500 hover:bg-violet-600"
            disabled={
              isLoading || !imageFile || !newAlbum.title || !newAlbum.artist
            }
          >
            {isLoading ? "Creating..." : "Add Album"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbumDialog;
