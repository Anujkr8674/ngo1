import React from "react";
import { getDonorCSRMembers } from "../actions/donorCSRMember";
import { getCsrPartnerships } from "../actions/csrPartnership";
import DonorsCSRSponsorsMembersClient from "./DonorsCSRSponsorsMembersClient";

export const dynamic = 'force-dynamic'

export default async function DonorsCSRSponsorsMembersPage() {
    const [memberImages, csrPartners] = await Promise.all([
        getDonorCSRMembers(),
        getCsrPartnerships(),
    ]);

    return (
        <DonorsCSRSponsorsMembersClient 
            initialMemberImages={memberImages} 
            initialCsrPartners={csrPartners}
        />
    );
}

