"use client";
import React, { useMemo, useState } from "react";
import styles from "./ProposalTable.module.scss";
import { Proposal } from "@/hooks/gov/interfaces/proposal";
import {
  formatProposalStatus,
  formatProposalType,
} from "@/utils/gov/formatData";
import Text from "@/components/text";
import { useRouter } from "next/navigation";
import ToggleGroup from "@/components/groupToggle/ToggleGroup";
import Table from "@/components/table/table";
import Container from "@/components/container/container";
import { Pagination } from "@/components/pagination/Pagination";

interface TableProps {
  proposals: Proposal[];
}

const PAGE_SIZE = 10;
enum ProposalFilter {
  ALL = "ALL PROPOSALS",
  ACTIVE = "ACTIVE PROPOSALS",
  PASSED = "PASSED PROPOSALS",
  REJECTED = "REJECTED PROPOSALS",
}

const ProposalTable = ({ proposals }: TableProps) => {
  // route to proposal page
  const router = useRouter();
  const handleRowClick = (proposalId: any) => {
    // Navigate to the appropriate page
    router.push(`/governance/proposal?id=${proposalId}`);
  };

  // filter proposals
  const [currentFilter, setCurrentFilter] = useState<ProposalFilter>(
    ProposalFilter.ALL
  );
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProposals = useMemo(() => {
    setCurrentPage(1);
    return proposals.filter((proposal) => {
      switch (currentFilter) {
        case ProposalFilter.ACTIVE:
          return proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD";
        case ProposalFilter.PASSED:
          return proposal.status === "PROPOSAL_STATUS_PASSED";
        case ProposalFilter.REJECTED:
          return proposal.status === "PROPOSAL_STATUS_REJECTED";
        default:
          return true;
      }
    });
  }, [currentFilter, proposals]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProposals.length / PAGE_SIZE),
    [filteredProposals.length]
  );

  const paginatedProposals = filteredProposals.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (proposals.length == 0) {
    return (
      <div>
        <Text font="proto_mono">Loading Proposals...</Text>
      </div>
    );
  }
  return (
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        {
          <Table
            title={currentFilter}
            secondary={
              <Container width="400px">
                <ToggleGroup
                  options={Object.values(ProposalFilter).map(
                    (filter) => filter.split(" ")[0]
                  )}
                  selected={currentFilter.split(" ")[0]}
                  setSelected={(value) => {
                    const proposalFilter = Object.values(ProposalFilter).find(
                      (filter) => filter.split(" ")[0] === value
                    );
                    setCurrentFilter(proposalFilter || ProposalFilter.ALL);
                  }}
                />
              </Container>
            }
            headerFont="rm_mono"
            headers={
              filteredProposals.length != 0 || filteredProposals
                ? [
                    {
                      value: "ID",
                      ratio: 2,
                    },
                    { value: "Title", ratio: 6 },
                    {
                      value: "Status",
                      ratio: 3,
                    },
                    {
                      value: "Type",
                      ratio: 5,
                    },
                    {
                      value: "Voting Date",
                      ratio: 4,
                    },
                  ]
                : []
            }
            onRowsClick={
              paginatedProposals.length > 0
                ? paginatedProposals.map(
                    (proposal) => () => handleRowClick(proposal.proposal_id)
                  )
                : undefined
            }
            content={
              paginatedProposals.length > 0
                ? [
                    ...paginatedProposals.map((proposal, index) => {
                      return [
                        <Text
                          key={`name_${index}`}
                          font="rm_mono"
                          className={styles.tableData}
                        >
                          {proposal.proposal_id}
                        </Text>,

                        <Text
                          key={`tokens_${index}`}
                          font="rm_mono"
                          size="sm"
                          className={styles.rowTitle}
                        >
                          {proposal.title}
                        </Text>,

                        <Text
                          key={`commission_${index}`}
                          font="rm_mono"
                          className={styles.tableData}
                        >
                          {formatProposalStatus(proposal.status)}
                        </Text>,

                        <Text
                          key={`participation_${index}`}
                          font="rm_mono"
                          className={styles.tableData}
                        >
                          {formatProposalType(proposal.type_url)}
                        </Text>,

                        <Text
                          key={`delegators_${index}`}
                          font="rm_mono"
                          className={styles.tableData}
                        >
                          {new Date(proposal.voting_end_time).toDateString()}
                        </Text>,
                      ];
                    }),
                    <Pagination
                      key="pagination"
                      currentPage={currentPage}
                      totalPages={totalPages}
                      handlePageClick={(index) => setCurrentPage(index)}
                    />,
                  ]
                : [
                    <div key="noData" className={styles.noProposalContainer}>
                      <Text font="proto_mono" size="lg">
                        NO {currentFilter} FOUND
                      </Text>
                    </div>,
                  ]
            }
          />
        }
      </div>
    </div>
  );
};

export default ProposalTable;
