import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {

  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  //search movie in TMDB
  const searchMovieTMDB = async(movie) =>{
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie +"&include_adult=false&language=en-US&page=1", 
    API_OPTIONS);

    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    //console.log(searchText.current.value);
    //Make an API call to GPT API and get Movie Results

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query :" + searchText.current.value + ". only give me name of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    //console.log(gptResults.choices);
    if(!gptResults.choices){
      //error handling
    }
    //search funny indian retro movies, it will return below text in console
    //Andaz Apna Apna, Chupke Chupke, Amar Akbar Anthony, Dekh Bhai Dekh, Half Ticket
    //console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    //above gptMovies will give array of comma separated, [Andaz Apna Apna, Chupke Chupke, Amar Akbar Anthony, Dekh Bhai Dekh, Half Ticket]
    //for each movie we will search TMDB api

    const promiseArray = gptMovies.map((movie) =>searchMovieTMDB(movie));
    //above promiseArray will return 5 promises
    //[Promise,Promise,Promise,Promise,Promise]

    const tmdbResults = await Promise.all(promiseArray);
    //console.log(tmdbResults);

    dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));
  };

  return (
    <div className="pt-[60%] sm:pt-[15%] md:pt-10% flex justify-center">
      <form
        className="bg-black mt-16 w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="sm:p-4 sm:m-4 p-2 m-2 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="sm:py-2 py-1 sm:px-4 px-0 sm:m-4 m-2 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
