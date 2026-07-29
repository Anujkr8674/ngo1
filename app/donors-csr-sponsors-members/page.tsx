import React from "react";
import { getDonorCSRMembers } from "../actions/donorCSRMember";
import DonorsCSRSponsorsMembersClient from "./DonorsCSRSponsorsMembersClient";

export const dynamic = 'force-dynamic'

export default async function DonorsCSRSponsorsMembersPage() {
    const memberImages = await getDonorCSRMembers();

    return (
        <DonorsCSRSponsorsMembersClient initialMemberImages={memberImages} />
    );
}

