/**
 * ClientService — create clients and generate Drive structure
 */

function getClients() {
  const sheet = getSheet("CLIENTS");
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function createClient(payload) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName("CLIENTS");
  const id = generateId("CLIENT");

  const rootId = PropertiesService.getScriptProperties().getProperty("ROOT_FOLDER_ID");
  const clientsFolder = DriveService.findOrCreateFolder(rootId, "CLIENTS");
  const clientFolder = DriveService.createClientFolder(clientsFolder.getId(), payload.name);

  sheet.appendRow([
    id,
    payload.name,
    payload.registrationNumber || "",
    payload.tin || "",
    payload.industry || "",
    payload.address || "",
    payload.contactPerson || "",
    payload.email || "",
    payload.telephone || "",
    payload.engagementPartner || "",
    payload.auditManager || "",
    payload.riskRating || "Medium",
    "Active",
    new Date().toISOString().slice(0, 10),
    clientFolder.getId()
  ]);

  AuditLogService.log({
    user: Session.getActiveUser().getEmail(),
    action: "Client created",
    client: payload.name,
    detail: id + " · Drive folder created"
  });

  return { success: true, id: id, folderId: clientFolder.getId() };
}

function generateId(prefix) {
  const ts = Date.now().toString().slice(-6);
  return prefix + "-" + ts;
}

function getSpreadsheet() {
  const id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  return SpreadsheetApp.openById(id);
}

function getSheet(name) {
  return getSpreadsheet().getSheetByName(name);
}
