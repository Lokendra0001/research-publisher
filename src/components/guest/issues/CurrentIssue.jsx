"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { constant } from "@/utils/constant";
import { notify } from "@/utils/toast";

import PaperCard from "@/components/paper/PaperCard";
import Pagination from "@/components/common/Pagination";

const CurrentIssue = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { volume, issue, papers = [] } = data || {};

  // Pagination logic
  const totalPages = Math.ceil(papers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPapers = papers.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchCurrentIssue = async () => {
      try {
        const res = await axios.get(
          `${constant.SERVER_URL}public/current-issue`,
        );
        if (res.data.status) {
          setData(res.data.data);
        } else {
          notify.error(res.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("No current issue found");
        } else {
          notify.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentIssue();
  }, []);

  if (loading) {
    return (
      <div className="bg-primary-foreground py-10 min-h-screen">
        <div className="w-full">
          <div className="space-y-6 animate-pulse w-full">
            <div className="h-6 bg-border rounded w-1/5"></div>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="border border-border bg-gray-50 rounded-md overflow-hidden shadow-sm"
              >
                <div className="p-4 border-b border-border">
                  <div className="h-6 bg-border rounded w-3/4"></div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex gap-2 items-center">
                    <div className="h-4 bg-border rounded w-20"></div>
                    <div className="h-4 bg-border rounded w-1/3"></div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="h-4 bg-border rounded w-32"></div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="h-4 bg-border rounded w-40"></div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-2">
                    <div className="h-8 bg-border  rounded w-24"></div>
                    <div className="h-8 bg-border  rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-foreground py-10 min-h-screen">
      <div className="w-full">
        {data ? (
          <>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Volume-{volume?.volumeNumber} | Issue-{issue?.issueNumber}
            </h2>

            <div className="space-y-6">
              {currentPapers.length > 0 ? (
                <>
                  {currentPapers.map((paper, idx) => (
                    <PaperCard paper={paper} key={idx} />
                  ))}

                  {/* Pagination Controls */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                  />
                </>
              ) : (
                <div className="p-8 text-center text-text-primary/60 border border-dashed rounded-lg">
                  No papers published in this issue yet.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-text-primary">
              Current Issue Not Available
            </h2>
            <p className="text-text-primary/60 mt-2">
              The latest volume and issue have not been published yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentIssue;
