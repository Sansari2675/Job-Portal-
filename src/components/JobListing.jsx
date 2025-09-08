import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs || []);

  // Toggle Category Selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Toggle Location Selection
  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  // Filter Jobs Whenever Dependencies Change
  useEffect(() => {
    const norm = (s) => (s || "").toString().toLowerCase();

    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (cat) => norm(cat) === norm(job.category || job.Category)
      );

    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.some((loc) => norm(loc) === norm(job.location));

    const matchesTitle = (job) =>
      !searchFilter?.title ||
      norm(job.title).includes(norm(searchFilter.title));

    const matchesSearchLocation = (job) =>
      !searchFilter?.location ||
      norm(job.location).includes(norm(searchFilter.location));

    const newFilteredJobs = (jobs || [])
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  // Pagination
  const jobsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col md:flex-row lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 lg:w-1/4 bg-white p-4">
        {/* Current Search Filters */}
        {isSearched && (searchFilter?.title || searchFilter?.location) && (
          <>
            <h3 className="font-medium text-lg mb-4">Current Search</h3>
            <div className="mb-4 text-gray-600 flex flex-wrap gap-2">
              {searchFilter?.title && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full text-blue-950">
                  {searchFilter.title}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, title: "" }))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt="remove"
                  />
                </span>
              )}
              {searchFilter?.location && (
                <span className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded-full text-blue-950">
                  {searchFilter.location}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, location: "" }))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt="remove"
                  />
                </span>
              )}
            </div>
          </>
        )}

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-6 py-2 rounded-full border border-gray-400 lg:hidden mb-4"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* Category Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 ml-2 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125 accent-blue-700"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">
            Search by Locations
          </h4>
          <ul className="space-y-4 ml-2 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125 accent-blue-700"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8">Get Your Dream Job From Top Companies</p>

        {/* Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.length > 0 ? (
            currentJobs.map((job, index) => (
              <JobCard key={job.id ?? index} job={job} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No jobs found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 gap-3 mt-10">
            {/* Prev */}
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                src={assets.left_arrow_icon}
                alt="prev"
                className="cursor-pointer"
              />
            </a>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <a key={index} href="#job-list">
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-600 rounded transition-all ${
                    currentPage === index + 1
                      ? "bg-blue-100 text-blue-500"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              </a>
            ))}

            {/* Next */}
            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                src={assets.right_arrow_icon}
                alt="next"
                className="cursor-pointer"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
