# zoomapi

NodeJS library for working with the Zoom API.

`zoomapi` provides server-side access to the [Zoom APIs](https://marketplace.zoom.us/docs/api-reference/introduction) via [JWT access tokens (deprecation scheduled for June 2023)](https://marketplace.zoom.us/docs/guides/build/jwt-app/) or [server-to-server OAuth](https://marketplace.zoom.us/docs/guides/build/server-to-server-oauth-app/). It's written completely in Typescript, and only has one dependency. Works on NodeJS version 8 and higher.

```js
npm i zoomapi
```

## Usage

```js
import zoomApi from 'zoomapi';

// JWT app
const client = zoomApi({
  apiKey: process.NODE_ENV.ZoomApiKey,
  apiSecret: process.NODE_ENV.ZoomApiSecret
});
// or Server-to-Server OAuth app
const client = zoomApi({
  accountId: process.NODE_ENV.ZoomAccountId,
  oauthClientId: process.NODE_ENV.ZoomOAuthClientId,
  oauthClientSecret: process.NODE_ENV.ZoomOAuthClientSecret,
});

const users = await client.users.ListUsers();
```

## API Progress

This library doesn't (yet) implement every API call. PRs are welcome and encouraged.

## Tests

None yet.

## Contributing

Pull requests are more than welcome! Please follow existing naming and style conventions, and correct any linting errors.

## License

MIT