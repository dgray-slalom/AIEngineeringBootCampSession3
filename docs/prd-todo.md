# Product Requirements Document (PRD) - TODO App Upgrade (Due Dates, Priority, Filters)

## 1. Overview

We are upgrading the basic TODO app (currently title + completed) to support due dates, task priority, and simple filters. The goal is a simple, teachable MVP that stays frontend‑only with local storage. These enhancements help users understand urgency (due dates, overdue), emphasize importance (priority), and quickly view tasks by date filters.

---

## 2. MVP Scope

- Add `dueDate` field to tasks
  - Format: ISO `YYYY-MM-DD`
  - Optional; if invalid input is provided, treat as absent
- Add `priority` field to tasks
  - Enum: `"P1" | "P2" | "P3"`
  - Default: `"P3"`
- Filters (views)
  - Tabs: **All**, **Today**, **Overdue**
  - Behavior: **Today** and **Overdue** show incomplete tasks only; **All** shows completed as well
- Storage & architecture
  - Keep storage local (browser/local storage); no backend changes
  - Frontend-only implementation

---

## 3. Post-MVP Scope

- Visual highlighting for overdue tasks (e.g., red styling to stand out)
- Sorting rules for task list
  - Order: overdue first → priority (P1→P3) → due date ascending → undated last
- Optional UI enhancements
  - Priority badges with color coding (P1 red, P2 orange, P3 gray)

---

## 4. Out of Scope

- Notifications
- Recurring tasks
- Multi-user support
- Keyboard navigation / advanced accessibility features
- External storage or backend changes (remain local only)
