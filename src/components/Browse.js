// import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies"
import GptSearch from "./GptSearch";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const Browse = () =>{

    const showGptSearch = useSelector(store => store.gpt.showGptSearch)

    
    useNowPlayingMovies();
    usePopularMovies();

    const useUpcomingMovies = () =>{

        const dispatch = useDispatch();
    
        const upcomingMovies = useSelector(store=> store.movies.upcomingMovies);
    
        const getUpcomingMovies = async() => {
           const data1 = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
           const json1 = await data1.json();
           //console.log(json.results);
           dispatch(addUpcomingMovies(json1?.results));
        };
       
        useEffect(() =>{
          if(!upcomingMovies) getUpcomingMovies();
        },[]);
     };
  
     useUpcomingMovies();

    return(
        <div>
                 {/*
            Main Container
                - VideoBackground
                - VideoTitle
            Secondary Container
                - MovieList * n
                    - cards * n
            */}
            <Header/>
       {
       showGptSearch ? (<GptSearch/>) : (
       <>
         <MainContainer/>
            <SecondaryContainer/>
       </>
       )}
        </div>
    );
};

export default Browse;