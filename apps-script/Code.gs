/**
 * AuditFlow — Google Apps Script Backend
 * Deploy as Web App. All endpoints are routed through doGet / doPost.
 *
 * Script Properties required:
 *   SPREADSHEET_ID
 *   ROOT_FOLDER_ID
 *   AI_PROVIDER_DEFAULT (optional)
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const action = (e.parameter && e.parameter.action) || (e.postData && JSON.parse(e.postData.contents).action) || "ping";
  const params = e.parameter || {};
  let body = {};
  try {
    if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
  } catch (err) {}

  let result;
  try {
    switch (action) {
      case "ping":
        result = { ok: true, version: "0.9.0-mvp", message: "AuditFlow backend ready" };
        break;
      case "getDashboard":
        result = getDashboard();
        break;
      case "getClients":
        result = getClients();
        break;
      case "createClient":
        result = createClient(body);
        break;
      case "getEngagements":
        result = getEngagements();
        break;
      case "createEngagement":
        result = createEngagement(body);
        break;
      case "searchDocuments":
        result = searchDocuments(params.q || body.q || "");
        break;
      case "createDocumentRequest":
        result = createDocumentRequest(body);
        break;
      case "getDocumentRequests":
        result = getDocumentRequests();
        break;
      case "uploadDocument":
        result = uploadDocument(body);
        break;
      case "createWorkingPaper":
        result = createWorkingPaper(body);
        break;
      case "getWorkingPapers":
        result = getWorkingPapers();
        break;
      case "createReviewNote":
        result = createReviewNote(body);
        break;
      case "resolveReviewNote":
        result = resolveReviewNote(body);
        break;
      case "getTasks":
        result = getTasks();
        break;
      case "updateTask":
        result = updateTask(body);
        break;
      case "getActivityLog":
        result = getActivityLog();
        break;
      case "aiAssist":
        result = aiAssist(body);
        break;
      default:
        result = { error: "Unknown action: " + action };
    }
  } catch (err) {
    result = { error: err.message, stack: err.stack };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function runDailyReminders() {
  NotificationService.sendDailyReminders();
}
