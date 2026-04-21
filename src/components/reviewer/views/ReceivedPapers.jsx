"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { constant } from "@/utils/constant";
import { notify } from "@/utils/toast";
import {
  Clock,
  Download,
  Check,
  X,
  AlertTriangle,
  FileText,
} from "lucide-react";

const ReceivedPapers = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reasons, setReasons] = useState({}); // Store reasons keyed by assignment ID
  const [processingId, setProcessingId] = useState(null);
  const [actionType, setActionType] = useState(null);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      // Fetch papers that are accepted by reviewer but decision is pending (null)
      const res = await axios.get(
        `${constant.SERVER_URL}reviews/assignments?status=accepted&decision=pending&isReview=true`,
        { withCredentials: true },
      );
      console.log(res)

      if (res.data.success) {
        
        setAssignments(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching received papers:", error);
      notify.error("Failed to load received papers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleReasonChange = (id, value) => {
    setReasons((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitReview = async (id, decision) => {
    try {
      setProcessingId(id);
      setActionType(decision);

      const reason = reasons[id] || "";

      if (
        (decision === "minor_reject" || decision === "rejected") &&
        !reason.trim()
      ) {
        notify.error("Please provide a reason for rejection/revision.");
        setProcessingId(null);
        setActionType(null);
        return;
      }

      const payload = {
        decision,
        reason,
      };

      //1. Updating Review_Assignment decision
      const res = await axios.post(
        `${constant.SERVER_URL}reviews/${id}/submit`,
        payload,
        { withCredentials: true },
      );

      if (res.data.success) {
        //2. Updating Paper Status
        const result = await axios.patch(
          `${constant.SERVER_URL}papers/${res.data.data.paperId}`,
          { status: res.data.data.decision },
          { withCredentials: true },
        );
        if (result.data.success && constant.PAYMENT_SERVICE == "on") {
          //3. Updating Payment RefundAmt, KeptAmt and RefundStatus`
          await axios.patch(
            `${constant.SERVER_URL}payment/update-status`,
            { paperId: res.data.data.paperId, status: res.data.data.decision },
            { withCredentials: true },
          );
        }
        notify.success(
          `Paper ${decision === "accepted" ? "Approved" : decision === "minor_reject" ? "Requested Revision" : "Rejected"} successfully`,
        );
        fetchAssignments();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      notify.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setProcessingId(null);
      setActionType(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
      <div className="border-b border-border/60 pb-2 mb-6">
        <h1 className="text-2xl font-bold text-secondary">Received Papers</h1>
      </div>

      <div className="w-full overflow-x-auto border border-border scrollbar-hidden">
        <table className="w-full min-w-[1200px] text-sm text-left text-text-primary/50">
          <thead className="text-xs text-gray-700 uppercase bg-muted/50 border-b  border-border">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold w-10 ">
                No.
              </th>
              <th scope="col" className="px-4 py-3 font-bold w-[152px]">
                Paper Title
              </th>
              <th scope="col" className="px-4 py-3 font-bold w-[152px] ">
                Date of Issue
              </th>
              <th scope="col" className="px-4 py-3 font-bold w-[180px]">
                Deadline of Paper
              </th>
              <th scope="col" className="px-4 py-3 font-bold w-20 text-center ">
                Paper
              </th>
              <th scope="col" className="px-4 py-3 font-bold w-64 ">
                Reason
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-bold w-[140px] text-center "
              >
                Minor Reject
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-bold text-center min-w-[240px]"
              >
                Action
              </th>
            </tr>
          </thead>

          {loading ? (
            <tbody className="w-full animate-pulse">
              {Array.from({ length: 3 }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-4 py-4 w-10 ">
                    <div className="h-4 bg-border rounded w-8"></div>
                  </td>
                  <td className="px-4 py-4 w-[152px]">
                    <div className="h-4 bg-border rounded w-20"></div>
                  </td>
                  <td className="px-4 py-4 w-[152px]">
                    <div className="h-4 bg-border rounded w-3/4 mb-2"></div>
                  </td>
                  <td className="px-4 py-4 w-[180px]">
                    <div className="h-4 bg-border rounded w-24"></div>
                  </td>
                  <td className="px-4 py-4 w-20 text-center">
                    <div className="h-8 w-8 bg-border rounded-full mx-auto"></div>
                  </td>
                  <td className="px-4 py-4 w-64 text-left ">
                    <div className="h-10 w-2/3 bg-border rounded "></div>
                  </td>
                  <td className="px-4 py-4 w-[140px] text-center">
                    <div className="h-4 bg-border rounded w-24"></div>
                  </td>
                  <td className="px-4 py-7 min-w-[240px] text-center grid grid-cols-2 items-center  gap-1">
                    <div className="h-4  bg-border rounded "></div>

                    <div className="h-4 bg-border rounded "></div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : assignments.length === 0 ? (
            <tbody className={` `}>
              <tr>
                <td colSpan="8">
                  <div className=" text-center py-12 text-text-primary/50 bg-gray-50    w-full">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No new received paper found.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {assignments.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-primary-foreground border-b border-border/60 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 w-10 font-medium text-text-primary align-middle text-center border-r border-muted">
                    {index + 1}
                  </td>

                  <td className="px-4 py-4 w-[152px] align-middle border-r border-border/50">
                    <p
                      className="text-text-primary/90 font-medium line-clamp-2"
                      title={item.paper?.title}
                    >
                      {item.paper?.title}
                    </p>
                  </td>
                  <td className="px-4 py-4 w-[152px] whitespace-nowrap text-text-primary/90 align-middle border-r border-border/50">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-4 py-4 w-[180px] whitespace-nowrap text-text-primary/90 align-middle border-r border-border/50">
                    {formatDate(item.deadline)}
                  </td>
                  <td className="px-4 py-4 w-20 text-center align-middle border-r border-border/50">
                    {item.paper?.manuscriptUrl ? (
                      <a
                        href={item.paper.manuscriptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 bg-pirmary-blue/10 rounded-full hover:bg-primary-blue/20 text-primary-blue/80 hover:text-primary-blue transition-colors"
                        title="Download Manuscript"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    ) : (
                      <span className="text-text-primary/50">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 w-64 align-middle border-r border-border/50">
                    <textarea
                      className="w-full h-20 p-2 border border-border rounded text-xs focus:ring-1 focus:ring-secondary/50 focus:outline-none resize-none"
                      placeholder="Enter Reason"
                      value={reasons[item.id] || ""}
                      onChange={(e) =>
                        handleReasonChange(item.id, e.target.value)
                      }
                    ></textarea>
                  </td>
                  <td className="px-4 py-4 w-[140px] text-center align-middle border-r border-border/50">
                    <button
                      onClick={() =>
                        handleSubmitReview(item.id, "minor_reject")
                      }
                      disabled={!!processingId}
                      className={`bg-secondary/90 text-text-secondary hover:bg-secondary font-medium text-xs px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap flex items-center justify-center gap-1 ${processingId === item.id ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {processingId === item.id &&
                      actionType === "minor_reject" ? (
                        <div className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      ) : null}
                      Minor Reject
                    </button>
                  </td>
                  <td className="px-4 py-4 min-w-[240px] text-center align-middle">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleSubmitReview(item.id, "accepted")}
                        disabled={!!processingId}
                        className={`bg-success/90 text-primary-foreground hover:bg-success font-medium text-xs px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap flex items-center justify-center gap-1 ${processingId === item.id ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        {processingId === item.id &&
                        actionType === "accepted" ? (
                          <div className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        ) : null}
                        Approve
                      </button>
                      <button
                        onClick={() => handleSubmitReview(item.id, "rejected")}
                        disabled={!!processingId}
                        className={`bg-danger/90 text-primary-foreground hover:bg-danger font-medium text-xs px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap flex items-center justify-center gap-1 ${processingId === item.id ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        {processingId === item.id &&
                        actionType === "rejected" ? (
                          <div className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        ) : null}
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default ReceivedPapers;
