# AI tells: patterns that make a page read as templated

Scan the finished page against this list. Three or more hits means change the layout family, not the colours.

## Visual
- Purple-to-blue gradient hero, glow blobs, neon box-shadows, gradient text on the headline.
- Glassmorphism cards stacked on a blurred gradient with no reason for the blur.
- Three equal feature cards with an icon in a tinted circle, a title and two lines.
- Every section centred, every section the same vertical rhythm, every card the same radius and shadow.
- Hero with text on the left and an empty or stock-illustration right half.
- Emoji used as icons; icons from three different sets.
- Decorative dots, "live" status lights, fake terminal chrome that shows nothing real.
- Grain, noise or mesh overlays that cover content or cost paint time.

## Structure
- Sections in this fixed order: hero, logos, three features, testimonials, pricing, FAQ, CTA, footer, regardless of the product.
- Section-number eyebrows (`01 /`, `02 /`), small uppercase kicker above every heading.
- "Scroll" arrows, bouncing chevrons.
- Bento grid with empty cells, or cells that exist only to fill the grid.
- A pill badge above the headline announcing something nobody announced.

## Copy
- Filler verbs: elevate, seamless, unleash, supercharge, revolutionize, empower, next-generation.
- "Trusted by" logo strips, star ratings, testimonial quotes and statistics that nobody supplied.
- Three-word taglines with periods. ("Fast. Simple. Powerful.")
- Placeholder names (John Doe, Acme), lorem ipsum, "Lorem" in any shipped state.
- Headlines that could describe any product if you swapped the nouns.

## Motion
- Everything fades up with the same delay on scroll.
- Parallax on text, auto-playing carousels, looping gradients, shimmer on static content.
- Hover that scales every card by the same amount, with a blurred shadow transition.
- Animation that fires on a timer while the reader is reading.

## Engineering
- Raw hex values in components instead of tokens; dark mode by `filter: invert`.
- `div` with `onClick` instead of a button or link; missing `alt`; missing focus styles.
- Layout shift when fonts or images load; content hidden until hydration.
- Only the happy path designed: no empty, loading, error or long-text state.
