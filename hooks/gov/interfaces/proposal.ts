export interface Proposal {
  proposal_id: number;
  title: string;
  description: string;
  type_url: string;
  status: ProposalStatus;
  submit_time: string;
  voting_start_time: string;
  voting_end_time: string;
  deposit_end_time: string;
  total_deposit: {
    denom: string;
    amount: string;
  }[];
  final_vote: {
    abstain_count: string;
    no_count: string;
    no_with_veto_count: string;
    yes_count: string;
  };
}

type ProposalStatus =
  | "PROPOSAL_STATUS_UNSPECIFIED"
  | "PROPOSAL_STATUS_DEPOSIT_PERIOD"
  | "PROPOSAL_STATUS_VOTING_PERIOD"
  | "PROPOSAL_STATUS_PASSED"
  | "PROPOSAL_STATUS_REJECTED"
  | "PROPOSAL_STATUS_FAILED";
