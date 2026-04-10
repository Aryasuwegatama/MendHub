# Fix: Provider Detail Page Layout & Quote Submission UX

**Branch:** `bugfix/provider-detail-and-quote-ux`
**Closes:** (no existing issue — new bug report)

---

## Problem Summary

Two UX problems identified after manual testing of the service-centric flow:

1. **Provider detail page** has three unnecessary sidebar cards (Pricing info, General inquiry, Map) cluttering the layout. The Services list is also buried below the Business overview card, so users must scroll before seeing what they came for. Additionally the price badge incorrectly says "From $X" for fixed-price services, implying the price is variable when it is not.

2. **Quote form submission** wrongly redirects users to a payment/confirmation page (with "$0.00 payment receipt" messaging) after they submit a quote request. A quote is just an inquiry — there is no payment involved. The user should stay on the page and see a simple success message.

---

## Recommended Solution

### Fix 1 — Provider Detail Page

**What to do:**
- Delete the entire right sidebar column (Pricing info card, General inquiry card, Map placeholder card).
- Change the layout from a two-column grid to a single full-width column.
- Reorder the two remaining cards: **Services first**, Business overview second.
- Fix the `PriceBadge` label logic: if `priceMethod === 'fixed'`, show the exact price (`$X`); otherwise keep `From $X` for quote/variable methods.
- Remove the now-unused `startingPrice` and `priceLabel` variables from the component function.
- Remove the now-unused `LinkButton` import since the General inquiry card (which used it) is gone.

**Why this approach:**
Removing the sidebar entirely is cleaner than rearranging it. The Pricing info duplicates what is already shown per-service in the Services cards. General inquiry duplicates the generic quote/book buttons on the provider listing page. The Map is a placeholder with no value. A single-column layout with Services at the top gives users the most important info immediately.

---

### Fix 2 — Quote Form Submission

**What to do:**
- In `QuoteRequestForm.tsx`, after a successful API response, replace the `router.push(...)` redirect with an inline success message using the existing `setSubmitMessage` state.
- Remove the `useRouter` import and the `router` variable since they are no longer needed in this component.
- Remove the `routes` import since `routes.paymentForQuote` is the only thing it was used for in this file.
- The success message text should be: `"Your quote request has been submitted. The provider will review it and get back to you within 24 hours."`
- After success, the form fields are already reset by `reset()`, so the user sees a blank form with the success banner — clean UX.

**Why this approach:**
The payment flow (`routes.paymentForQuote`) was a placeholder workaround from an earlier phase. A quote request is an inquiry with no monetary transaction. Keeping the user on the same page with a success message is standard UX (similar to a contact form). No new page, no new route, no changes to the API.

---

## Exact Implementation Steps

### Step 1 — Fix the price badge label logic

**File:** `src/app/(discovery)/providers/[id]/page.tsx`  
**Lines to change:** 130–134

Find this block inside the `provider.services.map(...)` loop:
```tsx
<PriceBadge>
  {service.startingPrice
    ? `From $${Number(service.startingPrice).toFixed(0)}`
    : "Quote"}
</PriceBadge>
```

Replace it with:
```tsx
<PriceBadge>
  {service.startingPrice
    ? service.priceMethod === "fixed"
      ? `$${Number(service.startingPrice).toFixed(0)}`
      : `From $${Number(service.startingPrice).toFixed(0)}`
    : "Quote required"}
</PriceBadge>
```

**How to verify:** A fixed-price service should show `$69` (no "From"). A quote-based service with a starting price should show `From $69`. A service with no price should show `Quote required`.

---

### Step 2 — Remove unused variables and imports from the page component

**File:** `src/app/(discovery)/providers/[id]/page.tsx`  
**Lines to delete:** 64–75 (the `startingPrice` and `priceLabel` variable declarations)

Delete these lines entirely:
```tsx
const startingPrice =
  provider.services.length > 0
    ? Math.min(
        ...provider.services
          .filter((s) => s.startingPrice)
          .map((s) => Number(s.startingPrice))
      )
    : null;

const priceLabel = startingPrice
  ? `From $${Number(startingPrice).toFixed(0)}`
  : "Quote required";
```

Also on **line 10**, remove the `LinkButton` import:
```tsx
import LinkButton from "@/components/ui/LinkButton";
```

**How to verify:** Run `npm run build`. TypeScript will error if `startingPrice`, `priceLabel`, or `LinkButton` are still referenced anywhere — they should not be after Step 3.

---

### Step 3 — Restructure the JSX layout

**File:** `src/app/(discovery)/providers/[id]/page.tsx`  
**Lines to change:** 100–205 (the entire content grid below `</PageIntro>`)

Replace the current two-column grid (100–205) with this single-column layout:

```tsx
<div className="mt-10 space-y-6">
  {/* Services — shown first so users see what they can book immediately */}
  <Card variant="default">
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Services</h2>
      <span className="glass-pill rounded-full px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        {provider.services.length} listed
      </span>
    </div>

    <div className="mt-6 space-y-4">
      {provider.services.map((service) => (
        <div key={service.id} className="glass-panel-muted rounded-2xl p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
              <div className="mt-3">
                <PriceBadge>
                  {service.startingPrice
                    ? service.priceMethod === "fixed"
                      ? `$${Number(service.startingPrice).toFixed(0)}`
                      : `From $${Number(service.startingPrice).toFixed(0)}`
                    : "Quote required"}
                </PriceBadge>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2 min-w-[140px]">
              {service.priceMethod === "fixed" ? (
                <Link
                  href={routes.providers.book(id, service.id)}
                  className="inline-flex items-center justify-center rounded-full bg-teal-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-teal-400"
                >
                  Book Now
                </Link>
              ) : (
                <Link
                  href={routes.providers.quote(id, service.id)}
                  className="inline-flex items-center justify-center rounded-full bg-teal-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-teal-400"
                >
                  Get Quote
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>

  {/* Business overview — secondary information */}
  <Card variant="default">
    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Business overview</h2>
    <p className="mt-4 text-slate-600 dark:text-slate-300">{provider.description}</p>

    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <InfoBlock label="Suburb">{provider.suburb}</InfoBlock>
      <InfoBlock label="Service Area">{provider.serviceArea}</InfoBlock>
    </div>
  </Card>
</div>
```

Note: The three sidebar cards (Pricing info, General inquiry, Map) are intentionally omitted. Do not add them back.

**How to verify:** Open any provider detail page. Services card must be the first content block below the page header. Business overview comes second. No right sidebar. No Map, Pricing info, or General inquiry cards visible.

---

### Step 4 — Remove the payment redirect from the quote form

**File:** `src/components/forms/QuoteRequestForm.tsx`

**4a.** On **line 4**, delete the `useRouter` import:
```tsx
import { useRouter } from "next/navigation";
```

**4b.** On **line 12**, delete the `routes` import:
```tsx
import { routes } from "@/config/routes";
```

**4c.** On **line 20**, delete the `router` variable:
```tsx
const router = useRouter();
```

**4d.** On **lines 71–73**, replace:
```tsx
reset();
// Quote flow: no deposit required — amount is 0; confirmation page shows the quote record
router.push(routes.paymentForQuote(json.id, "0"));
```

With:
```tsx
reset();
setSubmitMessage({
  type: "success",
  text: "Your quote request has been submitted. The provider will review it and get back to you within 24 hours.",
});
```

**How to verify:**
1. Go to any provider's quote page (e.g. `/providers/{id}/quote`)
2. Fill in the form and submit
3. You should stay on the same page — no redirect
4. A teal success banner appears below the form with the confirmation message
5. The form fields are cleared

---

## Verification

1. Run `npm run build` — must pass with no TypeScript errors.
2. On the provider detail page: Services card appears first, price badge shows `$69` (not `From $69`) for fixed-price services.
3. On the quote page: submitting the form shows a teal success banner in-place, no redirect to payment.
