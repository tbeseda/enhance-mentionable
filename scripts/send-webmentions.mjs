const WEBMENTION_ENDPOINT = 'https://making-2c4.begin.app/webmention'

const sampleWebMention = {
  source: 'https://my-app.begin.app/', // your app's content URL
  target: 'https://making-2c4.begin.app/', // the article you mention
}

const response = await fetch(WEBMENTION_ENDPOINT, {
  method: 'POST',
  body: new URLSearchParams(sampleWebMention),
})

let message
if (response.ok) {
  const contentType = response.headers.get('content-type')
  message = contentType?.startsWith('application/json')
    ? await response.json()
    : await response.text()
} else {
  message = `Error ${response.status}: ${response.statusText}`
}

console.log(message)
