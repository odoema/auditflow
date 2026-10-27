/**
 * Demo dataset for Kampala Community Holdings Ltd – FY2026 External Audit
 * Firm: Grand & Noble Certified Public Accountants (ICPAU licensed)
 * Used when DEMO_MODE is true so the entire pitch demonstration works offline.
 */
const DEMO_DATA = {
  dashboard: {
    activeAudits: 12,
    documents: 1248,
    outstandingRequests: 27,
    reviewNotes: 8,
    overdueTasks: 3,
    completedAudits: 18
  },

  clients: [
    {
      id: "CLIENT-0001",
      name: "Kampala Community Holdings Ltd",
      registrationNumber: "80012345678901",
      tin: "1002345678",
      industry: "Holding Company / Real Estate",
      address: "Plot 12, Kampala Road, Kampala, Uganda",
      contactPerson: "Grace Nalwanga",
      email: "grace.nalwanga@kchl.ug",
      telephone: "+256 772 123 456",
      engagementPartner: "Tindyebwa Obed",
      auditManager: "Akampomugisha Pamella",
      riskRating: "Medium",
      status: "Active",
      created: "2026-08-15"
    },
    {
      id: "CLIENT-0002",
      name: "Nile Valley Trading Co Ltd",
      registrationNumber: "80098765432109",
      tin: "1009876543",
      industry: "Import / Export",
      address: "Jinja Industrial Area, Jinja",
      contactPerson: "James Okello",
      email: "j.okello@nilevalley.ug",
      telephone: "+256 701 987 654",
      engagementPartner: "Tindyebwa Obed",
      auditManager: "Akampomugisha Pamella",
      riskRating: "High",
      status: "Active",
      created: "2026-07-02"
    },
    {
      id: "CLIENT-0003",
      name: "Entebbe Logistics Solutions Ltd",
      registrationNumber: "80055566677788",
      tin: "1005556667",
      industry: "Logistics & Transport",
      address: "Airport Road, Entebbe",
      contactPerson: "Peter Mugisha",
      email: "p.mugisha@entebbelogistics.ug",
      telephone: "+256 753 444 333",
      engagementPartner: "Tindyebwa Obed",
      auditManager: "Akampomugisha Pamella",
      riskRating: "Low",
      status: "Active",
      created: "2026-09-10"
    }
  ],

  engagements: [
    {
      id: "ENG-2026-0001",
      clientId: "CLIENT-0001",
      clientName: "Kampala Community Holdings Ltd",
      type: "External Audit",
      financialYear: "2026",
      periodStart: "2026-01-01",
      periodEnd: "2026-12-31",
      partner: "Tindyebwa Obed",
      manager: "Akampomugisha Pamella",
      expectedCompletion: "2026-11-15",
      status: "In Progress",
      completionPct: 82,
      created: "2026-08-20"
    },
    {
      id: "ENG-2026-0002",
      clientId: "CLIENT-0002",
      clientName: "Nile Valley Trading Co Ltd",
      type: "External Audit",
      financialYear: "2026",
      periodStart: "2026-01-01",
      periodEnd: "2026-12-31",
      partner: "Tindyebwa Obed",
      manager: "Akampomugisha Pamella",
      expectedCompletion: "2026-12-10",
      status: "Planning",
      completionPct: 28,
      created: "2026-09-01"
    },
    {
      id: "ENG-2026-0003",
      clientId: "CLIENT-0003",
      clientName: "Entebbe Logistics Solutions Ltd",
      type: "External Audit",
      financialYear: "2026",
      periodStart: "2026-01-01",
      periodEnd: "2026-12-31",
      partner: "Tindyebwa Obed",
      manager: "Akampomugisha Pamella",
      expectedCompletion: "2026-11-30",
      status: "Fieldwork",
      completionPct: 55,
      created: "2026-09-15"
    }
  ],

  documents: [
    { id: "DOC-000034", name: "Trial_Balance_FY2026.xlsx", client: "Kampala Community Holdings Ltd", section: "15_FINANCIAL_STATEMENTS", uploaded: "2026-10-12", owner: "Grace Nalwanga", type: "xlsx", driveUrl: "https://drive.google.com/file/d/demo-tb/view" },
    { id: "DOC-000035", name: "General_Ledger_FY2026.xlsx", client: "Kampala Community Holdings Ltd", section: "15_FINANCIAL_STATEMENTS", uploaded: "2026-10-12", owner: "Grace Nalwanga", type: "xlsx", driveUrl: "https://drive.google.com/file/d/demo-gl/view" },
    { id: "DOC-000036", name: "Bank_Statement_January.pdf", client: "Kampala Community Holdings Ltd", section: "04_CASH_AND_BANK", uploaded: "2026-10-15", owner: "Grace Nalwanga", type: "pdf", driveUrl: "https://drive.google.com/file/d/demo-bs-jan/view" },
    { id: "DOC-000037", name: "Bank_Statement_February.pdf", client: "Kampala Community Holdings Ltd", section: "04_CASH_AND_BANK", uploaded: "2026-10-15", owner: "Grace Nalwanga", type: "pdf", driveUrl: "https://drive.google.com/file/d/demo-bs-feb/view" },
    { id: "DOC-000038", name: "Bank_Reconciliation_June.pdf", client: "Kampala Community Holdings Ltd", section: "04_CASH_AND_BANK", uploaded: "2026-10-18", owner: "Ndagire Dianah", type: "pdf", driveUrl: "https://drive.google.com/file/d/demo-br-jun/view" },
    { id: "DOC-000039", name: "Fixed_Asset_Register.xlsx", client: "Kampala Community Holdings Ltd", section: "07_FIXED_ASSETS", uploaded: "2026-10-20", owner: "Grace Nalwanga", type: "xlsx", driveUrl: "https://drive.google.com/file/d/demo-far/view" },
    { id: "DOC-000040", name: "Debtors_Ageing.xlsx", client: "Kampala Community Holdings Ltd", section: "05_RECEIVABLES", uploaded: "2026-10-21", owner: "Grace Nalwanga", type: "xlsx", driveUrl: "https://drive.google.com/file/d/demo-debtors/view" },
    { id: "DOC-000041", name: "Creditors_Ageing.xlsx", client: "Kampala Community Holdings Ltd", section: "08_PAYABLES", uploaded: "2026-10-21", owner: "Grace Nalwanga", type: "xlsx", driveUrl: "https://drive.google.com/file/d/demo-creditors/view" },
    { id: "DOC-000042", name: "Board_Minutes_2026.pdf", client: "Kampala Community Holdings Ltd", section: "01_PERMANENT_FILE", uploaded: "2026-10-08", owner: "Grace Nalwanga", type: "pdf", driveUrl: "https://drive.google.com/file/d/demo-minutes/view" },
    { id: "DOC-000043", name: "Payroll_Summary_FY2026.xlsx", client: "Kampala Community Holdings Ltd", section: "11_PAYROLL", uploaded: "2026-10-22", owner: "Grace Nalwanga", type: "xlsx", driveUrl: "https://drive.google.com/file/d/demo-payroll/view" },
    { id: "DOC-000044", name: "Revenue_Analysis_Q3.xlsx", client: "Kampala Community Holdings Ltd", section: "09_REVENUE", uploaded: "2026-10-19", owner: "Ndagire Dianah", type: "xlsx", driveUrl: "https://drive.google.com/file/d/demo-rev/view" },
    { id: "DOC-000045", name: "Management_Accounts_Sep2026.pdf", client: "Kampala Community Holdings Ltd", section: "15_FINANCIAL_STATEMENTS", uploaded: "2026-10-05", owner: "Grace Nalwanga", type: "pdf", driveUrl: "https://drive.google.com/file/d/demo-mgmt/view" }
  ],

  requests: [
    { id: "REQ-00017", clientId: "CLIENT-0001", clientName: "Kampala Community Holdings Ltd", engagementId: "ENG-2026-0001", request: "Please provide bank statements for all operating accounts for January–December 2026.", due: "2026-10-30", priority: "High", status: "Outstanding", assignedTo: "Ndagire Dianah", created: "2026-10-10" },
    { id: "REQ-00018", clientId: "CLIENT-0001", clientName: "Kampala Community Holdings Ltd", engagementId: "ENG-2026-0001", request: "Fixed Asset Register as at 31 December 2026 including depreciation schedule.", due: "2026-10-28", priority: "High", status: "Received", assignedTo: "Ndagire Dianah", created: "2026-10-08" },
    { id: "REQ-00019", clientId: "CLIENT-0001", clientName: "Kampala Community Holdings Ltd", engagementId: "ENG-2026-0001", request: "Debtors ageing report as at 31 December 2026 with subsequent receipts analysis.", due: "2026-10-25", priority: "Medium", status: "Received", assignedTo: "Ndagire Dianah", created: "2026-10-05" },
    { id: "REQ-00020", clientId: "CLIENT-0001", clientName: "Kampala Community Holdings Ltd", engagementId: "ENG-2026-0001", request: "Board minutes for all meetings held during the year ended 31 December 2026.", due: "2026-10-15", priority: "Medium", status: "Received", assignedTo: "Akampomugisha Pamella", created: "2026-09-28" },
    { id: "REQ-00021", clientId: "CLIENT-0001", clientName: "Kampala Community Holdings Ltd", engagementId: "ENG-2026-0001", request: "Trial Balance and General Ledger export for the year ended 31 December 2026.", due: "2026-10-12", priority: "High", status: "Received", assignedTo: "Ndagire Dianah", created: "2026-09-20" },
    { id: "REQ-00022", clientId: "CLIENT-0001", clientName: "Kampala Community Holdings Ltd", engagementId: "ENG-2026-0001", request: "Schedule of related party transactions and outstanding balances.", due: "2026-11-05", priority: "Medium", status: "Outstanding", assignedTo: "Ndagire Dianah", created: "2026-10-18" },
    { id: "REQ-00023", clientId: "CLIENT-0001", clientName: "Kampala Community Holdings Ltd", engagementId: "ENG-2026-0001", request: "Tax computations and correspondence with URA for the year under audit.", due: "2026-11-10", priority: "High", status: "Outstanding", assignedTo: "Akampomugisha Pamella", created: "2026-10-20" }
  ],

  workingPapers: [
    { id: "WP-00023", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "02_PLANNING", name: "Audit Planning Memorandum", preparedBy: "Ndagire Dianah", reviewer: "Akampomugisha Pamella", status: "Approved", created: "2026-09-05", lastModified: "2026-09-12", docUrl: "https://docs.google.com/document/d/demo-planning/edit" },
    { id: "WP-00024", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "03_RISK_ASSESSMENT", name: "Risk Assessment Summary", preparedBy: "Ndagire Dianah", reviewer: "Akampomugisha Pamella", status: "Approved", created: "2026-09-10", lastModified: "2026-09-18", docUrl: "https://docs.google.com/document/d/demo-risk/edit" },
    { id: "WP-BANK-001", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "04_CASH_AND_BANK", name: "Bank Testing Working Paper", preparedBy: "Ndagire Dianah", reviewer: "Akampomugisha Pamella", status: "Under Review", created: "2026-10-16", lastModified: "2026-10-25", docUrl: "https://docs.google.com/document/d/demo-bank-wp/edit" },
    { id: "WP-00026", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "05_RECEIVABLES", name: "Receivables Testing", preparedBy: "Ndagire Dianah", reviewer: "Akampomugisha Pamella", status: "Submitted for Review", created: "2026-10-18", lastModified: "2026-10-24", docUrl: "https://docs.google.com/document/d/demo-recv/edit" },
    { id: "WP-00027", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "07_FIXED_ASSETS", name: "Fixed Assets Testing", preparedBy: "Ndagire Dianah", reviewer: "Akampomugisha Pamella", status: "Prepared", created: "2026-10-21", lastModified: "2026-10-21", docUrl: "https://docs.google.com/document/d/demo-fa/edit" },
    { id: "WP-00028", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "09_REVENUE", name: "Revenue Testing", preparedBy: "Ndagire Dianah", reviewer: "Akampomugisha Pamella", status: "Prepared", created: "2026-10-19", lastModified: "2026-10-22", docUrl: "https://docs.google.com/document/d/demo-rev-wp/edit" },
    { id: "WP-00029", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "11_PAYROLL", name: "Payroll Testing", preparedBy: "Ndagire Dianah", reviewer: "Akampomugisha Pamella", status: "Prepared", created: "2026-10-22", lastModified: "2026-10-22", docUrl: "https://docs.google.com/document/d/demo-payroll-wp/edit" },
    { id: "WP-00030", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "16_SUBSEQUENT_EVENTS", name: "Subsequent Events Review", preparedBy: "Ndagire Dianah", reviewer: "Akampomugisha Pamella", status: "Prepared", created: "2026-10-23", lastModified: "2026-10-23", docUrl: "https://docs.google.com/document/d/demo-subseq/edit" }
  ],

  reviewNotes: [
    { id: "RN-0024", workingPaper: "WP-BANK-001", workingPaperName: "Bank Testing Working Paper", reviewer: "Akampomugisha Pamella", assignedTo: "Ndagire Dianah", priority: "High", comment: "Please explain the UGX 4,250,000 unreconciled difference appearing on the June bank reconciliation. Attach supporting evidence for any reconciling items older than 90 days.", response: "", status: "OPEN", created: "2026-10-25", resolved: null },
    { id: "RN-0025", workingPaper: "WP-BANK-001", workingPaperName: "Bank Testing Working Paper", reviewer: "Akampomugisha Pamella", assignedTo: "Ndagire Dianah", priority: "Medium", comment: "Confirm that all bank confirmations have been received directly from the banks and not via the client.", response: "All three confirmations (Stanbic, Absa, Centenary) were received directly via email from the bank relationship managers. Confirmation letters attached to the working paper.", status: "RESOLVED", created: "2026-10-24", resolved: "2026-10-26" },
    { id: "RN-0026", workingPaper: "WP-00026", workingPaperName: "Receivables Testing", reviewer: "Akampomugisha Pamella", assignedTo: "Ndagire Dianah", priority: "High", comment: "Sample selection for circularisation appears to cover only 42% of the balance. Expand sample to achieve at least 60% coverage of the receivables population.", response: "", status: "OPEN", created: "2026-10-25", resolved: null }
  ],

  tasks: [
    { id: "TASK-00128", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "04_CASH_AND_BANK", task: "Complete bank confirmation follow-up for Centenary Bank", assignedTo: "Ndagire Dianah", priority: "High", due: "2026-10-28", status: "IN PROGRESS", completed: null },
    { id: "TASK-00129", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "05_RECEIVABLES", task: "Expand receivables circularisation sample", assignedTo: "Ndagire Dianah", priority: "High", due: "2026-10-30", status: "TODO", completed: null },
    { id: "TASK-00130", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "07_FIXED_ASSETS", task: "Physical verification of selected assets at Kampala and Entebbe sites", assignedTo: "Ndagire Dianah", priority: "Medium", due: "2026-11-05", status: "TODO", completed: null },
    { id: "TASK-00131", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "09_REVENUE", task: "Perform substantive analytical procedures on rental income", assignedTo: "Ndagire Dianah", priority: "Medium", due: "2026-10-27", status: "OVERDUE", completed: null },
    { id: "TASK-00132", client: "Nile Valley Trading Co Ltd", engagement: "ENG-2026-0002", section: "02_PLANNING", task: "Complete understanding of entity and environment memo", assignedTo: "Akampomugisha Pamella", priority: "High", due: "2026-10-25", status: "OVERDUE", completed: null },
    { id: "TASK-00133", client: "Kampala Community Holdings Ltd", engagement: "ENG-2026-0001", section: "15_FINANCIAL_STATEMENTS", task: "Draft financial statement disclosure checklist", assignedTo: "Akampomugisha Pamella", priority: "Medium", due: "2026-11-08", status: "TODO", completed: null }
  ],

  activityLog: [
    { timestamp: "2026-10-27 10:32", user: "Ndagire Dianah", action: "Uploaded document", client: "Kampala Community Holdings Ltd", detail: "Bank Statement.pdf → 04_CASH_AND_BANK" },
    { timestamp: "2026-10-26 16:45", user: "Akampomugisha Pamella", action: "Created review note", client: "Kampala Community Holdings Ltd", detail: "RN-0024 on WP-BANK-001" },
    { timestamp: "2026-10-26 14:20", user: "Ndagire Dianah", action: "Submitted working paper for review", client: "Kampala Community Holdings Ltd", detail: "WP-BANK-001 Bank Testing" },
    { timestamp: "2026-10-25 11:05", user: "Grace Nalwanga", action: "Document received via portal", client: "Kampala Community Holdings Ltd", detail: "Fixed_Asset_Register.xlsx" },
    { timestamp: "2026-10-24 09:15", user: "Ndagire Dianah", action: "Created document request", client: "Kampala Community Holdings Ltd", detail: "REQ-00017 – Bank statements Jan–Dec 2026" },
    { timestamp: "2026-10-22 15:30", user: "Ndagire Dianah", action: "Created working paper", client: "Kampala Community Holdings Ltd", detail: "WP-00029 Payroll Testing" },
    { timestamp: "2026-10-20 10:00", user: "Tindyebwa Obed", action: "Engagement progress reviewed", client: "Kampala Community Holdings Ltd", detail: "Completion now 82%" }
  ]
};
