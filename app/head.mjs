/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head({ req }) {
  const { path } = req
  let title = 'Enhance Mentionable'
  title += path === '/' ? '' : ` - ${path}`

  return /* html */ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>${title}</title>

      <link rel="webmention" href="https://making-2c4.begin.app/webmention">
      <link rel="stylesheet" href="/enhance-styles.css">
      <link rel="icon" href="/_public/favicon.svg">

      <style>
        body {
          color: var(--dark);
        }
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
          height: 100vh;
        }
        h1 {
          font-size: 2rem;
          font-weight: 700;
        }
        h2 {
          font-size: 1.5rem;
          font-weight: 400;
        }
        h3 {
          font-size: 1.2rem;
          font-weight: 400;
        }
        a {
          color: var(--primary-600);
          text-decoration: underline;
        }
      </style>
    </head>
    <body class="font-serif">
  `
}
