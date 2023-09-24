import React from 'react'
import { useSelector } from 'react-redux';
import { getTimeAgo } from '../helpers/timeAgo';
import { formatViewCount } from '../helpers/viewCount';

const VideoCard = ({info}) => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const themeChanger = useSelector(store=>store.theme.isDark)
        const {snippet,statistics} = info
    const {channelTitle,title,thumbnails} = snippet
  
  return (
    <div className={`p-1   ${isMenuOpen ? 'w-[600px] max-w-full -mx-20 m-4' : 'w-[495px] max-w-full -mx-14 m-6'}`}>
        <img className='rounded-lg w-full ' src={thumbnails?.medium?.url} alt="thumbnail" />
        <ul>
          <div className='flex  mt-2'>
          <img className='w-2 h-2  rounded-full' src={snippet?.thumbnails?.medium?.url} alt="" />
            <div className='ml-3'>
            <li className={`text-sm font-bold ${themeChanger?'text-white':''} `} >{title}</li>
            <li className=' text-gray-500 font-semibold'>{channelTitle}</li>
            <div className='flex text-gray-500 font-semibold'>
            <li>{formatViewCount(statistics?.viewCount)}</li>
            <li className='ml-3'>{getTimeAgo(snippet?.publishedAt)}</li>

            </div>
            <li></li>
            </div>
          </div>
           
            
        </ul>
      
    </div>
  )
}


export default VideoCard


