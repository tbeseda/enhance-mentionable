import arc from '@architect/functions'

const data = await arc.tables()
const webmentions = data.webmentions

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ method, path, session }) {
  console.log(`<${Date.now()}> ${method} ${path}`)

  const authorized = !!(session.authorized)
  if (!authorized) return { location: '/login' }

  const query = await webmentions.scan({})
  const mentions = query && query.Items.length > 0 ? query.Items : []

  return {
    json: { authorized, mentions }
  }
}
