/**
 * AuditLogService — immutable activity trail
 */

function log(entry) {
  const sheet = getSheet("ACTIVITY_LOG");
  sheet.appendRow([
    new Date().toISOString().replace("T", " ").slice(0, 16),
    entry.user || "",
    entry.action || "",
    entry.client || "",
    entry.detail || ""
  ]);
}

function getActivityLog() {
  const sheet = getSheet("ACTIVITY_LOG");
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  }).reverse();
}
