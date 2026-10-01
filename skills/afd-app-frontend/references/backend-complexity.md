# Backend complexity and what the frontend must provide

Pick the row that matches. A higher row includes everything above it.

## simple (forms, CRUD, a few tables, one user type or no login)

- Pages: list, detail, create/edit form, settings.
- Forms: server validation errors mapped to fields; pending state; success toast.
- Lists: server pagination or "load more"; empty state with the create action.
- Mutations: optimistic for toggles and deletes with undo toast.
- Shell: top bar + simple nav; no sidebar needed under 6 destinations.
- Motion: calm. Dialog and toast transitions only.

## medium (auth, roles, dashboards, search, files)

- Auth screens: sign in, sign up, forgot/reset, verify email, session expired, sign out everywhere. Never lose form input on expiry.
- Roles: hide what a role never has; disable-with-reason what it sometimes has. No dead links.
- Data tables: sort, filter, column visibility, pagination, row selection, bulk actions; state in the URL; sticky header; keyboard navigation; density toggle.
- Dashboards: KPI row (real numbers with period and unit), one primary chart, recent activity, saved filters. Charts follow the dataviz rules: label directly, colour-blind safe, no 3D, zero baseline for bars.
- Search: debounced, shows result count, highlights terms, empty result suggests alternatives.
- Files: drag and drop with progress, type and size errors before upload, retry.
- Notifications: in-app list + toast; not both for the same event.
- Shell: collapsible sidebar, breadcrumbs, command palette.

## complex (multi-tenant, permissions matrix, realtime, jobs, heavy data)

- Tenant/workspace switcher always visible; every page shows the active tenant; URL carries the tenant id.
- Permission-aware navigation built from the permission set, not hard-coded per role. Permission denied states explain which permission is missing and who can grant it.
- Bulk actions with preview ("42 items will change"), progress, partial failure report, undo window.
- Background jobs: queued/running/failed/done states, progress, cancel, retry, link to logs; survive page reloads.
- Realtime: connection state indicator, optimistic merge, conflict resolution UI ("changed by Ana 2 min ago"), no UI jumps while the user is editing (buffer incoming changes).
- Audit/activity: filterable timeline with actor, action, target, time, and a diff view.
- Large data: virtualised lists/tables, server-side everything, skeletons by row, cursor pagination, export as a job.
- Degraded mode: rate limits, partial outage, read-only mode, stale data banners with timestamps.
- Power use: keyboard shortcuts with a help overlay, saved views, bulk edit grids, URL-shareable state.
- Settings: org, members, roles, API keys (show once, copy, rotate), webhooks with delivery log, billing.
- Observability in UI: error boundary per widget so one failing panel never blanks the page; client error reporting with a user-visible reference id.

## Cross-cutting at every level

Accessible tables (`scope`, captions), live regions for async results, focus management after navigation and dialogs, and timestamps with timezone on hover.
