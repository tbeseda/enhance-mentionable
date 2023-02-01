import arc from '@architect/functions'

const data = await arc.tables()
const webmentions = data.webmentions

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post({ method, path, session, body }) {
  console.log(`<${Date.now()}> ${method} ${path}`)

  const authorized = !!(session.authorized)
  if (!authorized) return { location: '/' }

  const { id, approved } = body
  const isApproved = approved === 'true'

  // verify it if you'd like:
  // const mention = await webmentions.get({ id })

  await webmentions.update({
    Key: { id },
    UpdateExpression: 'set approved = :approved',
    ExpressionAttributeValues: {
      ':approved': isApproved
    },
  })

  return { location: '/admin' }
}
