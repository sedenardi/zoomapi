import https from 'https'
import jwt from 'jsonwebtoken'
import type { ZoomOptions, ZoomJWTOptions, ZoomOAuthOptions, OauthTokenResponse } from '../'
import ZoomError from './ZoomError'

const isJWTOptions = function (zoomApiOpts: ZoomOptions): zoomApiOpts is ZoomJWTOptions {
  return 'apiKey' in zoomApiOpts
}

const getJWTAuthToken = function (zoomApiOpts: ZoomJWTOptions) {
  const payload = {
    iss: zoomApiOpts.apiKey,
  }
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: zoomApiOpts.tokenExpiresIn ?? '5s',
  }
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, zoomApiOpts.apiSecret, options, (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

export const getServerToServerOAuthToken = async function (zoomApiOpts: ZoomOAuthOptions) {
  const basicAuthToken = Buffer.from(`${zoomApiOpts.oauthClientId}:${zoomApiOpts.oauthClientSecret}`).toString('base64')
  const requestOpts = {
    method: 'POST',
    hostname: 'zoom.us',
    path: `/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(zoomApiOpts.accountId)}`,
    headers: {
      'content-type': 'application/json',
      authorization: `Basic ${basicAuthToken}`,
    },
  }
  const token = await new Promise<OauthTokenResponse>((resolve, reject) => {
    const httpsRequest = https.request(requestOpts, (res) => {
      const data: any[] = []
      res.on('data', (chunk) => {
        data.push(chunk)
      })
      res.on('end', () => {
        const dataStr = Buffer.concat(data).toString()
        let body = {} as any
        try {
          if (dataStr) {
            body = JSON.parse(dataStr)
          }
        } catch (err) {
          // JSON parse error
          return reject(new ZoomError(res.statusCode, null, 'Malformed JSON response from Zoom OAuth token API', dataStr))
        }
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new ZoomError(res.statusCode, body.code, body.message, dataStr))
        } else {
          resolve(body as OauthTokenResponse)
        }
      })
    })

    httpsRequest.on('error', (err) => {
      reject(err)
    })

    httpsRequest.end()
  })
  if (zoomApiOpts.onSetAccessToken) {
    await zoomApiOpts.onSetAccessToken(token)
  }
  return token
}

export default async function getAuthToken(zoomApiOpts: ZoomOptions) {
  if (isJWTOptions(zoomApiOpts)) {
    return await getJWTAuthToken(zoomApiOpts)
  }

  if (zoomApiOpts.onGetAccessToken) {
    const token = await zoomApiOpts.onGetAccessToken()
    return token.access_token
  }
  const token = await getServerToServerOAuthToken(zoomApiOpts)
  return token.access_token
}
