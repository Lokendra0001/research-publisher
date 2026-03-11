PUBLISHER FRONTEND DOCUMENTATION

Note: This documentation covers all frontend pages and API calls related to the Publisher role.

1. PROJECT STRUCTURE
   Base Route: /publisher/role
   Main Layout: client/src/components/publisher/role/RoleContent.jsx
   Navigation: client/src/components/publisher/PublisherSidebar.jsx

2. PAGES AND VIEWS (DASHBOARD)

| PAGE LABEL              | URL PARAMETER (?page=)  | COMPONENT PATH                 | FUNCTION DESCRIPTION                                               |
| ----------------------- | ----------------------- | ------------------------------ | ------------------------------------------------------------------ |
| HOME PAGE CONTENT       | home_content            | views/HomeContent.jsx          | Manage static content, sliders, and announcements on the homepage. |
| APPROVE REVIEWERS       | approve_reviewers       | views/ApproveReviewers.jsx     | Verify and approve new reviewer registrations and their CVs.       |
| NEW SUBMISSIONS         | new_submissions         | views/NewSubmissions.jsx       | View newly submitted papers from authors.                          |
| REJECTED INVITATIONS    | rejected_invitations    | views/RejectedInvitations.jsx  | Track reviewers who declined the invitation to review a paper.     |
| UNDER REVIEW            | under_review            | views/UnderReview.jsx          | Monitor papers that are currently with reviewers.                  |
| MINOR REJECT            | minor_reject            | views/MinorReject.jsx          | Manage papers that were returned for minor corrections.            |
| ACCEPTED PAPERS         | accepted_papers         | views/AcceptedPapers.jsx       | Finalize accepted papers for publication (Volumes/Issues).         |
| REJECTED PAPERS         | rejected_papers         | views/RejectedPapers.jsx       | View papers that were officially rejected.                         |
| PUBLISHED PAPERS        | published_papers        | views/PublishedPapers.jsx      | Archive of all papers published in the journal.                    |
| REFUNDABLE PAYMENTS     | refundable              | views/Refundable.jsx           | Manage payment refunds for rejected or cancelled submissions.      |
| ISSUE CERTIFICATE       | issue_certificate       | views/IssueCertificate.jsx     | Generate and issue publication certificates to authors.            |
| ISSUED CERTIFICATE LIST | issued_certificate_list | views/ListIssueCertificate.jsx | View and manage history of all issued certificates.                |

3. API INTEGRATION (PUBLISHER ENDPOINTS)

| ACTION                     | HTTP METHOD | ENDPOINT URL                 | DATA FORMAT                            |
| -------------------------- | ----------- | ---------------------------- | -------------------------------------- |
| Fetch Unverified Reviewers | GET         | /users/reviewers/unverified  | JSON (List of pending reviewers)       |
| Verify/Approve Reviewer    | POST        | /users/reviewers/{id}/verify | JSON (approve: true/false)             |
| Fetch Papers by Status     | GET         | /papers?status={state}       | JSON (Filtered list of papers)         |
| Issue Certificate          | POST        | /certificates/issue          | JSON (Paper ID + Certificate metadata) |
| Update Homepage Content    | PUT         | /content/home                | JSON (Slider info, text content)       |
| Manage Refund              | POST        | /payments/refund             | JSON (Transaction ID + amount)         |

4. DASHBOARD ROUTING LOGIC

The publisher dashboard uses a similar query-based routing as the author dashboard.
Example URL: http://localhost:3000/publisher/role?page=approve_reviewers

5. UI COMPONENTS USED

- Sidebar: PublisherSidebar.jsx (Main navigation menu)
- Paper List: PublisherPaperList.jsx (Custom list component for publisher actions)
- Skeleton: Skeleton.jsx (Loading placeholders)
- Toasts: notify (Success/error popups)
- Icons: Lucide-React (Visual indicators)
