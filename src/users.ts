import request from './util/request';
import { ZoomOptions, PaginatedResponse } from './common';

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  type: 1 | 2 | 3;
  status: string;
  pmi: number;
  timezone: string;
  dept: string;
  created_at: string;
  last_login_time: string;
  last_client_version: string;
  group_ids: string[];
  im_group_ids: string[];
  verified: 0 | 1;
  role_name?: string;
  use_pmi?: boolean;
  language?: string;
  phone_country?: string;
  phone_number?: string;
  vanity_url?: string;
  personal_meeting_url?: string;
  pic_url?: string;
  cms_user_id?: string;
  account_id?: string;
  host_key?: string;
  jid?: string;
  job_title?: string;
  company?: string;
  location?: string;
};
export type ListUsersParams = {
  status?: 'active' | 'inactive' | 'pending';
  page_size?: number;
  page_number?: number;
  role_id?: string;
};
export type ListUserResponse = PaginatedResponse & {
  users: User[];
};
export type GetUserParams = {
  login_type?: '0' | '1' | '99' | '100' | '101';
};
export type GetUserTokenParams = {
  type?: 'token' | 'zak';
};
export type GetUserTokenResponse = {
  token: string;
};

export default function(zoomApiOpts: ZoomOptions) {
  const zoomRequest = request(zoomApiOpts);

  const ListUsers = function(params?: ListUsersParams) {
    return zoomRequest<ListUserResponse>({
      method: 'GET',
      path: '/users',
      params: params
    });
  };
  const GetUser = function(userId: string, params?: GetUserParams) {
    return zoomRequest<User>({
      method: 'GET',
      path: `/users/${userId}`,
      params: params
    });
  };
  const GetUserToken = function(userId: string, params?: GetUserTokenParams) {
    return zoomRequest<GetUserTokenResponse>({
      method: 'GET',
      path: `/users/${userId}/token`,
      params: params
    });
  };
  
  return {
    ListUsers,
    GetUser,
    GetUserToken
  };
}
