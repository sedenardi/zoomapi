import request from './util/request'
import { PaginatedResponse } from './common'

/**
 * 1 - Basic.
 * 2 - Licensed.
 * 3 - On-prem.
 */
export type UserAccountType = 1 | 2 | 3

/**
 * 0 - Facebook.
 * 1 - Google.
 * 99 - API.
 * 100 - Zoom.
 * 101 - SSO.
 */
export type UserLoginType = '0' | '1' | '99' | '100' | '101'

export type User = {
  id: string
  first_name: string
  last_name: string
  email: string
  type: UserAccountType
  status: string
  pmi: number
  timezone: string
  dept: string
  created_at: string
  last_login_time: string
  last_client_version: string
  group_ids: string[]
  im_group_ids: string[]
  verified: 0 | 1
  role_name?: string
  use_pmi?: boolean
  language?: string
  phone_country?: string
  phone_number?: string
  vanity_url?: string
  personal_meeting_url?: string
  pic_url?: string
  cms_user_id?: string
  account_id?: string
  host_key?: string
  jid?: string
  job_title?: string
  company?: string
  location?: string
}
export type ListUsersParams = {
  status?: 'active' | 'inactive' | 'pending'
  page_size?: number
  page_number?: number
  role_id?: string
}
export type ListUserResponse = PaginatedResponse & {
  users: User[]
}
export type GetUserParams = {
  login_type?: UserLoginType
}
export type GetUserTokenParams = {
  type?: 'token' | 'zak'
}
export type GetUserTokenResponse = {
  token: string
}
export type CreateUserBody = {
  action: 'create' | 'autoCreate' | 'custCreate' | 'ssoCreate'
  user_info?: {
    email: string
    type: UserAccountType
    first_name?: string
    last_name?: string
    password?: string
  }
}
export type CreateUserResponse = {
  id: string
  first_name: string
  last_name: string
  email: string
  type: UserAccountType
}
export type DeleteUserParams = {
  action?: 'disassociate' | 'delete'
  transfer_email?: string
  transfer_meeting?: boolean
  transfer_webinar?: boolean
  transfer_recording?: boolean
}
export type UpdatePresenceStatusBody = {
  status: 'Available' | 'Away' | 'Do_Not_Disturb'

  /**
   * If you’re updating the status to "Do_Not_Disturb", specify a duration in minutes for which the status should remain as "Do_Not_Disturb".
   * The default value is 20 minutes and the maximum allowed value is 1440 minutes.
   */
  duration?: number
}

export type UpdateUserParams = {
  login_type?: UserLoginType
}
export type UpdateUserBody = {
  first_name?: string
  last_name?: string
  type?: UserAccountType
  pmi?: number
  use_pmi?: boolean
  timezone?: string
  language?: string
  dept?: string
  vanity_name?: string
  host_key?: string
  cms_user_id?: string
  job_title?: string
  company?: string
  location?: string
  phone_number?: string
  phone_country?: string
  custom_attributes?: {
    key: string
    name: string
    value: string
  }[]
  group_id?: string
  phone_numbers?: {
    country: string
    code: string
    number: string
  }[]
  manager?: string
}
export type UserPermissions = {
  permissions: string[]
}
export type GetUserSettingsParams = {
  login_type?: UserLoginType
  option?: 'meeting_authentication' | 'recording_authentication' | 'meeting_security'
  custom_query_fields?: string
}
/** This type definition is incomplete. */
export type UserSettings = {
  feature: {
    meeting_capacity: number
    large_meeting: boolean
    large_meeting_capacity: number
    webinar: boolean
    webinar_capacity: number
    zoom_events: boolean
    zoom_events_capacity: number
    cn_meeting: boolean
    in_meeting: boolean
    zoom_phone: boolean
    concurrent_meeting: 'Basic' | 'Plus' | 'None'
  }
}
export type UpdateUserStatusBody = {
  action: 'activate' | 'deactivate'
}

export default function (zoomRequest: ReturnType<typeof request>) {
  const ListUsers = function (params?: ListUsersParams) {
    return zoomRequest<ListUserResponse>({
      method: 'GET',
      path: '/users',
      params: params,
    })
  }
  const GetUser = function (userId: string, params?: GetUserParams) {
    return zoomRequest<User>({
      method: 'GET',
      path: `/users/${userId}`,
      params: params,
    })
  }
  const GetUserToken = function (userId: string, params?: GetUserTokenParams) {
    return zoomRequest<GetUserTokenResponse>({
      method: 'GET',
      path: `/users/${userId}/token`,
      params: params,
    })
  }
  const CreateUser = function (body: CreateUserBody) {
    return zoomRequest<CreateUserResponse>({
      method: 'POST',
      path: '/users',
      body: body,
    })
  }
  const DeleteUser = function (userId: string, params?: DeleteUserParams) {
    return zoomRequest<{}>({
      method: 'DELETE',
      path: `/users/${userId}`,
      params: params,
    })
  }
  const UpdatePresenceStatus = function (userId: string, body?: UpdatePresenceStatusBody) {
    return zoomRequest<{}>({
      method: 'PUT',
      path: `/users/${userId}/presence_status`,
      body: body,
    })
  }
  const UpdateUser = function (userId: string, params?: UpdateUserParams, body?: UpdateUserBody) {
    return zoomRequest<{}>({
      method: 'PATCH',
      path: `/users/${userId}`,
      params,
      body,
    })
  }
  const GetUserPermissions = function (userId: string) {
    return zoomRequest<UserPermissions>({
      method: 'GET',
      path: `/users/${userId}/permissions`,
    })
  }
  const GetUserSettings = function (userId: string, params?: GetUserSettingsParams) {
    return zoomRequest<UserSettings>({
      method: 'GET',
      path: `/users/${userId}/settings`,
      params: params,
    })
  }
  const UpdateUserStatus = function (userId: string, body: UpdateUserStatusBody) {
    return zoomRequest<{}>({
      method: 'PUT',
      path: `/users/${userId}/status`,
      body: body,
    })
  }

  return {
    ListUsers,
    GetUser,
    GetUserToken,
    CreateUser,
    DeleteUser,
    UpdatePresenceStatus,
    UpdateUser,
    GetUserPermissions,
    GetUserSettings,
    UpdateUserStatus,
  }
}
