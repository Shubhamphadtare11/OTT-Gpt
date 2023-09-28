import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import {API_OPTIONS} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";


const useMovieTrailer = (movieId) =>{

    const dispatch = useDispatch();

    const trailerVideo = useSelector(store=> store.movies.trailerVideo);
    
    //fetch trailer video && updating the store with trailer video data

    const getMovieVideos = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_OPTIONS)
        const json = await data.json();
        //console.log(json);

        const filterData = json.results.filter((video) => video.type === "Trailer");
        //if no trailer present for that ternary operator
        const trailer = filterData.length ? filterData[0] : json.results[0];
        //console.log(trailer);
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(()=>{
        if(!trailerVideo) getMovieVideos();
    },[])

}

export default useMovieTrailer;