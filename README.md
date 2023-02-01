# Enhance Mentionable

A simple Enhance website that can receive webmentions.

## Features

- a `/webmention` endpoint
  - ingest form urlencoded POSTs
  - verify the body is a valid webmention
  - check that the "source" actually links to the "target"
  - look for "microformats" therein and attach relevant data to mention
  - store the webmention in a database
- `/admin` to approve/reject mentions
  - protected by simple secret password
- approved mentions are displayed on the index page
- a WIP script to send webmentions from local environment
  - `node scripts/send-webmentions.mjs`

## ⑃ Fork it

Or just copy the files you need.

### Update the personal identity details

`app/elements/h-card.mjs` has most references you'll want to change.

### Layout & Styling

Go to town!

I intentionally didn't use any utility classes (except `hidden`) and tried to only write scoped blocks so that they could easily be deleted. `enhance-styless.css` is already on the page.

The microformat classes are important, though. They start with `h-`, `p-`, `u-`, and `dt-`. Try not to add children elements to elements with those classes; the parsing gets weird.

### Check out `app/api/webmention.mjs`

It's wild in there. Some of this work should be handled by an `@events` handler, but at this time, those cannot be deployed.

Most of the code here is trying to scrape the incoming source for info about the mention based on discovered microformats.

### Send Webmentions

Be sure to update `scripts/send-webmentions.js` first.

```sh
node scripts/send-webmentions.mjs
```

Note: you can't webmention yourself.

### Change database seed

See `./sandbox-seed.js`.
