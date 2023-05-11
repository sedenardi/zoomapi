import { ZoomOptions } from './common'
import { getServerToServerOAuthToken } from './util/getAuthToken'

export default function (zoomApiOpts: ZoomOptions) {
  const GetServerToServerOAuthToken = async function () {
    if (!('accountId' in zoomApiOpts)) {
      throw new Error('Missing oauth config')
    }
    return await getServerToServerOAuthToken(zoomApiOpts)
  }

  return {
    GetServerToServerOAuthToken,
  }
}
