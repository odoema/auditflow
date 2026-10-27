/**
 * DriveService — standardised audit folder structure
 */

const AUDIT_SECTIONS = [
  "00_CLIENT_MASTER",
  "01_PERMANENT_FILE",
  "02_PLANNING",
  "03_RISK_ASSESSMENT",
  "04_CASH_AND_BANK",
  "05_RECEIVABLES",
  "06_INVENTORY",
  "07_FIXED_ASSETS",
  "08_PAYABLES",
  "09_REVENUE",
  "10_EXPENSES",
  "11_PAYROLL",
  "12_TAX",
  "13_LOANS",
  "14_EQUITY",
  "15_FINANCIAL_STATEMENTS",
  "16_SUBSEQUENT_EVENTS",
  "17_MANAGEMENT_LETTER",
  "18_AUDIT_REPORT",
  "99_ARCHIVE"
];

function createClientFolder(parentId, clientName) {
  const parent = DriveApp.getFolderById(parentId);
  const clientFolder = parent.createFolder(clientName);
  createAuditSectionFolders(clientFolder.getId());
  return clientFolder;
}

function createAuditSectionFolders(clientFolderId) {
  const clientFolder = DriveApp.getFolderById(clientFolderId);
  AUDIT_SECTIONS.forEach(section => {
    clientFolder.createFolder(section);
  });
}

function findOrCreateFolder(parentId, name) {
  const parent = DriveApp.getFolderById(parentId);
  const folders = parent.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return parent.createFolder(name);
}

function findClientFolder(clientName) {
  const rootId = PropertiesService.getScriptProperties().getProperty("ROOT_FOLDER_ID");
  const clientsFolder = findOrCreateFolder(rootId, "CLIENTS");
  const folders = clientsFolder.getFoldersByName(clientName);
  if (folders.hasNext()) return folders.next();
  return null;
}

function moveDocumentToAuditSection(fileId, clientName, section) {
  const file = DriveApp.getFileById(fileId);
  const clientFolder = findClientFolder(clientName);
  if (!clientFolder) throw new Error("Client folder not found: " + clientName);
  const sectionFolders = clientFolder.getFoldersByName(section);
  if (!sectionFolders.hasNext()) throw new Error("Section folder not found: " + section);
  const target = sectionFolders.next();
  const parents = file.getParents();
  while (parents.hasNext()) {
    parents.next().removeFile(file);
  }
  target.addFile(file);
  return target.getId();
}

function createWorkingPaperFromTemplate(templateId, clientName, section, title) {
  const template = DriveApp.getFileById(templateId);
  const clientFolder = findClientFolder(clientName);
  if (!clientFolder) throw new Error("Client folder not found");
  const sectionFolders = clientFolder.getFoldersByName(section);
  if (!sectionFolders.hasNext()) throw new Error("Section not found");
  const target = sectionFolders.next();
  const copy = template.makeCopy(title, target);
  return {
    id: copy.getId(),
    url: copy.getUrl()
  };
}

function getDriveFileMetadata(fileId) {
  const file = DriveApp.getFileById(fileId);
  return {
    id: file.getId(),
    name: file.getName(),
    mimeType: file.getMimeType(),
    url: file.getUrl(),
    lastUpdated: file.getLastUpdated(),
    size: file.getSize()
  };
}
