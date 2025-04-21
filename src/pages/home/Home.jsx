import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import React, { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";

const Home = () => {
  const {
    fetchFeaturedSongs, // <-- sửa lại đúng tên hàm
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featureSongs,
    trendingSongs,
    error,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  // console.log(madeForYouSongs, trendingSongs, featureSongs, isLoading);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <div className="rounded-md overflow-hidden">
        <Topbar></Topbar>
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">
              Good afternoon
            </h1>
            <FeaturedSection></FeaturedSection>
            <div className="space-y-8">
              <SectionGrid title={"Made For You"} songs={madeForYouSongs} />
              <SectionGrid title={"Trending"} songs={trendingSongs} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </main>
  );
};

export default Home;
