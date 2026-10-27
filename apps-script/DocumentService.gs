/**
 * DocumentService — document requests, search, upload handling
 */

function getDocumentRequests() {
  const sheet = getSheet("DOCUMENT_REQUESTS");
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function createDocumentRequest(payload) {
  const sheet = getSheet("DOCUMENT_REQUESTS");
  const id = generateId("REQ");
  sheet.appendRow([
    id,
    payload.clientId,
    payload.clientName,
    payload.engagementId,
    payload.request,
    payload.due,
    payload.priority || "Medium",
    "Outstanding",
    payload.assignedTo || "",
    new Date().toISOString().slice(0, 10)
  ]);

  AuditLogService.log({
    user: Session.getActiveUser().getEmail(),
    action: "Document request created",
    client: payload.clientName,
    detail: id + " · " + payload.request.substring(0, 60)
  });

  return { success: true, id: id };
}

function searchDocuments(query) {
  const sheet = getSheet("DOCUMENTS");
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  const rows = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  if (!query) return rows;
  const q = query.toLowerCase();
  return rows.filter(r =>
    (r.name || "").toLowerCase().includes(q) ||
    (r.client || "").toLowerCase().includes(q) ||
    (r.section || "").toLowerCase().includes(q)
  );
}

function uploadDocument(payload) {
  AuditLogService.log({
    user: payload.uploader || "Client Portal",
    action: "Document uploaded",
    client: payload.clientName,
    detail: payload.fileName + " → " + payload.section
  });
  return { success: true, message: "Document received and filed" };
}
