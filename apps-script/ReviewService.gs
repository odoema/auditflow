/**
 * ReviewService — review notes and workflow state
 */

function getReviewNotes() {
  const sheet = getSheet("REVIEW_NOTES");
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function createReviewNote(payload) {
  const sheet = getSheet("REVIEW_NOTES");
  const id = generateId("RN");
  sheet.appendRow([
    id,
    payload.workingPaperId,
    payload.workingPaperName,
    payload.reviewer,
    payload.assignedTo,
    payload.priority || "Medium",
    payload.comment,
    "",
    "OPEN",
    new Date().toISOString().slice(0, 10),
    ""
  ]);

  AuditLogService.log({
    user: payload.reviewer,
    action: "Review note created",
    client: payload.clientName || "",
    detail: id + " on " + payload.workingPaperId
  });

  return { success: true, id: id };
}

function resolveReviewNote(payload) {
  AuditLogService.log({
    user: payload.responder,
    action: "Review note resolved",
    client: payload.clientName || "",
    detail: payload.id
  });
  return { success: true };
}
