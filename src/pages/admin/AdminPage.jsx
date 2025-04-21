import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";
import React, { useEffect } from "react";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs } from "@/components/ui/tabs";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();

  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  // if (!isAdmin && !isLoading) return <div>Unauthorized</div>;
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8"
    >
      <Header />
      <DashboardStats />
      <Tabs />
    </div>
  );
};

export default AdminPage;
