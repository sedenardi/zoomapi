import jwt from 'jsonwebtoken';
import { ZoomOptions } from '../';

export default function getAuthToken(zoomApiOpts: ZoomOptions) {
  const payload = {
    iss: zoomApiOpts.apiKey,
  };
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: zoomApiOpts.tokenExpiresIn ?? '5s',
  };
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, zoomApiOpts.apiSecret, options, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
}
