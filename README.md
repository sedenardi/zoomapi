# zoomapi

NodeJS library for working with the Zoom API.

`zoomapi` provides server-side access to the [Zoom APIs](https://marketplace.zoom.us/docs/api-reference/introduction) via JWT access tokens. It's written completely in Typescript, and only has one dependency. Works on NodeJS version 8 and higher.

```sh
npm i @schoolhouse/zoomapi
# or
yarn add @schoolhouse/zoomapi
```

## Usage

```js
import zoomApi from '@schoolhouse/zoomapi';

const client = zoomApi({
  apiKey: process.NODE_ENV.ZoomApiKey,
  apiSecret: process.NODE_ENV.ZoomApiSecret
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
