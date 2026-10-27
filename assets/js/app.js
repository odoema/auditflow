/**
 * AuditFlow Core Application Logic
 * Handles navigation, data loading (demo or live API), UI rendering and interactions.
 */

const AF = {
  currentPage: "dashboard",
  data: null,

  async init() {
    this.bindNav();
    this.bindMobileToggle();
    await this.loadData();
    this.route();
    window.addEventListener("hashchange", () => this.route());
  },

  async loadData() {
    if (AUDITFLOW_CONFIG.DEMO_MODE) {
      this.data = DEMO_DATA;
      return;
    }
    try {
      const res = await fetch(`${AUDITFLOW_CONFIG.API_BASE}?action=getDashboard`);
      this.data = await res.json();
    } catch (e) {
      console.warn("API unavailable, falling back to demo data", e);
      this.data = DEMO_DATA;
    }
  },

  bindNav() {
    document.querySelectorAll(".af-nav a").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        if (page) {
          window.location.hash = page;
          document.querySelectorAll(".af-nav a").forEach(a => a.classList.remove("active"));
          link.classList.add("active");
          document.querySelector(".af-sidebar")?.classList.remove("open");
        }
      });
    });
  },

  bindMobileToggle() {
    const btn = document.getElementById("mobileToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        document.querySelector(".af-sidebar").classList.toggle("open");
      });
    }
  },

  route() {
    const hash = (window.location.hash || "#dashboard").slice(1);
    this.currentPage = hash;
    document.querySelectorAll(".af-nav a").forEach(a => {
      a.classList.toggle("active", a.getAttribute("data-page") === hash);
    });
    this.renderPage(hash);
  },

  renderPage(page) {
    const content = document.getElementById("afContent");
    const title = document.getElementById("pageTitle");
    if (!content) return;

    const titles = {
      dashboard: "Dashboard", clients: "Clients", engagements: "Engagements",
      documents: "Documents", requests: "Document Requests",
      "working-papers": "Working Papers", review: "Review Notes",
      tasks: "Tasks", reports: "Reports", ai: "Audit AI Assistant", settings: "Settings"
    };
    if (title) title.textContent = titles[page] || "AuditFlow";

    switch (page) {
      case "dashboard": this.renderDashboard(content); break;
      case "clients": this.renderClients(content); break;
      case "engagements": this.renderEngagements(content); break;
      case "documents": this.renderDocuments(content); break;
      case "requests": this.renderRequests(content); break;
      case "working-papers": this.renderWorkingPapers(content); break;
      case "review": this.renderReview(content); break;
      case "tasks": this.renderTasks(content); break;
      case "reports": this.renderReports(content); break;
      case "ai": this.renderAI(content); break;
      case "settings": this.renderSettings(content); break;
      default: this.renderDashboard(content);
    }
  },

  renderDashboard(el) {
    const d = this.data.dashboard;
    el.innerHTML = `
      <div class="af-stat-grid">
        <div class="af-stat-card"><div class="stat-label">Active Audits</div><div class="stat-value">${d.activeAudits}</div></div>
        <div class="af-stat-card info"><div class="stat-label">Documents</div><div class="stat-value">${d.documents.toLocaleString()}</div></div>
        <div class="af-stat-card warning"><div class="stat-label">Outstanding Requests</div><div class="stat-value">${d.outstandingRequests}</div></div>
        <div class="af-stat-card accent"><div class="stat-label">Review Notes</div><div class="stat-value">${d.reviewNotes}</div></div>
        <div class="af-stat-card danger"><div class="stat-label">Overdue Tasks</div><div class="stat-value">${d.overdueTasks}</div></div>
        <div class="af-stat-card success"><div class="stat-label">Completed Audits</div><div class="stat-value">${d.completedAudits}</div></div>
      </div>
      <div class="row g-3">
        <div class="col-lg-8">
          <div class="af-card mb-3">
            <div class="af-card-header"><h3>Active Engagements</h3><a href="#engagements" class="btn-af btn-af-sm btn-af-outline">View all</a></div>
            <div class="af-card-body p-0">
              <table class="af-table">
                <thead><tr><th>Client</th><th>Year</th><th>Status</th><th>Progress</th><th>Due</th></tr></thead>
                <tbody>
                  ${this.data.engagements.map(e => `
                    <tr>
                      <td><strong>${e.clientName}</strong><br><small class="text-muted">${e.id}</small></td>
                      <td>${e.financialYear}</td>
                      <td><span class="badge-af badge-${e.status === 'In Progress' ? 'progress' : e.status === 'Planning' ? 'todo' : 'submitted'}">${e.status}</span></td>
                      <td style="width:140px"><div class="d-flex align-center gap-1"><div class="af-progress" style="flex:1"><div class="af-progress-bar" style="width:${e.completionPct}%"></div></div><small>${e.completionPct}%</small></div></td>
                      <td>${e.expectedCompletion}</td>
                    </tr>`).join("")}
                </tbody>
              </table>
            </div>
          </div>
          <div class="af-card">
            <div class="af-card-header"><h3>Recent Activity</h3></div>
            <div class="af-card-body p-0">
              <table class="af-table">
                <thead><tr><th>When</th><th>User</th><th>Action</th><th>Detail</th></tr></thead>
                <tbody>
                  ${this.data.activityLog.slice(0, 6).map(a => `
                    <tr><td><small>${a.timestamp}</small></td><td>${a.user}</td><td>${a.action}</td><td><small class="text-muted">${a.detail}</small></td></tr>`).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="af-card mb-3">
            <div class="af-card-header"><h3>Focus Client</h3></div>
            <div class="af-card-body">
              <h4 class="text-primary mb-1" style="font-size:1.05rem">Kampala Community Holdings Ltd</h4>
              <p class="text-muted mb-2" style="font-size:0.85rem">ENG-2026-0001 · External Audit · FY2026</p>
              <div class="af-progress mb-2"><div class="af-progress-bar" style="width:82%"></div></div>
              <p class="mb-2"><strong>82%</strong> complete · Expected 15 Nov 2026</p>
              <div class="d-flex gap-1 flex-wrap">
                <a href="#requests" class="btn-af btn-af-sm btn-af-outline">Requests</a>
                <a href="#working-papers" class="btn-af btn-af-sm btn-af-outline">Working Papers</a>
                <a href="#review" class="btn-af btn-af-sm btn-af-outline">Review</a>
              </div>
            </div>
          </div>
          <div class="af-card mb-3">
            <div class="af-card-header"><h3>Open Review Notes</h3></div>
            <div class="af-card-body">
              ${this.data.reviewNotes.filter(n => n.status === "OPEN").map(n => `
                <div style="border-left:3px solid var(--af-danger);padding-left:0.75rem;margin-bottom:1rem">
                  <div class="d-flex justify-between"><strong>${n.id}</strong><span class="badge-af badge-high">${n.priority}</span></div>
                  <small class="text-muted">${n.workingPaperName}</small>
                  <p style="font-size:0.85rem;margin:0.35rem 0 0">${n.comment.substring(0, 90)}…</p>
                </div>`).join("") || "<p class='text-muted'>No open notes</p>"}
              <a href="#review" class="btn-af btn-af-sm btn-af-primary w-100" style="justify-content:center">View all notes</a>
            </div>
          </div>
          <div class="af-card">
            <div class="af-card-header"><h3>Overdue Tasks</h3></div>
            <div class="af-card-body">
              ${this.data.tasks.filter(t => t.status === "OVERDUE").map(t => `
                <div style="margin-bottom:0.85rem"><strong style="font-size:0.9rem">${t.task}</strong><div class="text-muted" style="font-size:0.8rem">${t.client} · Due ${t.due}</div></div>`).join("") || "<p class='text-muted'>None</p>"}
              <a href="#tasks" class="btn-af btn-af-sm btn-af-outline w-100" style="justify-content:center">Task board</a>
            </div>
          </div>
        </div>
      </div>`;
  },

  renderClients(el) {
    el.innerHTML = `
      <div class="d-flex justify-between align-center mb-2">
        <p class="text-muted mb-0">Manage audit clients and automatically generate Drive structures.</p>
        <button class="btn-af btn-af-primary" onclick="AF.openNewClientModal()"><i class="bi bi-plus-lg"></i> New Client</button>
      </div>
      <div class="af-card"><div class="af-card-body p-0">
        <table class="af-table">
          <thead><tr><th>Client ID</th><th>Name</th><th>Industry</th><th>Partner</th><th>Manager</th><th>Risk</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${this.data.clients.map(c => `
              <tr>
                <td><code>${c.id}</code></td>
                <td><strong>${c.name}</strong><br><small class="text-muted">${c.tin}</small></td>
                <td>${c.industry}</td><td>${c.engagementPartner}</td><td>${c.auditManager}</td>
                <td><span class="badge-af badge-${c.riskRating === 'High' ? 'high' : c.riskRating === 'Medium' ? 'medium' : 'low'}">${c.riskRating}</span></td>
                <td><span class="badge-af badge-completed">${c.status}</span></td>
                <td><button class="btn-af btn-af-sm btn-af-outline" onclick="AF.viewClient('${c.id}')">Open</button></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div></div><div id="modalContainer"></div>`;
  },

  openNewClientModal() {
    const modal = document.createElement("div");
    modal.className = "af-modal-backdrop show";
    modal.id = "newClientModal";
    modal.innerHTML = `
      <div class="af-modal">
        <div class="af-modal-header"><h3>New Client</h3><button class="btn-af btn-af-sm btn-af-outline" onclick="document.getElementById('newClientModal').remove()">×</button></div>
        <div class="af-modal-body">
          <div class="row g-2">
            <div class="col-12 af-form-group"><label>Client Name *</label><input class="af-form-control" id="nc_name" placeholder="e.g. Kampala Community Holdings Ltd"></div>
            <div class="col-md-6 af-form-group"><label>Registration Number</label><input class="af-form-control" id="nc_reg"></div>
            <div class="col-md-6 af-form-group"><label>TIN</label><input class="af-form-control" id="nc_tin"></div>
            <div class="col-12 af-form-group"><label>Industry</label><input class="af-form-control" id="nc_industry"></div>
            <div class="col-12 af-form-group"><label>Address</label><input class="af-form-control" id="nc_address"></div>
            <div class="col-md-6 af-form-group"><label>Contact Person</label><input class="af-form-control" id="nc_contact"></div>
            <div class="col-md-6 af-form-group"><label>Email</label><input class="af-form-control" id="nc_email" type="email"></div>
            <div class="col-md-6 af-form-group"><label>Telephone</label><input class="af-form-control" id="nc_tel"></div>
            <div class="col-md-6 af-form-group"><label>Risk Rating</label><select class="af-form-control" id="nc_risk"><option>Low</option><option selected>Medium</option><option>High</option></select></div>
            <div class="col-md-6 af-form-group"><label>Engagement Partner</label><input class="af-form-control" id="nc_partner" value="Demo Partner"></div>
            <div class="col-md-6 af-form-group"><label>Audit Manager</label><input class="af-form-control" id="nc_manager" value="Demo Manager"></div>
          </div>
          <p class="text-muted mt-2" style="font-size:0.8rem">On save, Apps Script will create the client folder structure in Google Drive, a client record in Sheets, and the initial checklist.</p>
        </div>
        <div class="af-modal-footer">
          <button class="btn-af btn-af-outline" onclick="document.getElementById('newClientModal').remove()">Cancel</button>
          <button class="btn-af btn-af-primary" onclick="AF.createClient()">Create Client</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  },

  createClient() {
    const name = document.getElementById("nc_name")?.value?.trim();
    if (!name) { alert("Client name is required"); return; }
    alert(`Client "${name}" would be created.\n\nApps Script would:\n1. Create Drive folder structure\n2. Add record to CLIENTS sheet\n3. Generate client ID\n4. Create initial checklist & templates\n5. Log the activity`);
    document.getElementById("newClientModal")?.remove();
  },

  viewClient(id) {
    const c = this.data.clients.find(x => x.id === id);
    if (!c) return;
    alert(`${c.name}\n\nID: ${c.id}\nTIN: ${c.tin}\nPartner: ${c.engagementPartner}\nManager: ${c.auditManager}\nRisk: ${c.riskRating}\n\nIn the full system this opens the client workspace with engagements, documents and Drive link.`);
  },

  renderEngagements(el) {
    el.innerHTML = `
      <div class="d-flex justify-between align-center mb-2">
        <p class="text-muted mb-0">Audit engagements linked to clients.</p>
        <button class="btn-af btn-af-primary" onclick="AF.openNewEngagementModal()"><i class="bi bi-plus-lg"></i> New Engagement</button>
      </div>
      <div class="af-card"><div class="af-card-body p-0">
        <table class="af-table">
          <thead><tr><th>Engagement</th><th>Client</th><th>Type</th><th>Period</th><th>Partner / Manager</th><th>Progress</th><th>Status</th></tr></thead>
          <tbody>
            ${this.data.engagements.map(e => `
              <tr>
                <td><code>${e.id}</code></td><td><strong>${e.clientName}</strong></td><td>${e.type}</td>
                <td>${e.periodStart} – ${e.periodEnd}</td>
                <td>${e.partner}<br><small class="text-muted">${e.manager}</small></td>
                <td style="width:130px"><div class="af-progress"><div class="af-progress-bar" style="width:${e.completionPct}%"></div></div><small>${e.completionPct}%</small></td>
                <td><span class="badge-af badge-progress">${e.status}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div></div>`;
  },

  openNewEngagementModal() {
    alert("New Engagement form would open here.\n\nOn submit, Apps Script creates the engagement record and ensures the full audit section folder structure exists under the client in Google Drive.");
  },

  renderDocuments(el) {
    el.innerHTML = `
      <div class="d-flex justify-between align-center mb-2 flex-wrap gap-1">
        <div class="d-flex gap-1" style="flex:1;max-width:420px">
          <input class="af-form-control" id="docSearch" placeholder="Search documents (e.g. bank statement)…" onkeyup="AF.searchDocuments()">
        </div>
        <p class="text-muted mb-0" style="font-size:0.85rem">Files remain in Google Drive — AuditFlow is the intelligent layer.</p>
      </div>
      <div class="af-card"><div class="af-card-body p-0">
        <table class="af-table" id="docTable">
          <thead><tr><th>Document</th><th>Client</th><th>Section</th><th>Uploaded</th><th>Owner</th><th>Type</th><th></th></tr></thead>
          <tbody>${this.data.documents.map(d => this.docRow(d)).join("")}</tbody>
        </table>
      </div></div>`;
  },

  docRow(d) {
    return `<tr>
      <td><strong>${d.name}</strong><br><small class="text-muted">${d.id}</small></td>
      <td>${d.client}</td><td><code style="font-size:0.75rem">${d.section}</code></td>
      <td>${d.uploaded}</td><td>${d.owner}</td><td>${d.type.toUpperCase()}</td>
      <td><a href="${d.driveUrl}" target="_blank" class="btn-af btn-af-sm btn-af-outline">Open in Drive</a></td>
    </tr>`;
  },

  searchDocuments() {
    const q = (document.getElementById("docSearch")?.value || "").toLowerCase();
    const tbody = document.querySelector("#docTable tbody");
    if (!tbody) return;
    const filtered = this.data.documents.filter(d =>
      d.name.toLowerCase().includes(q) || d.client.toLowerCase().includes(q) || d.section.toLowerCase().includes(q)
    );
    tbody.innerHTML = filtered.map(d => this.docRow(d)).join("") || `<tr><td colspan="7" class="text-center text-muted">No documents match “${q}”</td></tr>`;
  },

  renderRequests(el) {
    el.innerHTML = `
      <div class="d-flex justify-between align-center mb-2">
        <p class="text-muted mb-0">Document requests sent to clients. Uploads land in the correct Drive folder.</p>
        <button class="btn-af btn-af-primary" onclick="AF.openNewRequestModal()"><i class="bi bi-plus-lg"></i> New Request</button>
      </div>
      <div class="af-card"><div class="af-card-body p-0">
        <table class="af-table">
          <thead><tr><th>ID</th><th>Client</th><th>Request</th><th>Due</th><th>Priority</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${this.data.requests.map(r => `
              <tr>
                <td><code>${r.id}</code></td><td>${r.clientName}</td>
                <td style="max-width:280px">${r.request}</td><td>${r.due}</td>
                <td><span class="badge-af badge-${r.priority.toLowerCase()}">${r.priority}</span></td>
                <td><span class="badge-af badge-${r.status === 'Outstanding' ? 'outstanding' : 'received'}">${r.status}</span></td>
                <td>${r.status === 'Outstanding' ? `<a href="client-portal.html?token=${r.id}" target="_blank" class="btn-af btn-af-sm btn-af-accent">Client Link</a>` : ''}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div></div>`;
  },

  openNewRequestModal() {
    alert("New Document Request form.\n\nCreates a record in DOCUMENT_REQUESTS sheet, optionally emails the client a secure upload link, and logs the activity.");
  },

  renderWorkingPapers(el) {
    el.innerHTML = `
      <div class="d-flex justify-between align-center mb-2">
        <p class="text-muted mb-0">Working papers are real Google Docs stored in the correct Drive section folders.</p>
        <button class="btn-af btn-af-primary" onclick="AF.createWorkingPaper()"><i class="bi bi-plus-lg"></i> New Working Paper</button>
      </div>
      <div class="af-card"><div class="af-card-body p-0">
        <table class="af-table">
          <thead><tr><th>WP ID</th><th>Working Paper</th><th>Section</th><th>Prepared By</th><th>Reviewer</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${this.data.workingPapers.map(wp => `
              <tr>
                <td><code>${wp.id}</code></td>
                <td><strong>${wp.name}</strong><br><small class="text-muted">${wp.client}</small></td>
                <td><code style="font-size:0.75rem">${wp.section}</code></td>
                <td>${wp.preparedBy}</td><td>${wp.reviewer}</td>
                <td><span class="badge-af badge-${wp.status === 'Approved' ? 'approved' : wp.status === 'Under Review' ? 'progress' : wp.status === 'Submitted for Review' ? 'submitted' : 'todo'}">${wp.status}</span></td>
                <td><a href="${wp.docUrl}" target="_blank" class="btn-af btn-af-sm btn-af-primary">Open Working Paper</a></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div></div>`;
  },

  createWorkingPaper() {
    alert("Select a template (Planning Memo, Bank Testing, Receivables Testing, etc.).\n\nApps Script copies the template Google Doc into the correct client section folder and registers it in the WORKING_PAPERS sheet.");
  },

  renderReview(el) {
    el.innerHTML = `
      <div class="d-flex justify-between align-center mb-2">
        <p class="text-muted mb-0">Review notes attached to working papers. Workflow stays in AuditFlow; the document stays in Google Docs.</p>
        <button class="btn-af btn-af-primary" onclick="AF.createReviewNote()"><i class="bi bi-plus-lg"></i> New Review Note</button>
      </div>
      <div class="row g-3">
        ${this.data.reviewNotes.map(n => `
          <div class="col-md-6">
            <div class="af-card h-100">
              <div class="af-card-header"><h3>${n.id} · ${n.workingPaper}</h3><span class="badge-af badge-${n.status === 'OPEN' ? 'open' : 'resolved'}">${n.status}</span></div>
              <div class="af-card-body">
                <div class="d-flex justify-between mb-1"><small class="text-muted">Reviewer: ${n.reviewer}</small><span class="badge-af badge-${n.priority.toLowerCase()}">${n.priority}</span></div>
                <p style="font-size:0.9rem">${n.comment}</p>
                ${n.response ? `<div style="background:#f0fdf4;border-left:3px solid var(--af-success);padding:0.6rem 0.8rem;border-radius:4px;font-size:0.85rem"><strong>Response:</strong> ${n.response}</div>` : `<button class="btn-af btn-af-sm btn-af-outline mt-1" onclick="AF.respondToNote('${n.id}')">Respond</button>`}
                <div class="text-muted mt-2" style="font-size:0.75rem">Created ${n.created}${n.resolved ? ` · Resolved ${n.resolved}` : ''}</div>
              </div>
            </div>
          </div>`).join("")}
      </div>`;
  },

  createReviewNote() { alert("Create Review Note against a working paper.\nStored in REVIEW_NOTES sheet with status OPEN."); },
  respondToNote(id) {
    const response = prompt("Enter your response to the review note:");
    if (response) alert(`Response recorded for ${id}.\nIn the live system this updates the sheet and can notify the reviewer.`);
  },

  renderTasks(el) {
    const statuses = ["TODO", "IN PROGRESS", "SUBMITTED", "UNDER REVIEW", "COMPLETED", "OVERDUE"];
    el.innerHTML = `
      <div class="d-flex justify-between align-center mb-2">
        <p class="text-muted mb-0">Task board powered by Google Sheets.</p>
        <button class="btn-af btn-af-primary" onclick="alert('New Task form → writes to TASKS sheet')"><i class="bi bi-plus-lg"></i> New Task</button>
      </div>
      <div class="row g-2">
        ${statuses.map(status => {
          const items = this.data.tasks.filter(t => t.status === status);
          return `<div class="col-md-4 col-lg-2"><div class="af-card h-100">
            <div class="af-card-header" style="padding:0.65rem 0.85rem"><h3 style="font-size:0.8rem">${status} (${items.length})</h3></div>
            <div class="af-card-body" style="padding:0.6rem">
              ${items.map(t => `<div style="background:#f8fafc;border:1px solid var(--af-border);border-radius:6px;padding:0.6rem;margin-bottom:0.5rem;font-size:0.8rem">
                <strong>${t.task}</strong>
                <div class="text-muted" style="font-size:0.7rem;margin-top:0.25rem">${t.client}</div>
                <div class="d-flex justify-between mt-1"><span class="badge-af badge-${t.priority.toLowerCase()}">${t.priority}</span><small>${t.due}</small></div>
              </div>`).join("") || "<p class='text-muted' style='font-size:0.8rem'>—</p>"}
            </div></div></div>`;
        }).join("")}
      </div>`;
  },

  renderReports(el) {
    el.innerHTML = `<div class="af-card"><div class="af-card-body">
      <h3 class="text-primary">Reports (MVP)</h3>
      <p class="text-muted">Future reports will pull live data from the Sheets datastore:</p>
      <ul><li>Engagement Progress Summary</li><li>Outstanding Document Requests by Client</li><li>Open Review Notes Ageing</li><li>Overdue Tasks by Assignee</li><li>Activity Log Export</li><li>Partner Dashboard Snapshot</li></ul>
      <p class="text-muted">All generated on demand via Apps Script and optionally exported as PDF or Google Sheet.</p>
    </div></div>`;
  },

  renderAI(el) {
    el.innerHTML = `
      <div class="af-card">
        <div class="af-card-header">
          <h3>Audit AI Assistant</h3>
          <div class="d-flex gap-1 align-center">
            <label style="font-size:0.8rem;color:var(--af-text-muted)">Provider:</label>
            <select class="af-form-control" style="width:auto;padding:0.3rem 0.6rem;font-size:0.8rem" id="aiProvider">
              <option value="grok">Grok</option><option value="chatgpt">ChatGPT</option><option value="claude">Claude</option>
            </select>
          </div>
        </div>
        <div class="af-card-body">
          <div class="af-chat-container">
            <div class="af-chat-messages" id="chatMessages">
              <div class="af-chat-msg ai">
                <div class="ai-label">AI · Grok</div>
                Hello. I am the AuditFlow AI assistant. I can help you find outstanding documents, summarise review notes, locate working papers and draft preliminary summaries.<br><br>
                <strong>I never approve audits, issue opinions or modify evidence.</strong> All suggestions require professional auditor review.
              </div>
            </div>
            <div class="af-chat-input-row">
              <input class="af-form-control" id="chatInput" placeholder="Ask about outstanding documents, review notes, tasks…" onkeydown="if(event.key==='Enter')AF.sendChat()">
              <button class="btn-af btn-af-primary" onclick="AF.sendChat()">Send</button>
            </div>
            <div class="mt-2 d-flex gap-1 flex-wrap">
              <button class="btn-af btn-af-sm btn-af-outline" onclick="AF.quickAsk('What documents are still missing for Kampala Community Holdings Ltd?')">Missing documents</button>
              <button class="btn-af btn-af-sm btn-af-outline" onclick="AF.quickAsk('Summarise unresolved review notes')">Open review notes</button>
              <button class="btn-af btn-af-sm btn-af-outline" onclick="AF.quickAsk('What tasks are overdue?')">Overdue tasks</button>
            </div>
          </div>
        </div>
      </div>`;
  },

  quickAsk(q) { document.getElementById("chatInput").value = q; this.sendChat(); },

  sendChat() {
    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");
    const q = (input?.value || "").trim();
    if (!q) return;
    messages.innerHTML += `<div class="af-chat-msg user">${q}</div>`;
    input.value = "";
    setTimeout(() => {
      let answer = this.generateDemoAIResponse(q);
      messages.innerHTML += `<div class="af-chat-msg ai"><div class="ai-label">AI-generated assistance — professional auditor review required</div>${answer}</div>`;
      messages.scrollTop = messages.scrollHeight;
    }, 600);
  },

  generateDemoAIResponse(q) {
    const lower = q.toLowerCase();
    if (lower.includes("missing") || lower.includes("outstanding") || lower.includes("still")) {
      const outstanding = this.data.requests.filter(r => r.status === "Outstanding" && r.clientName.includes("Kampala"));
      return `There are currently <strong>${outstanding.length} outstanding document requests</strong> for Kampala Community Holdings Ltd (FY2026):
        <ol style="margin:0.5rem 0 0.75rem;padding-left:1.2rem">
          ${outstanding.map(r => `<li><strong>${r.request.substring(0, 70)}…</strong><br><small>Due ${r.due} · ${r.priority} priority · ${r.id}</small></li>`).join("")}
        </ol>
        <a href="#requests" class="btn-af btn-af-sm btn-af-primary">View Requests</a>`;
    }
    if (lower.includes("review") || lower.includes("note")) {
      const open = this.data.reviewNotes.filter(n => n.status === "OPEN");
      return `There are <strong>${open.length} open review notes</strong>:
        <ul style="margin:0.5rem 0">${open.map(n => `<li><strong>${n.id}</strong> on ${n.workingPaperName}<br><small>${n.comment.substring(0, 80)}…</small></li>`).join("")}</ul>
        <a href="#review" class="btn-af btn-af-sm btn-af-primary">View Review Notes</a>`;
    }
    if (lower.includes("overdue") || lower.includes("task")) {
      const overdue = this.data.tasks.filter(t => t.status === "OVERDUE");
      return `<strong>${overdue.length} overdue tasks</strong> found:
        <ul style="margin:0.5rem 0">${overdue.map(t => `<li>${t.task} <small>(${t.client} · due ${t.due})</small></li>`).join("")}</ul>
        <a href="#tasks" class="btn-af btn-af-sm btn-af-primary">Open Task Board</a>`;
    }
    if (lower.includes("bank") || lower.includes("reconcil")) {
      return `Documents related to bank reconciliations for Kampala Community Holdings Ltd:
        <ul style="margin:0.5rem 0"><li>Bank_Statement_January.pdf</li><li>Bank_Statement_February.pdf</li><li>Bank_Reconciliation_June.pdf</li><li>Working Paper: WP-BANK-001 – Bank Testing (currently Under Review)</li></ul>
        Open review note RN-0024 asks for explanation of the UGX 4,250,000 unreconciled difference.<br><br>
        <a href="#documents" class="btn-af btn-af-sm btn-af-outline">Search Documents</a>
        <a href="#review" class="btn-af btn-af-sm btn-af-outline">View Note</a>`;
    }
    return `I can help with:<ul style="margin:0.5rem 0"><li>Outstanding documents for any engagement</li><li>Summaries of open review notes</li><li>Overdue tasks</li><li>Locating documents by section or keyword</li><li>Draft working-paper summaries</li></ul>Try one of the quick prompts below, or ask a specific question about Kampala Community Holdings Ltd.`;
  },

  renderSettings(el) {
    el.innerHTML = `<div class="af-card"><div class="af-card-body">
      <h3 class="text-primary">Settings</h3>
      <p><strong>Mode:</strong> ${AUDITFLOW_CONFIG.DEMO_MODE ? "Demo (static data)" : "Live (Apps Script API)"}</p>
      <p><strong>API Base:</strong> <code>${AUDITFLOW_CONFIG.API_BASE}</code></p>
      <p><strong>Version:</strong> ${AUDITFLOW_CONFIG.VERSION}</p>
      <hr>
      <p class="text-muted">In production: Spreadsheet ID and Drive root folder ID are stored in Apps Script Properties. AI provider API keys never appear in frontend code. Client portal uses short-lived request tokens.</p>
    </div></div>`;
  }
};

document.addEventListener("DOMContentLoaded", () => AF.init());
