import React from "react";
import { getStudentSheets } from "../actions/studentSheet";
import StudentsClient from "./StudentsClient";

export const dynamic = 'force-dynamic'

export default async function StudentsPage() {
  const sheets = await getStudentSheets();

  return (
    <StudentsClient initialSheets={sheets} />
  );
}

