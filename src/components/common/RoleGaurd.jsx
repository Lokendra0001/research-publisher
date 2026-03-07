"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const RoleGuard = ({ allowedRoles, children }) => {
  const role = useSelector((state) => state.auth.role);
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.replace("/signin");
    }

    if (role && !allowedRoles.includes(role)) {
      router.replace("/unauthorized");
    }
  }, [role, allowedRoles, router]);

  if (!role) return null;

  if (!allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
