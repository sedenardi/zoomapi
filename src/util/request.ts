import https from 'https';
import getAuthToken from './getAuthToken';
import { ZoomOptions } from '../';
import ZoomError from './ZoomError';

const BASE_URL = 'api.zoom.us';
const API_VERSION = '/v2';

type QueryParams = {
  [key: string]: string | number | boolean;
};
type ZoomRequestOpts = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  params?: QueryParams;
  body?: object;
};

const buildURL = function(url: string, params?: QueryParams) {
  if (!params) {
    return url;
  }
  const sp = new URLSearchParams();
  for (const k in params) {
    if (params[k] !== undefined) {
      sp.set(k, params[k].toString());
    }
  }
  const qs = sp.toString();
  return qs ? `${url}?${sp}` : url;
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
            reject(new ZoomError(res.statusCode, null, 'Malformed JSON response from Zoom API', dataStr));
            return;
          }
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new ZoomError(res.statusCode, body.code, body.message, dataStr));
          } else {
            resolve(body);
          }
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
