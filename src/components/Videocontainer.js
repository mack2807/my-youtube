import React, { useEffect, useState, useMemo } from 'react';
import { YOUTUBE_VIDEO_API } from '../utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Videocontainer = () => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch()
  const themeChanger = useSelector(store=>store.theme.isDark)
  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_API);
    const responseJson = await data.json();
    console.log(responseJson.items);
    setVideos(responseJson.items)
    } catch (error) {
      console.log(error.message)
    }
  };



  useEffect(() => {
    console.log("chekcing logging two times for asyn function inside consle.log")
    getVideos();
    
  }, []);

  return (
    <div className={`flex flex-wrap mt-36 ml-24 ${themeChanger?'bg-black':''}`} >
      
      {videos?.length !== 0 && (
        videos?.map((video) => (
          <Link key={video?.id} to={'/watch?v=' + video?.id}>
            <VideoCard info={video} />
          </Link>
        ))
      ) }
    </div>
  );
};

export default Videocontainer;
