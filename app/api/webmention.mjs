import arc from '@architect/functions'
import { mf2 } from 'microformats-parser'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post({ body, method, path }) {
  console.log(`<${Date.now()}> ${method} ${path}`)

  const { target, source } = body

  // validate incoming webmention
  const errors = []
  if (!target) {
    errors.push('missing_target')
  } else if (!target.startsWith('http')) {
    errors.push('invalid_target')
  }
  if (!source) {
    errors.push('missing_source')
  } else if (!source.startsWith('http')) {
    errors.push('invalid_source')
  }
  if (target && source && target === source) {
    errors.push('invalid: source must not match target')
  }

  if (errors.length > 0) {
    console.log(`Discovered ${errors.length} errors, returning 400:`, errors)
    return {
      code: 400,
      json: { errors },
    }
  }

  // TODO: create a background process to create mention record
  const targetUrl = new URL(target)
  const sourceUrl = new URL(source)
  const newMention = {
    id: `target:${targetUrl.pathname}::source:${sourceUrl.hostname}${sourceUrl.pathname}`,
    created: new Date().toISOString(),
    source,
    target,
    targetPath: targetUrl.pathname,
  }

  console.log('Drafting new mention record:', newMention)

  const sourceReq = await fetch(sourceUrl.href)
  if (sourceReq.ok) {
    console.log('Source URL returned 200 OK, parsing body...')
    const sourceBody = await sourceReq.text()

    // search body for target URL
    if (sourceBody.indexOf(targetUrl.href) > -1) {
      console.log('Target URL found in source body, parsing microformats...')
      const { items } = mf2(sourceBody, { baseUrl: sourceUrl.href })
      newMention.items = items
      const hEntry = items.find((i) => i.type?.includes('h-entry'))

      // get author name
      if (
        hEntry?.properties?.author &&
        Array.isArray(hEntry.properties.author)
      ) {
        if (typeof hEntry.properties.author[0] === 'string') {
          newMention.sourceAuthor = hEntry.properties.author[0]
        } else if (hEntry.properties.author[0].value) {
          newMention.sourceAuthor = hEntry.properties.author[0].value
        }
      }

      // overwrite author name with h-card name if available
      if (hEntry?.children) {
        const hCard = hEntry.children.find((i) => i.type?.includes('h-card'))
        if (hCard?.properties?.name && Array.isArray(hCard.properties.name)) {
          newMention.sourceAuthor = hCard.properties.name[0]
        }
      }

      // get source title
      if (hEntry?.properties?.name && Array.isArray(hEntry.properties.name)) {
        newMention.sourceTitle = hEntry.properties.name[0]
      }
    } else {
      console.log('Target URL not found in source body, storing mention anyway')
      newMention.error = {
        message: `target URL ${targetUrl.href} not found in source (${sourceUrl.href}) body`,
      }
    }
  } else {
    console.log('Source URL returned non-200 status, storing mention anyway')
    newMention.error = {
      message: `source URL ${sourceUrl.href} returned ${sourceReq.status}`,
    }
  }

  // save result
  const data = await arc.tables()
  await data.webmentions.put(newMention)

  return {
    code: 202,
    text: 'accepted',
  }
}

export async function get() {
  return {
    code: 405,
    text: 'plz send POST',
  }
}

