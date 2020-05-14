import https from 'https';
import getAuthToken from './getAuthToken';
import { ZoomOptions } from '../';

const BASE_URL = 'api.zoom.us';
const API_VERSION = '/v2';

type ZoomRequestOpts = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  params?: object;
  body?: object;
};

const buildURL = function(url: string, params?: object) {
  if (!params) {
    return url;
  }
  const sp = new URLSearchParams();
  for (const k in params) {
    if (params[k] !== undefined) {
      sp.set(k, params[k]);
    }
  }
  return url + '?' + sp.toString();
};

export default function(zoomApiOpts: ZoomOptions) {
  return async function zoomRequest<T>(opts: ZoomRequestOpts) {
    const authToken = await getAuthToken(zoomApiOpts);
    const requestOpts = {
      method: opts.method,
      hostname: BASE_URL,
      path: API_VERSION + buildURL(opts.path, opts.params),
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${authToken}`
      }
    };
    return await new Promise<T>((resolve, reject) => {
      const httpsRequest = https.request(requestOpts, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`HTTPS request failed, status code: ${res.statusCode}`));
        }

        const data = [];
        res.on('data', (chunk) => {
          data.push(chunk);
        });
        res.on('end', () => {
          const body = Buffer.concat(data);
          resolve(JSON.parse(body.toString()));
        });
      });

      httpsRequest.on('error', (err) => {
        reject(err);
      });

      if (opts.body) {
        httpsRequest.write(JSON.stringify(opts.body));
      }

      httpsRequest.end();
    });
  };
}
