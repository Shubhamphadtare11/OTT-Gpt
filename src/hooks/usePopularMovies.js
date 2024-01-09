import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

//fetch data from TMDB API and update store
 const usePopularMovies = () =>{

    const dispatch = useDispatch();

    const popularMovies = useSelector(store=> store.movies.popularMovies);

    const getPopularMovies = async() => {
       const data1 = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
       const json1 = await data1.json();
       //console.log(json.results);
       dispatch(addPopularMovies(json1?.results));
    };
   
    useEffect(() =>{
      if(!popularMovies) getPopularMovies();
    },[]);
 };

 export default usePopularMovies;

