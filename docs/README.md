# AuditFlow

**Intelligent Audit Document & Workflow Management System**

One intelligent workspace for managing audit clients, documents, working papers, requests, reviews and audit workflows — powered by Google Workspace, GitHub and AI.

## Philosophy

AuditFlow does **not** replace Google Drive.  
Google Drive remains the system of record for documents.  
AuditFlow is the intelligent interface and workflow layer that sits on top of the tools an audit firm already owns and understands.

```
Google Drive  +  Google Docs  +  Google Sheets  +  Apps Script  +  GitHub Pages  +  AI
```

## Live Demo

- **Frontend**: [https://odoema.github.io/auditflow](https://odoema.github.io/auditflow)
- **Repository**: [https://github.com/odoema/auditflow](https://github.com/odoema/auditflow)

## Core Features (MVP)

- Client & Engagement management
- Automatic Google Drive folder structure generation
- Document Request system with client upload portal
- Working Paper register (Google Docs templates)
- Review workflow & Review Notes
- Task board
- Activity Log
- Dashboard with live metrics from Google Sheets
- Audit AI Assistant framework (ChatGPT / Claude / Grok abstraction)
- Fully responsive (Desktop / Tablet / Mobile)

## Technology Stack

| Layer              | Technology                          |
|--------------------|-------------------------------------|
| Frontend           | HTML, CSS, Vanilla JS, Bootstrap 5  |
| Hosting            | GitHub Pages                        |
| CI/CD              | GitHub Actions                      |
| Backend / API      | Google Apps Script                  |
| Structured Data    | Google Sheets                       |
| Documents          | Google Drive + Google Docs          |
| Automation         | Apps Script Triggers                |
| AI                 | Provider abstraction (GPT/Claude/Grok) |

## Quick Start for Developers

1. Clone the repository
2. Deploy the Apps Script backend (see `docs/DEPLOYMENT.md`)
3. Configure the Spreadsheet ID and Drive root folder in Apps Script Properties
4. Push to `main` → GitHub Actions deploys to GitHub Pages automatically

## Demo Client

**Kampala Community Holdings Ltd**  
FY2026 External Audit  
Includes realistic demo documents, working papers, requests, tasks and review notes.

## Documentation

- [Architecture](ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [User Guide](USER_GUIDE.md)
- [Roadmap](ROADMAP.md)

## License

MIT — built to demonstrate what is possible with the tools audit firms already own.
