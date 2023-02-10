import React from "react";
import { useAppSelector } from "@/context";

import type { IndexProps, PageProps } from "@/common/props";
import { router } from "@inertiajs/react";
import { Layout } from "@/components";

export default function Index({ auth }: PageProps) {
  const user = useAppSelector((state) => state.user);

  React.useEffect(() => {
    if (!user) router.get("/login");
  }, []);

  return user ? <Layout>Hi!</Layout> : null;
}
