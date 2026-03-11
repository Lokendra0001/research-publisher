REVIEWER FRONTEND DOCUMENTATION

Note: This documentation covers all frontend pages and API calls related to the Reviewer role.

1. PROJECT STRUCTURE
   Base Route: /reviewer/role
   Main Layout: client/src/components/reviewer/role/RoleContent.jsx
   Navigation: client/src/components/reviewer/ReviewerSidebar.jsx

2. PAGES AND VIEWS (DASHBOARD)

| PAGE LABEL               | URL PARAMETER (?page=)   | COMPONENT PATH                  | FUNCTION DESCRIPTION                                                |
| ------------------------ | ------------------------ | ------------------------------- | ------------------------------------------------------------------- |
| INVITATION FOR REVIEWING | invitation_for_reviewing | views/ReviewInvitations.jsx     | View and respond (Accept/Decline) to new peer-review requests.      |
| RECEIVED PAPERS          | received_papers          | views/ReceivedPapers.jsx        | Access full manuscripts and submit final review decisions/comments. |
| APPROVED PAPERS          | approved_papers          | views/ApprovedPapers.jsx        | View history of papers you have approved.                           |
| MINOR REJECTED PAPERS    | minor_rejected_papers    | views/MinorRejectedPapers.jsx   | View papers where you requested minor revisions.                    |
| REJECTED PAPERS          | rejected_papers          | views/RejectedPapers.jsx        | View history of papers you have rejected.                           |
| DEADLINE EXPIRED PAPERS  | deadline_expired_papers  | views/DeadlineExpiredPapers.jsx | List of papers where the review timeframe has elapsed.              |

3. API INTEGRATION (REVIEWER ENDPOINTS)

| ACTION                  | HTTP METHOD | ENDPOINT URL                                          | DATA FORMAT                                                |
| ----------------------- | ----------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| Fetch Invitations       | GET         | /reviews/assignments?status=pending                   | JSON (List of pending requests)                            |
| Respond to Invitation   | POST        | /reviews/{id}/respond                                 | JSON (accept: true/false + reason)                         |
| Fetch Active Reviews    | GET         | /reviews/assignments?status=accepted&decision=pending | JSON (Papers ready for review)                             |
| Submit Final Decision   | POST        | /reviews/{id}/submit                                  | JSON (decision: accepted/rejected/minor_reject + comments) |
| Fetch Completed Reviews | GET         | /reviews/assignments?status={state}                   | JSON (History of reviews)                                  |

4. DASHBOARD ROUTING LOGIC

The reviewer dashboard uses query parameters to navigate between different states of the review process.
Example URL: http://localhost:3000/reviewer/role?page=received_papers

5. UI COMPONENTS USED

- Sidebar: ReviewerSidebar.jsx (Navigation controller)
- List View: ReviewerPaperList.jsx (Standardized table for reviewer tasks)
- Feedback: notify (Real-time toast notifications for actions)
- Download: Download Manuscript (Direct link to backend hosted files)
