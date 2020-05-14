import users from './users';

export type ZoomOptions = {
  apiKey: string;
  apiSecret: string;
  tokenExpiresIn?: string | number;
};
export default function(zoomApiOpts: ZoomOptions) {
  return {
    users: users(zoomApiOpts)
  };
}
