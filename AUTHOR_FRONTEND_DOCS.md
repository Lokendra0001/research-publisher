AUTHOR FRONTEND DOCUMENTATION

Note: This documentation covers all frontend pages and API calls related to the Author role.

1. PROJECT STRUCTURE
   Base Route: /author/role
   Main Layout: client/src/components/author/role/RoleContent.jsx
   Navigation: client/src/components/author/AuthorSidebar.jsx

2. PAGES AND VIEWS (DASHBOARD)

| PAGE LABEL       | URL PARAMETER (?page=) | COMPONENT PATH            | FUNCTION DESCRIPTION                                                    |
| ---------------- | ---------------------- | ------------------------- | ----------------------------------------------------------------------- |
| NEW SUBMISSION   | new_submission         | views/NewSubmission.jsx   | Form to upload manuscript, fill author details, and nominate reviewers. |
| CHECK STATUS     | check_status           | views/CheckStatus.jsx     | Global view to track the current status of every submitted paper.       |
| SUBMITTED PAPERS | submitted_papers       | views/SubmittedPapers.jsx | List of all papers currently in the 'Submitted' state.                  |
| UNDER REVIEW     | under_review           | views/UnderReview.jsx     | List of papers assigned to reviewers for evaluation.                    |
| ACCEPTED PAPERS  | accepted_papers        | views/AcceptedPapers.jsx  | Papers approved for publication (pending final steps).                  |
| MINOR REVISION   | minor_rejected         | views/MinorRejected.jsx   | Papers returned to author for minor corrections.                        |
| REJECTED PAPERS  | rejected_papers        | views/RejectedPapers.jsx  | Papers that failed the review process.                                  |
| PUBLISHED PAPERS | published_papers       | views/PublishedPapers.jsx | Officially published papers in the journal.                             |
| MY CERTIFICATES  | certificates           | views/MyCertificate.jsx   | Download center for official publication certificates.                  |

3. API INTEGRATION (AUTHOR ENDPOINTS)

| ACTION           | HTTP METHOD | ENDPOINT URL                      | DATA FORMAT                                       |
| ---------------- | ----------- | --------------------------------- | ------------------------------------------------- |
| Submit Paper     | POST        | /papers/submit                    | Multipart/FormData (File + JSON Metadata)         |
| Fetch Papers     | GET         | /papers?status={state}            | JSON Response (Paginated list of papers)          |
| Initiate Payment | POST        | /payment                          | JSON (Paper details for PayU/Gateway integration) |
| Get Certificates | GET         | /papers?certificateGenerated=true | JSON (List of papers with download links)         |
| View Details     | GET         | /papers/{paperId}                 | JSON (Full metadata for a single paper)           |

4. DASHBOARD ROUTING LOGIC

The dashboard switches components dynamically based on the URL query.
Example URL: http://localhost:3000/author/role?page=accepted_papers

5. UI COMPONENTS USED

- Sidebar: AuthorSidebar.jsx (Handles navigation links)
- Table View: PaperList.jsx (Generic component for listing papers with status badges)
- Toasts: notify (For success/error feedback)
- Icons: Lucide-React (Standard icons for dashboard)
