import request from './util/request';
import { ZoomOptions } from '.';

export type ListUsersParams = {
  status?: 'active' | 'inactive' | 'pending';
  page_size?: number;
  page_number?: number;
  role_id?: string;
};
export type ListUserResponse = {
  page_count: number;
  page_number: number;
  page_size: number;
  total_records: number;
  users: {
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
  }[];
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
  
  return {
    ListUsers
  };
}
