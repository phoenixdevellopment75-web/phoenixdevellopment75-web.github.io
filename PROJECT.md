# Project: phoenix-portfolio

## Architecture
- Self-contained single-page application (`index.html`) containing inline HTML, CSS, and JS.
- Utilizes external web fonts (Inter, Space Grotesk, Material Symbols Rounded).
- Utilizes inline canvas for particle animation.
- Interactive custom cursor glow, mobile menu toggle, scroll reveal, and stats counter.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Test Suite | Create comprehensive E2E tests for layout, styles, responsiveness, and interactive elements. | None | IN_PROGRESS (Conv ID: 70e5202f-1186-4492-a57b-dbb41ebd6cce) |
| 2 | Design & Theme Upgrade | Implement "Matcha Cream" dark-theme variables, typography, layouts, animations, and merge all CSS/JS into index.html. | M1 | IN_PROGRESS (Conv ID: da56c423-75a0-4766-b322-4b8fa9896114) |
| 3 | Copywriting Refurbishment | Rewrite all copywriting to authentic casual 16-year-old developer tone. | M1 | IN_PROGRESS (Conv ID: da56c423-75a0-4766-b322-4b8fa9896114) |
| 4 | NeuroSparseV1 Integration | Add specific sections, cards, and milestones for NeuroSparseV1 custom LLM project. | M1 | IN_PROGRESS (Conv ID: da56c423-75a0-4766-b322-4b8fa9896114) |
| 5 | Verify & Audit | Run all test suites, challenger checks, and forensic audit to verify completion. | M2, M3, M4 | PLANNED |

## Interface Contracts
- Single `index.html` file at the root.
- Responsive breakpoints: mobile (<=768px), tablet (769px-1024px), desktop (>1024px).
- Navigation sections: `#about`, `#passions`, `#projects`, `#currently-neurosparse`, `#journey`, `#contact`.
- Dark theme CSS variables:
  - `--bg`: Deep dark olive/forest green background.
  - `--text`: Warm cream text.
  - `--accent`: Warm gold accents.
  - `--border`: Matcha green borders.
- Specific element triggers and IDs for cursor glow, mobile menu button, and canvas particle system.

## Code Layout
- `index.html`: Contains all HTML structure, inline CSS (`<style>`), and inline JS (`<script>`).
- `pfp.png`: Profile picture image (must be referenced correctly as `./pfp.png` or `pfp.png`).
