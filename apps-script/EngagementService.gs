/**
 * EngagementService
 */

function getEngagements() {
  const sheet = getSheet("ENGAGEMENTS");
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function createEngagement(payload) {
  const sheet = getSheet("ENGAGEMENTS");
  const id = "ENG-" + (payload.financialYear || new Date().getFullYear()) + "-" + Date.now().toString().slice(-4);

  sheet.appendRow([
    id,
    payload.clientId,
    payload.clientName,
    payload.type || "External Audit",
    payload.financialYear,
    payload.periodStart,
    payload.periodEnd,
    payload.partner,
    payload.manager,
    payload.expectedCompletion,
    "Planning",
    0,
    new Date().toISOString().slice(0, 10)
  ]);

  AuditLogService.log({
    user: Session.getActiveUser().getEmail(),
    action: "Engagement created",
    client: payload.clientName,
    detail: id
  });

  return { success: true, id: id };
}

function getDashboard() {
  return {
    activeAudits: getEngagements().filter(e => e.status !== "Completed").length,
    documents: Math.max(0, getSheet("DOCUMENTS").getLastRow() - 1),
    outstandingRequests: getDocumentRequests().filter(r => r.status === "Outstanding").length,
    reviewNotes: getReviewNotes().filter(n => n.status === "OPEN").length,
    overdueTasks: getTasks().filter(t => t.status === "OVERDUE").length,
    completedAudits: getEngagements().filter(e => e.status === "Completed").length
  };
}
