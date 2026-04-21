import CurrentIssue from "@/components/guest/issues/CurrentIssue";
import { PAGE_TITLES } from "@/utils/constant";

export const metadata = {
    title: `Current ${PAGE_TITLES.ISSUES}`,
}

export default function Page() {
    return <CurrentIssue />;
}
