import type { Metadata } from "next";
import AddProjectForm from "@/components/AddProjectForm";

export const metadata: Metadata = {
  title: "New project",
  description: "Internal helper for drafting a projects.ts entry.",
  robots: { index: false, follow: false },
};

export default function AddProjectPage() {
  return <AddProjectForm />;
}
