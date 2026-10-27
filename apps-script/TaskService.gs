/**
 * TaskService
 */

function getTasks() {
  const sheet = getSheet("TASKS");
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function updateTask(payload) {
  AuditLogService.log({
    user: payload.user || Session.getActiveUser().getEmail(),
    action: "Task updated",
    client: payload.client || "",
    detail: payload.id + " → " + payload.status
  });
  return { success: true };
}
