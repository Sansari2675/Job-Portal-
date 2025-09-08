import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import AppContext from "../context/AppContext";

const Hero = () => {

    const {setSearchFilter, setIsSearched} = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    
    const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);

    }
    
  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
        text-white py-10 px-6 text-center mx-2 rounded-2xl 
        hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600
        transition-all duration-300 shadow-lg hover:shadow-xl">

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
          Over <span className="text-white">10,000+</span> jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Career Journey Begins Here - Let’s Take The First Step Together!
        </p>
        <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="Search Icon" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={titleRef}
            />
          </div>
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.location_icon} alt="Location Icon" />
            <input
              type="text"
              placeholder="Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={locationRef}
            />
          </div>
          <button
            type="button" onClick={onSearch}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
              text-white px-6 py-2 rounded-full m-1 
              hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600
              transition-all duration-300 shadow-md hover:shadow-lg 
              font-semibold tracking-wide"
          >
            Search
          </button>
        </div>
      </div>
      <div className="border border-gray-300 shadow-sm mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted by</p>
          <img className="h-6" src={assets.microsoft_logo} alt="Company 1" />
          <img className="h-6" src={assets.walmart_logo} alt="Company 2" />
          <img className="h-6" src={assets.accenture_logo} alt="Company 3" />
          <img className="h-6" src={assets.samsung_logo} alt="Company 4" />
          <img className="h-6" src={assets.amazon_logo} alt="Company 5" />
          <img className="h-6" src={assets.adobe_logo} alt="Company 6" />
        </div>
    </div>
    </div>
  );
}
export default Hero;
