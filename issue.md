# Homepage Hero & Smart Recommender Banner Refactor

## Objective
Update the homepage elements to align with the new MVP requirements and accurately present the updated 3-step concierge-style Smart Recommender flow.

## 1. Hero Section Cleanup

### File: `src/components/HeroSearchForm.tsx`
- **Rename File:** Rename `HeroSearchForm.tsx` to `HeroRecommenderPanel.tsx` to reflect its new, dedicated purpose.
- **Component Renaming:** Rename the exported component from `HeroSearchForm` to `HeroRecommenderPanel`.
- **Remove Quick Search:** Delete the entire "Quick search form" block (the `<form>` containing the search inputs and button).
- **Remove Unused State:** Delete the `search` and `location` state variables from the top of the component and their corresponding React `useState` import.
- **Update Copy:** Change the marketing text inside the Recommender card:
  - From: *"Answer 4 short questions and get the right repair category before you browse providers."*
  - To: *"Answer 3 quick questions to be instantly matched with the best local providers tailored exactly for your repair."*
- **Layout Adjustments:** Given the removal of the Quick Search, adjust parent `<div className="...">` padding/heights if necessary to ensure the remaining Recommender card and the Stats bar do not squash or look empty. Let the Recommender block flex or expand slightly.

### File: `src/app/(marketing)/page.tsx`
- **Update Imports:** Change `import HeroSearchForm from "@/components/HeroSearchForm";` to `import HeroRecommenderPanel from "@/components/HeroRecommenderPanel";`.
- **Update Render:** Inside the Hero section, change `<HeroSearchForm />` to `<HeroRecommenderPanel />`.

## 2. Smart Recommender Banner Redesign

### File: `src/app/(marketing)/page.tsx`
- **Goal:** Redesign the dark mid-page section ("Not sure where to start?") to visually explain the 3-step concierge flow, removing the static list of 4 random features.
- **Copy Updates:**
  - Change `uppercase tracking-[0.3em] text-teal-300` label from *"Smart category recommender"* to *"Concierge Matching"*.
  - Change paragraph text to: *"Skip the search bar. Tell us what's broken, your precise issue, and your location, and we'll instantly match you with accurate pricing from exact-fit local providers."*
- **Right Column Redesign:** Replace the `recommender.map(...)` grid with a visual 3-step breakdown.
  - Create a new array or hardcode three distinct cards in a vertical or horizontal flex layout.
  - **Step 1:** "1. Select Item" (What needs fixing?)
  - **Step 2:** "2. Specify Problem" (Dynamic issue mapping)
  - **Step 3:** "3. Add Location" (Your suburb)
  - Style these cards with `bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl` and use subtle cyan/teal text for the numbers.
- **Add CTA Button:** Below the left column text (or spanning across), add a clear call-to-action button:
  - Import `LinkButton` if not already available in scope (it is).
  - Add `<LinkButton href={routes.recommender} variant="primary" className="mt-8">Try the Smart Recommender</LinkButton>`.

## Expected Output & Verification
- The Hero right-panel has no raw search inputs anymore, only the glowing Recommender CTA card and the stats block.
- The React component compiles cleanly after the file rename.
- The mid-page dark banner displays 3 educational steps instead of a 4-item static grid.
- All routing to `/recommender` remains unbroken.
