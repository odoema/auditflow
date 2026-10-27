# Deployment Guide

## 1. Google Sheets Setup
Create spreadsheet **AuditFlow Data** with sheets: USERS, CLIENTS, ENGAGEMENTS, TEAM, DOCUMENTS, DOCUMENT_REQUESTS, WORKING_PAPERS, REVIEW_NOTES, TASKS, NOTIFICATIONS, ACTIVITY_LOG, SETTINGS.

## 2. Google Drive Root Folder
Create **AUDIT FIRM** folder and note its ID.

## 3. Google Apps Script Backend
1. Create project at script.google.com
2. Copy all .gs files from apps-script/
3. Add Script Properties: SPREADSHEET_ID, ROOT_FOLDER_ID
4. Deploy as Web App (Execute as Me, access as needed)
5. Copy the Web App URL into assets/js/config.js as API_BASE and set DEMO_MODE = false

## 4. GitHub Pages
Push to main. The included GitHub Actions workflow deploys automatically.

## 5. Daily Reminders
Add time-driven trigger for runDailyReminders at 08:00.
