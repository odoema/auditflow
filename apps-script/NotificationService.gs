/**
 * NotificationService — daily reminders via email (extensible to WhatsApp/SMS later)
 */

function sendDailyReminders() {
  const tasks = getTasks().filter(t => t.status === "OVERDUE" || t.status === "TODO");
  const requests = getDocumentRequests().filter(r => r.status === "Outstanding");
  const notes = getReviewNotes().filter(n => n.status === "OPEN");

  Logger.log("Daily reminder run: " + tasks.length + " tasks, " +
    requests.length + " requests, " + notes.length + " open notes");
}
