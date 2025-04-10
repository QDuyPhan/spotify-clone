import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import React, { useEffect } from "react";

const Home = () => {
  // const {
  //   fetchFeatureSongs,
  //   fetchMadeForYouSongs,
  //   fetchTrendingSongs,
  //   isLoading,
  //   madeForYouSongs,
  //   featureSongs,
  //   trendingSongs,
  //   error,
  // } = useMusicStore();

  // useEffect(() => {
  //   fetchFeatureSongs();
  //   fetchMadeForYouSongs();
  //   fetchTrendingSongs();
  // }, [fetchFeatureSongs, fetchMadeForYouSongs, fetchTrendingSongs]);
  // console.log(madeForYouSongs, trendingSongs, featureSongs, isLoading);

  return (
    <div className="rounded-md overflow-hidden">
      <Topbar></Topbar>
      {/* <FeaturedSection></FeaturedSection> */}
    </div>
  );
};

export default Home;
