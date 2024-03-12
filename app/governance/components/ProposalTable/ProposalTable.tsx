"use client";
import React, { useMemo, useState } from "react";
import styles from "./ProposalTable.module.scss";
import { Proposal } from "@/hooks/gov/interfaces/proposal";
import Text from "@/components/text";
import { useRouter } from "next/navigation";
import ToggleGroup from "@/components/groupToggle/ToggleGroup";
import Table from "@/components/table/table";
import Container from "@/components/container/container";
import { Pagination } from "@/components/pagination/Pagination";
import Spacer from "@/components/layout/spacer";
import { ProposalRow } from "./ProposalRow";
import Analytics from "@/provider/analytics";
import { getAnalyticsProposalInfo } from "@/utils/analytics";

interface TableProps {
  proposals: Proposal[];
  isMobile: boolean;
}

const PAGE_SIZE = 10;
enum ProposalFilter {
  ALL = "ALL PROPOSALS",
  PASSED = "PASSED PROPOSALS",
  REJECTED = "REJECTED PROPOSALS",
}

const ProposalTable = ({ proposals, isMobile }: TableProps) => {
  // route to proposal page
  const router = useRouter();
  const handleRowClick = (proposalId: any) => {
    // Navigate to the appropriate page
    Analytics.actions.events.governance.proposalClicked(
      getAnalyticsProposalInfo(proposalId, proposals)
    );
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
        case ProposalFilter.PASSED:
          return proposal.status === "PROPOSAL_STATUS_PASSED";
        case ProposalFilter.REJECTED:
          return proposal.status === "PROPOSAL_STATUS_REJECTED";
        default:
          return (
            proposal.status === "PROPOSAL_STATUS_REJECTED" ||
            proposal.status === "PROPOSAL_STATUS_PASSED"
          );
      }
    });
  }, [currentFilter, proposals]);

  const activeProposals = useMemo(() => {
    setCurrentPage(1);
    return proposals.filter((proposal) => {
      return proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD";
    });
  }, [proposals]);

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
  const proposalTableHeaders = [
    {
      value: "",
      ratio: 5,
    },
    {
      value: "",
      ratio: 2,
      hideOnMobile: true,
    },

    {
      value: "",
      ratio: 2,
      hideOnMobile: true,
    },
    {
      value: "",
      ratio: 1,
      hideOnMobile: true,
    },
  ];
  return (
    <div className={styles.tableContainer}>
      {activeProposals.length > 0 ? (
        <div className={styles.table}>
          {
            <Table
              title="Active Proposals"
              headerFont="proto_mono"
              headers={
                activeProposals.length != 0 || activeProposals
                  ? proposalTableHeaders
                  : []
              }
              onRowsClick={
                activeProposals.length > 0
                  ? activeProposals.map(
                      (proposal) => () => handleRowClick(proposal.proposal_id)
                    )
                  : undefined
              }
              removeHeader={true}
              rowHeight={isMobile ? "180px" : "120px"}
              content={activeProposals.map((proposal) =>
                ProposalRow({ proposal, active: true, isMobile })
              )}
            />
          }
        </div>
      ) : (
        <div className={styles.noActiveProposalContainer}>
          <div className={styles.circleContainer}>
            <div
              className={styles.circle}
              style={{ height: "10px", width: "10px" }}
            />
          </div>
          <div style={{ paddingLeft: "20px" }}>
            {isMobile ? (
              <Text font="rm_mono">There are no active proposals</Text>
            ) : (
              <Text font="rm_mono">
                There are currently no active proposals
              </Text>
            )}
          </div>
        </div>
      )}
      <div>
        <Spacer height="30px" />
      </div>
      <div className={styles.table}>
        {
          <Table
            title={
              !isMobile ? (
                currentFilter
              ) : (
                <Container style={{ marginLeft: "8px" }}>
                  {currentFilter}
                </Container>
              )
            }
            secondary={
              <Container
                width={isMobile ? "100%" : "400px"}
                style={{ padding: isMobile ? "20px 16px 0 16px" : "" }}
              >
                <ToggleGroup
                  options={Object.values(ProposalFilter).map(
                    (filter) => filter.split(" ")[0]
                  )}
                  selected={currentFilter.split(" ")[0]}
                  setSelected={(value) => {
                    const proposalFilter = Object.values(ProposalFilter).find(
                      (filter) => filter.split(" ")[0] === value
                    );
                    Analytics.actions.events.governance.tabSwitched(value);
                    setCurrentFilter(proposalFilter || ProposalFilter.ALL);
                  }}
                />
              </Container>
            }
            headerFont="rm_mono"
            headers={
              filteredProposals.length != 0 || filteredProposals
                ? proposalTableHeaders
                : []
            }
            onRowsClick={
              paginatedProposals.length > 0
                ? paginatedProposals.map(
                    (proposal) => () => handleRowClick(proposal.proposal_id)
                  )
                : undefined
            }
            removeHeader={true}
            rowHeight={isMobile ? "180px" : "120px"}
            content={
              paginatedProposals.length > 0
                ? [
                    ...paginatedProposals
                      .filter(
                        (proposal) =>
                          proposal.status != "PROPOSAL_STATUS_VOTING_PERIOD"
                      )
                      .map((proposal) =>
                        ProposalRow({ proposal, active: false, isMobile })
                      ),
                    <Pagination
                      isMobile={isMobile}
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
