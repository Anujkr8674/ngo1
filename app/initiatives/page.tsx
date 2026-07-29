import React from "react";
import { getInitiativeCategories, getInitiatives } from "../actions/initiative";
import InitiativesClient from "./InitiativesClient";

export const dynamic = 'force-dynamic'

export default async function InitiativesPage() {
  const [categories, initiatives] = await Promise.all([
    getInitiativeCategories(),
    getInitiatives()
  ]);

  return (
    <InitiativesClient initialCategories={categories} initialInitiatives={initiatives} />
  );
}

