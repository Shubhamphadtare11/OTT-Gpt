const VideoTitle = ({title, overview}) => {
    return(
        <div className="w-[98vw] aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">{title}</h1>
            <p className="hidden lg:inline-block py-6 text-lg md:w-3/4 lg:w-2/4">{overview}</p>
            <div className="my-4 md:m-0">
                <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-80">▶️ Play</button>
                <button className="hidden md:inline-block bg-gray-500 text-white p-4 px-12 mx-2 text-xl bg-opacity-50 rounded-lg">ℹ️ More Info</button>
            </div>
        </div>
    );
};

export default VideoTitle;