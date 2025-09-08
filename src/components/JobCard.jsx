import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
// import JobCard from "./JobCard";


const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-6 shadow rounded hover:shadow-lg transition-all duration-200 bg-white flex flex-col justify-between h-full">
      <div className="flex justify-between items-center gap-4 mb-4">
        <img
          className="h-8 w-8 object-contain"
          src={assets.company_icon}
          alt="company logo"
        />
      </div>
      <h4 className="font-semibold text-xl mt-2 text-gray-900 leading-snug line-clamp-2">
        {job.title}
      </h4>

      <div className="flex items-center gap-3 mt-2 text-xs">
        <span className="text-xs text-gray-900 border border-red-200 bg-red-50 px-2 py-1 rounded-full">
          {job.location}
        </span>

        <span className="text-xs text-gray-900 border border-blue-200 bg-blue-50 px-2 py-1 rounded-full">
          {job.level}
        </span>
      </div>
      <p
        className="text-gray-500 text-sm mt-4 leading-relaxed line-clamp-3"
        dangerouslySetInnerHTML={{
          __html: job.description.slice(0, 150) + "....",
        }}
      ></p>
      <div>
        <div className="mt-6 flex gap-4 text-sm">
          <button
            onClick={() => {
              navigate(`/apply-job/${job._id}`);
              scrollTo(0, 0);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Apply now
          </button>
          <button
            onClick={() => {
              navigate(`/apply-job/${job._id}`);
              scrollTo(0, 0);
            }}
            className="text-blue-600  hover:underline font-medium px-1 py-2"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
