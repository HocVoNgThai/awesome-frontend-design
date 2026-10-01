# Mapping semantic tokens to shadcn/ui and Tailwind v4

shadcn components read CSS variables such as `--background`, `--foreground`, `--card`, `--popover`, `--primary`,
`--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`.
Treat those as the adapter layer; keep your own semantic tokens as the source of truth.

## globals.css pattern

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

:root {
  /* your semantic tokens (source of truth) */
  --bg: #edeef0;  --bg-raised: #fbfbfc;  --fg: #0e1013;  --fg-muted: #4a5058;
  --accent-fill: #ff5a1f;  --accent-text: #1d4bd8;  --line: #c9ccd1;  --focus: #1d4bd8;
  --radius: 0.5rem;

  /* shadcn adapter */
  --background: var(--bg);
  --foreground: var(--fg);
  --card: var(--bg-raised);            --card-foreground: var(--fg);
  --popover: var(--bg-raised);         --popover-foreground: var(--fg);
  --primary: var(--accent-fill);       --primary-foreground: #0e1013;
  --secondary: var(--bg-raised);       --secondary-foreground: var(--fg);
  --muted: var(--bg-raised);           --muted-foreground: var(--fg-muted);
  --accent: var(--bg-raised);          --accent-foreground: var(--fg);
  --destructive: #c0261d;
  --border: var(--line);  --input: var(--line);  --ring: var(--focus);
}

[data-theme="dark"] {
  --bg: #101214; --bg-raised: #181b1f; --fg: #e8eaed; --fg-muted: #a3a9b1;
  --accent-fill: #ffb224; --accent-text: #7cd4f5; --line: #2b3036; --focus: #7cd4f5;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --font-sans: var(--font-body);
  --font-display: var(--font-display);
  --font-mono: var(--font-mono);
}
```

## Notes

- Keep the primary foreground paired with the primary fill and test the pair in the contrast gate (`afd-theme-systems`).
- `shadcn`'s `--accent` is a subtle hover surface, not your brand accent. Do not confuse the two: your brand accent maps to `--primary`.
- Add more themes as extra `[data-theme="name"]` blocks that override the semantic tokens only; the adapter lines stay unchanged.
- Radius and shadow are tokens too (`--radius`, `--shadow-card`). A hard-edged theme sets `--radius: 0`.
- Modify `components/ui/*` to use your motion tokens (`duration-[var(--dur-fast)]`) rather than sprinkling literals.
