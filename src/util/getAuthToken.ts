import https from 'https';
import jwt from 'jsonwebtoken';
import type { 
  ZoomOptions,
  ZoomJWTOptions,
  ZoomOAuthOptions,
} from '../';
import ZoomError from './ZoomError';

type OauthTokenResponse = {
  access_token: string;
  token_type: 'bearer';
  expire_in: number;
  scope: string[];
};

const isJWTOptions = function(zoomApiOpts: ZoomOptions): zoomApiOpts is ZoomJWTOptions {
  return 'apiKey' in zoomApiOpts;
};

const getJWTAuthToken = function(zoomApiOpts: ZoomJWTOptions) {
  const payload = {
    iss: zoomApiOpts.apiKey
  };
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: zoomApiOpts.tokenExpiresIn ?? '5s'
  };
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, zoomApiOpts.apiSecret, options, (err, res) => {
      if (err) { return reject(err); }
      return resolve(res);
    });
  });
};

const getServerToServerOAuthToken = async function(zoomApiOpts: ZoomOAuthOptions) {
  // new Buffer(string) if we need to be compatible with Node 8,
  // otherwise from Node 10 we should use Buffer.from(string)
  const basicAuthToken = new Buffer(`${zoomApiOpts.oauthClientId}:${zoomApiOpts.oauthClientSecret}`).toString('base64');
  const requestOpts = {
    method: 'POST',
    hostname: 'zoom.us',
    path: `/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(zoomApiOpts.accountId)}`,
    headers: {
      'content-type': 'application/json',
      authorization: `Basic ${basicAuthToken}`
    }
  };
  return await new Promise<string>((resolve, reject) => {
    const httpsRequest = https.request(requestOpts, (res) => {
      const data: any[] = [];
      res.on('data', (chunk) => {
        data.push(chunk);
      });
      res.on('end', () => {
        const dataStr = Buffer.concat(data).toString();
        let body = {} as any;
        try {
          if (dataStr) {
            body = JSON.parse(dataStr);
          }
        } catch (err) {
          // JSON parse error
          reject(new ZoomError(res.statusCode, null, 'Malformed JSON response from Zoom OAuth token API', dataStr));
          return;
        }
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new ZoomError(res.statusCode, body.code, body.message, dataStr));
        } else {
          resolve((body as OauthTokenResponse).access_token);
        }
      });
    });

    httpsRequest.on('error', (err) => {
      reject(err);
    });

    httpsRequest.end();
  });
};

export default function getAuthToken(zoomApiOpts: ZoomOptions) {
  if (isJWTOptions(zoomApiOpts)) {
    return getJWTAuthToken(zoomApiOpts);
  }

  return getServerToServerOAuthToken(zoomApiOpts);
}
