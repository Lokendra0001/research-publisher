import PastIssue from "@/components/guest/issues/PastIssue";
import { PAGE_TITLES } from "@/utils/constant";

export const metadata = {
    title: `Past ${PAGE_TITLES.ISSUES}`,
}

export default function PastIssuesPage() {
    return <PastIssue />;
}
