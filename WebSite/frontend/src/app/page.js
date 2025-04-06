// app/page.tsx (or page.jsx)

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/admin/dashboard");
}