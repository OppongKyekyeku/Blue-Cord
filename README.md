# Blue Cord Health Agency Website

## Performance Changes

- Added compressed, resized image copies in `images/optimized/site/` and repointed the site to those files. This reduces the download weight of large care photos and service hero backgrounds while preserving the original assets.
- Added page-specific hero image preloads in each HTML head. This helps the browser start downloading the most important above-the-fold image sooner.
- Added `defer` to JavaScript files so HTML can parse before non-critical scripts run.
- Kept below-the-fold images on lazy loading with async decoding so non-visible media does not compete with the first screen.
- Reduced GSAP scroll animation distances and durations so sections reveal more quickly and with less main-thread work.

## SEO Changes

- Added unique page titles and meta descriptions across the site. Search engines use these to understand each page and often show them in search results.
- Added canonical URLs to prevent duplicate URL confusion and tell search engines which version of each page should be indexed.
- Added Open Graph and Twitter preview metadata so shared links have clear titles, descriptions, and images.
- Added LocalBusiness structured data with the agency name, contact details, Stafford, VA location, service areas, and services. Structured data gives search engines machine-readable context about the business.
- Added `robots.txt` and `sitemap.xml`. The robots file points crawlers to the sitemap, and the sitemap lists the important pages so search engines can discover and revisit them more reliably.

## Why SEO Matters Here

SEO should be implemented because this site needs to be discoverable by families looking for home care, nursing support, companionship, 24-hour care, and dementia care in Stafford and surrounding Virginia communities. Good SEO helps search engines understand what Blue Cord Health Agency offers, where it serves, and which page best answers a visitor's search. It also improves link previews and creates a stronger first impression before someone even lands on the website.
