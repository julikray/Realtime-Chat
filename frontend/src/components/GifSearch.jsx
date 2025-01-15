import React, { useState, useEffect, useRef } from "react";

const GifSearch = ({ onGifSelect }) => {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observer = useRef();

  const fetchGifs = async (newQuery = false) => {
    const apiKey = import.meta.env.VITE_GIPHY_API_KEY || "default_key";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=8&offset=${offset}`;

    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (newQuery) {
        setGifs(data.data);
      } else {
        setGifs((prevGifs) => [...prevGifs, ...data.data]);
      }

      setHasMore(data.data.length > 0); // Stop loading if no more GIFs
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchGifs(true);
    }
  }, [query]);

  useEffect(() => {
    if (offset > 0) {
      fetchGifs();
    }
  }, [offset]);

  const lastGifRef = (node) => {
    if (isLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset((prevOffset) => prevOffset + 8);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div className=" max-w-md mx-auto bg-[#2e2b33] text-white p-6 rounded-lg shadow-lg  ">
      {/* Search Box */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOffset(0); // Reset offset for new query
          }}
          placeholder="Find something fun"
          className="flex-grow px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => fetchGifs(true)}
          className="bg-[#8417ff] hover:bg-[#741bda] text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* GIF Results */}
      <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
        {gifs.map((gif, index) => (
          <div
            key={gif.id}
            ref={index === gifs.length - 1 ? lastGifRef : null} // Reference the last GIF
            className="bg-gray-700 rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => {
              onGifSelect(gif.images.fixed_height.url);
            }}
          >
            <img
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="w-full h-auto object-cover"
              style={{ height: "150px" }} // Ensure consistent size
            />
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
};

export default GifSearch;
