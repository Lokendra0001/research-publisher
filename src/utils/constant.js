export const constant = {
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  PAYMENT_SERVICE: process.env.NEXT_PUBLIC_PAYMENT_SERVICE,
};

export const METADATA = {
  title: {
    default: "IJARMY - International Journal of Advanced Research in Multidisciplinary Yield",
    template: "%s | IJARMY",
  },
  description: "International Journal of Advanced Research in Multidisciplinary Yield",
  icons: {
    icon: "/logo/logo.png",
  },
};

export const PAGE_TITLES = {
  HOME: "Home",
  CONTACT: "Contact Us",
  SIGNIN: "Sign In",
  SIGNUP: "Sign Up",
  AUTHOR: "Author Dashboard",
  PUBLISHER: "Publisher Dashboard",
  REVIEWER: "Reviewer Dashboard",
  GUIDELINES: "Guidelines",
  ISSUES: "Issues",
  UNAUTHORIZED: "Unauthorized",
};
