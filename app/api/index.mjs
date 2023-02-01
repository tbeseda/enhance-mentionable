import arc from '@architect/functions'

const data = await arc.tables()
const webmentions = data.webmentions

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ method, path, session }) {
  console.log(`<${Date.now()}> ${method} ${path}`)

  const authorized = !!(session.authorized)

  const query = await webmentions.query({
    IndexName: 'targetPath-index',
    KeyConditionExpression: 'targetPath = :targetPath',
    ExpressionAttributeValues: {
      ':targetPath': path,
    },
  })

  let mentions = query && query.Items.length > 0 ? query.Items : []
  mentions = mentions.filter(m => m.approved)

  return {
    json: { authorized, mentions },
  }
}
