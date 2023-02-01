module.exports = {
  webmentions: [
    {
      "approved": undefined,
      "targetPath": "/foo-bar",
      "target": "https://making-2c4.begin.app/foo-bar",
      "sourceAuthor": "Googlers",
      "sourceTitle": "Google",
      "source": "https://google.com/",
      "id": "target:/foo-bar::source:google.com/",
      "items": [],
    },
    {
      "approved": undefined,
      "targetPath": "/foo-bar/baz",
      "target": "https://making-2c4.begin.app/foo-bar/baz",
      "sourceAuthor": "AWS Nerds",
      "sourceTitle": "AWS",
      "source": "https://aws.amazon.com/",
      "id": "target:/foo-bar/baz::source:aws.amazon.com/",
      "items": [],
    },
    {
      "approved": undefined,
      "targetPath": "/",
      "target": "https://making-2c4.begin.app/",
      "created": "2023-02-02T09:35:03.290Z",
      "sourceAuthor": "Beginners",
      "sourceTitle": "Begin.com",
      "source": "https://begin.com/why",
      "id": "target:/::source:begin.com/why",
      "items": [],
    },
    {
      "approved": undefined,
      "targetPath": "/",
      "target": "https://making-2c4.begin.app/",
      "created": "2023-01-31T10:35:03.290Z",
      "sourceAuthor": "Enhancers",
      "sourceTitle": "Enhance: The HTML Framework",
      "source": "https://enhance.dev/docs",
      "id": "target:/::source:enhance.dev/docs",
      "items": [],
    },
    // this one is most similar to a real world mention result:
    {
      "approved": true,
      "targetPath": "/",
      "target": "https://making-2c4.begin.app/",
      "created": "2023-02-01T01:35:03.290Z",
      "sourceAuthor": "Taylor Beseda",
      "sourceTitle": "Testing Webmentions",
      "source": "https://tbeseda.com/articles/2023/01/webmention-test",
      "id": "target:/::source:tbeseda.com/articles/2023/01/webmention-test",
      "items": [
        {
          "type": [
            "h-entry"
          ],
          "children": [
            {
              "type": [
                "h-card"
              ],
              "properties": {
                "role": [
                  "DevEx Engineer"
                ],
                "org": [
                  "Begin.com"
                ],
                "name": [
                  "Taylor Beseda"
                ],
                "locality": [
                  "Longmont"
                ],
                "photo": [
                  {
                    "alt": "Taylor Beseda",
                    "value": "https://github.com/tbeseda.png"
                  }
                ],
                "country-name": [
                  "U.S.A"
                ],
                "region": [
                  "Colorado"
                ],
                "url": [
                  "https://tbeseda.com"
                ],
                "email": [
                  "mailto:tbeseda@gmail.com"
                ]
              }
            }
          ],
          "properties": {
            "name": [
              "Testing Webmentions"
            ],
            "author": [
              "Taylor Beseda \n\n\t\t\t\n\t\t\t\tTaylor Beseda\n\t\t\t\ttbeseda@gmail.com\n\t\t\t\t\n\t\t\t\t\tDevEx Engineer,\n\t\t\t\t\tBegin.com\n\t\t\t\t\n\n\t\t\t\t\n\t\t\t\t\tLongmont, Colorado U.S.A"
            ],
            "published": [
              "2023-01-30 20:45 -0700"
            ]
          }
        }
      ],
    }
  ]
}
