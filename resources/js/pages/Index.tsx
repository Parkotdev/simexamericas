import React from "react";
import { useAppSelector } from "@/context";

import type { PageProps } from "@/common/props";
import { Layout } from "@/components";

export default function Index({ auth }: PageProps) {
  // const user = useAppSelector((state) => state.user.data);

  if (!auth.user) return null;

  return <Layout>Hi!</Layout>;
}
