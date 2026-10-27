# AuditFlow Architecture

## High-Level Overview

```
                         AUDITFLOW
                             │
                     Responsive Web App
                             │
                     GitHub Pages
                             │
                 ┌───────────┴───────────┐
                 │                       │
          Google Apps Script        GitHub Actions
                 │                       │
        ┌────────┼────────┐              │
        │        │        │              │
      Drive    Docs    Sheets        Deployment
        │        │        │
        └────────┴────────┘
                 │
          Audit Document Layer
                 │
        ┌────────┴────────┐
        │                 │
     AI Layer          Workflow
        │                 │
 ChatGPT / Claude / Grok  │
                          │
                    Audit Processes
```

## Key Principle

**Google Drive is the system of record.**  
AuditFlow never moves documents out of Drive. It provides intelligent navigation, workflow state, requests & reviews, search & AI assistance, and activity logging.

## Data Store (Google Sheets)

Central spreadsheet contains: USERS, CLIENTS, ENGAGEMENTS, TEAM, DOCUMENTS, DOCUMENT_REQUESTS, WORKING_PAPERS, REVIEW_NOTES, TASKS, NOTIFICATIONS, ACTIVITY_LOG, SETTINGS.

All records use stable unique IDs (CLIENT-0001, ENG-2026-0001, REQ-00017, etc.).

## Google Drive Structure

Standardised audit sections from 00_CLIENT_MASTER through 18_AUDIT_REPORT + 99_ARCHIVE, created automatically by Apps Script.

## Backend

Google Apps Script deployed as Web App. Secrets in Script Properties. Clear action-based API.

## AI Layer

Provider abstraction (ChatGPT / Claude / Grok). Keys never in frontend. AI may only summarise, classify, search, suggest — never approve audits or modify evidence.
