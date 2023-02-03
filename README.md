# Enhance Mentionable

A simple Enhance website that can receive webmentions.

## Recent Changes

- scripts/send-webmentions.mjs can now send multiple mentions
- more logging in the webmention endpoint
- `@aws runtime nodejs18.x`!

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

### Update identity details

`app/elements/h-card.mjs` has most references you'll want to change.

Change the url in the rel=webmention link in `app/head.mjs` to your deployed endpoint.

### Layout & Styling

Go to town!

I intentionally didn't use any utility classes (except `hidden`) and tried to only write scoped blocks so that they could easily be deleted. `enhance-styless.css` is already on the page.

The microformat classes are important, though. They start with `h-`, `p-`, `u-`, and `dt-`. Try not to add children elements to elements with those classes; the parsing gets weird.

### Check out `app/api/webmention.mjs`

It's wild in there. Some of this work should be handled by an `@events` handler, but at this time, those cannot be deployed.

Most of the code here is trying to scrape the incoming source for info about the mention based on discovered microformats.

### Send Webmentions

Node 18 required locally! Be sure to update `scripts/send-webmentions.js` first.

```sh
node scripts/send-webmentions.mjs
```

Note: you can't webmention yourself.

### Change database seed

See `./sandbox-seed.js`.

## Improvements

- when `@events` works on Begin, move the webmention endpoint to an event handler
- incoming, pending mentions could be displayed alongside content if the admin is logged in
- lots of the identity details could be dynamic and stored in the db
- if content data is stored and published as part of a lifecycle, we could discover and queue up outbound webmentions
- related to the above: handle mention deletes
- instead of overwriting incoming duplicate mentions, there should be an update process. probably an intermediare data model
