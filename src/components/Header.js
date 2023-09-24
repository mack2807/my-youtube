import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {toggleMenu} from '../utils/appSlice.js'
import { YOUTUBE_SEARCH_API } from '../utils/constants.js'
import { cachedResults,searchSuggestion } from '../utils/searchSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { changeTheme } from '../utils/themeSlice.js'



const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const suggestion = useSelector((store) => store.search.clickedSuggestion);
  const [searchQuery,setSearchQuery] = useState("")
  const [suggestions,setSuggestions] = useState([])
  const [inputValue,setInputValue] = useState("")
  
  const searchCache = useSelector(store=>store.search.cachedSuggestions)
  const themeChanger = useSelector(store=>store.theme.isDark)

  

  useEffect(()=>{
    //debouncing using useffect and settimeout in react also highly optimized search using cache it will not make api calls for
    // those search queries which already made api calls
   const timer = setTimeout(()=>{
   if (searchCache?.[searchQuery]){
    setSuggestions(searchCache[searchQuery])
   }
   else{
    getSearchSuggestions()
   }
  },200)
    return ()=>{
      clearTimeout(timer)
    }
  
  },[searchQuery])


  const suggestionOnclick = (clickedSuggestion) =>{
    dispatch(searchSuggestion(clickedSuggestion))
    setInputValue(clickedSuggestion)
    setSuggestions('')
    setSearchQuery('')
   
    
  }
 
  

  const getSearchSuggestions = async () => {
  
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
    const response = await data.json()
    setSuggestions(response[1])
    dispatch(cachedResults({
     searchQuery:searchQuery,
     response:response[1]
    }))
    } catch (error) {
      console.log(error.message)
    }
    
  }

  const handleToggleMenu = () =>{
     dispatch(toggleMenu())
  }
  return (
<div className={`grid grid-flow-col p-5 z-10 fixed w-full ${themeChanger ? 'bg-black text-white' : 'bg-white'}`}>
      <div className='flex col-span-1'>
        <img onClick={()=>{
          handleToggleMenu()
          }} className={!themeChanger?'h-8 cursor-pointer':"mb-2 h-8 w-16 -ml-2 cursor-pointer"} src={!themeChanger?"https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-5.png":"https://www.atulhost.com/wp-content/uploads/2023/01/animated-hamburger-menu-icon-300x169.png"} alt="menu" />
        <img className='h-12 mx-10 -my-1 absolute' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK0joG-qM5mvn1XZ-udwSlceKM8eVlj68x0A&usqp=CAU" alt="yotube logo" />
      </div>
      <div className='mx-80 col-span-10 w-3/4 justify-center'>
        <div >
        <input typeof='text' value={inputValue} onChange={(e)=>{
              setSearchQuery(e.target.value)
              setInputValue(e.target.value)
              // dispatch(searchSuggestion(searchQuery))
        }} className={`w-1/2 h-10 border ${!themeChanger? 'border-gray-400':'border-gray-600 bg-gray-800'} rounded-l-full  pl-5`} type="text" />
        <button className={`px-5 h-10 absolute  border ${!themeChanger? 'border-gray-400 rounded-r-full bg-gray-100':'border-gray-700 rounded-r-full bg-gray-900'}`}><img className='h-6' src={!themeChanger?
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9InBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsiPjxwYXRoIGQ9Im0yMC44NyAyMC4xNy01LjU5LTUuNTlDMTYuMzUgMTMuMzUgMTcgMTEuNzUgMTcgMTBjMC0zLjg3LTMuMTMtNy03LTdzLTcgMy4xMy03IDcgMy4xMyA3IDcgN2MxLjc1IDAgMy4zNS0uNjUgNC41OC0xLjcxbDUuNTkgNS41OS43LS43MXpNMTAgMTZjLTMuMzEgMC02LTIuNjktNi02czIuNjktNiA2LTYgNiAyLjY5IDYgNi0yLjY5IDYtNiA2eiIvPjwvc3ZnPg=="
      :'https://www.citypng.com/public/uploads/preview/search-explore-white-icon-transparent-png-31634946340qymsafkpk6.png?v=2023082801'} alt="" /></button>
        </div>
        {suggestions.length!==0 && searchQuery?.length!==0 ? (<div className='mt-2 fixed bg-white shadow-xl  z-50  py-2  rounded-2xl w-[31rem]' >
          <ul>
           {suggestions.map(s=> <Link to={'/results?search_query='+s.replace(/\s+/g, '+')}> <li key={s} onClick={()=>suggestionOnclick(s)} className='py-2 cursor-pointer font-semibold px-5 hover:bg-gray-100 flex ' ><img className='h-5 mt-1' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTAwJSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxMDAlIj48dXNlIGNsYXNzPSJ5dHAtc3ZnLXNoYWRvdyIgeG1sbnM6bnMxPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBuczE6aHJlZj0iI3l0cC1pZC0yNyIvPjxwYXRoIGNsYXNzPSJ5dHAtc3ZnLWZpbGwiIGQ9Ik0yMC44NywyMC4xN2wtNS41OS01LjU5QzE2LjM1LDEzLjM1LDE3LDExLjc1LDE3LDEwYzAtMy44Ny0zLjEzLTctNy03cy03LDMuMTMtNyw3czMuMTMsNyw3LDdjMS43NSwwLDMuMzUtMC42NSw0LjU4LTEuNzEgbDUuNTksNS41OUwyMC44NywyMC4xN3ogTTEwLDE2Yy0zLjMxLDAtNi0yLjY5LTYtNnMyLjY5LTYsNi02czYsMi42OSw2LDZTMTMuMzEsMTYsMTAsMTZ6IiBpZD0ieXRwLWlkLTI3Ii8+PC9zdmc+" alt="" />
           <span className='ml-2'>{s}</span></li></Link>
)}
          </ul>
        </div>):""}
      </div>
      <div>
        <button className='' onClick={()=>{
          dispatch(changeTheme())
        }}>
          <img className='w-8 h-8 rounded-full' src="https://uploads.commoninja.com/searchengine/wordpress/wp-dark-mode.gif" alt="" />
        </button>
      </div>

      <div className='col-span-1'>
        <img className='h-8 rounded-full' src="https://lh3.googleusercontent.com/ogw/AKPQZvzx3a1sANoAMPkzWDYEeFrMEndzOhAvHOctAQILNw=s64-c-mo" alt="user icon" />
      </div>
    </div>
  )
}

export default Header
