# States, forms and data patterns

## State matrix (design each as a real component, not a string)

| State | Shows | Never |
|---|---|---|
| loading | skeleton with the final layout's shape; spinner only for sub-second inline actions | a blank page, a layout jump on arrival |
| empty | why it is empty, one primary action, optional sample | "No data" alone |
| error | what failed in human words, retry, keep input, reference id for support | raw stack traces, losing form values |
| partial | the data that loaded + a per-widget error with retry | blanking the page |
| forbidden | which permission is missing, who can grant it | a 404 pretending the page does not exist (unless that is a security decision) |
| stale/offline | banner with last updated time | silently showing old data |
| long content | truncate with `title`/tooltip, wrap, `min-w-0` on flex children | overflowing the container |

## Forms

- Layout: single column, label above control, helper below, error replaces helper, group related fields.
- Validation: schema shared with the server where possible. Validate on blur and on submit; after the first error, revalidate on change.
- Errors: text + icon, linked with `aria-describedby`, `aria-invalid="true"`; on submit failure focus the first invalid control and announce a summary (`role="alert"`).
- Submit: disabled while pending with a visible pending label ("Saving..."), prevents double submit, re-enables on error.
- Inputs: correct `type`, `inputmode`, `autocomplete` tokens, and `enterkeyhint`; do not block paste; show/hide password toggle.
- Unsaved changes: warn on navigation only when real changes exist.
- Long forms: sections with a sticky progress/summary, autosave drafts with a saved indicator.

## Data fetching and mutation

- Reads: Server Components or TanStack Query; cache key = resource + params; the URL holds filters and pagination.
- Writes: optimistic when the success rate is high and the rollback is clear; otherwise show pending and confirm.
- Race conditions: abort stale requests; ignore out-of-order responses; disable controls that would double fire.
- Pagination: cursor for feeds and large sets, offset only for small stable sets; keep scroll position on back.
- Search/filter inputs: debounce 250-400 ms; announce the result count in a live region.

## Tables

- Header sticky, numeric columns right-aligned and tabular, status as text + colour/icon, row actions in a menu with a visible trigger, selected rows persist across pages when selection is global.
- Responsive: at < 640 px switch to stacked cards for key columns or scroll horizontally inside the table container only.

## Dialogs, toasts, menus

- Dialog: title, one purpose, primary action right, Esc closes, focus returns to the trigger.
- Toast: polite live region, auto-dismiss 4-6 s for success, sticky for errors with an action; never the only place an error appears.
- Menus: roving focus, typeahead, disabled items explain themselves via tooltip.

## Charts and numbers

Direct labels instead of legends when possible, accessible text summary, colour-blind safe palette, zero baseline for bars, units and period on every number, formatted with `Intl.NumberFormat` and `Intl.DateTimeFormat` for the locale.
