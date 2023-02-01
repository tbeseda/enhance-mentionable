/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
  const { mentions } = store

  if (!mentions || mentions.length < 1) return '<p style="text-align: center;">Awaiting mentions of this page...</p>'

  return html`
    <style>
      ul {
        width: 100%;
        list-style: none;
      }
      ul li {
        margin-bottom: 0.5rem;
      }
      details {
        margin-top: 0.25rem;
      }
      details summary {
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--warning-700);
      }
      details summary::-webkit-details-marker,
      details summary::marker {
        display: none;
        content: '';
      }
      details pre {
        width: 100%;
        overflow: auto;
        white-space: pre;
        font-size: 0.8rem;
      }
    </style>

    <ul>
  ${mentions.map(m => `
      <li>
        <a href="${m.source}">${`"${m.sourceTitle}"` || m.source}</a>
        ${m.sourceAuthor ? `by ${m.sourceAuthor}` : ''}
        <details class="hidden">
          <summary>&gt;</summary>
          <pre>${JSON.stringify(m, null, 2)}</pre>
        </details>
      </li>`.trim(),
  ).join('')}
    </ul>
  `
}
