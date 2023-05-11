import request from './util/request';
import {
  PaginatedResponse,
  TrackingField,
  Occurrence,
  ApprovalType,
  RegistrationType,
  Audio,
  AudioRecording,
  Recurrence,
  ListResponse,
  ListRegistrantsParams,
  ListRegistrantsResponse,
  Registrant,
  AddRegistrantParams,
  AddRegistrantResponse,
  UpdateRegistrantStatusBody,
  UpdateRegistrantStatusParams,
} from './common';

/**
 * 5 - Webinar
 * 6 - Recurring webinar with no fixed time
 * 9 - Recurring webinar with a fixed time
 */
export type WebinarType = 5 | 6 | 9;
export type WebinarSettings = {
  host_video?: boolean;
  panelists_video?: boolean;
  practice_session?: boolean;
  hd_video?: boolean;
  approval_type?: ApprovalType;
  registration_type?: RegistrationType;
  audio?: Audio;
  auto_recording?: AudioRecording;
  alternative_hosts?: string;
  close_registration?: boolean;
  show_share_button?: boolean;
  allow_multiple_devices?: boolean;
  on_demand?: boolean;
  global_dial_in_countries?: string[];
  contact_name?: string;
  contact_email?: string;
  registrants_confirmation_email?: boolean;
  registrants_restrict_number?: number;
  notify_registrants?: boolean;
  post_webinar_survey?: boolean;
  survey_url?: string;
  registrants_email_notification?: boolean;
  meeting_authentication?: boolean;
  authentication_option?: string;
  authentication_domains?: string;
  authentication_name?: string;
};
export type Webinar = {
  uuid?: string;
  id?: number;
  host_id?: string;
  topic?: string;
  type?: WebinarType;
  duration?: number;
  timezone?: string;
  created_at?: string;
  join_url?: string;
  agenda?: string;
  start_time?: string;
};
export type WebinarDetails = Webinar & {
  start_url?: string;
  tracking_fields?: TrackingField[];
  occurrences?: Occurrence[];
  settings?: WebinarSettings;
  recurrence?: Recurrence;
  password?: string;
  /** Not documented but present in API response. */
  registration_url?: string;
};
export type ListWebinarsParams = {
  page_size?: number;
  page_number?: number;
  type?: 'scheduled' | 'upcoming';
};
export type ListWebinarsResponse = PaginatedResponse & {
  webinars: Webinar[];
};
export type GetWebinarParams = {
  occurrence_id?: string;
  show_previous_occurrences?: boolean;
};
export type DeleteWebinarParams = {
  occurrence_id?: string;
  cancel_webinar_reminder?: 'true' | 'false';
};
export type WebinarPanelist = {
  id?: string;
  email: string;
  name: string;
  join_url?: string;
};
export type ListPanelistsResponse = ListResponse & {
  panelists: WebinarPanelist[];
};
export type WebinarQADetails = {
  question: string;
  answer: string;
};
export type WebinarQA = {
  name: string;
  email: string;
  question_details: WebinarQADetails[];
};
export type WebinarQAResponse = Pick<Webinar, 'id' | 'uuid' | 'start_time'> & {
  questions: WebinarQA[];
};
export type WebinarRegistrationQuestions = {
  questions: {
    field_name: string;
    required: boolean;
  }[];
  custom_questions: {
    title: string;
    type: 'short' | 'single_radio' | 'single_dropdown' | 'multiple';
    required: boolean;
    answers: string[];
  }[];
};

export default function (zoomRequest: ReturnType<typeof request>) {
  const ListWebinars = function (userId: string, params?: ListWebinarsParams) {
    return zoomRequest<ListWebinarsResponse>({
      method: 'GET',
      path: `/users/${userId}/webinars`,
      params: params,
    });
  };
  const CreateWebinar = function (userId: string, webinar: Webinar) {
    return zoomRequest<Webinar>({
      method: 'POST',
      path: `/users/${userId}/webinars`,
      body: webinar,
    });
  };
  const GetWebinar = function (webinarId: string, params?: GetWebinarParams) {
    return zoomRequest<WebinarDetails>({
      method: 'GET',
      path: `/webinars/${webinarId}`,
      params: params,
    });
  };
  const UpdateWebinar = function (webinarId: string, webinar: Webinar, params?: Pick<GetWebinarParams, 'occurrence_id'>) {
    return zoomRequest<{}>({
      method: 'PATCH',
      path: `/webinars/${webinarId}`,
      params: params,
      body: webinar,
    });
  };
  const DeleteWebinar = function (webinarId: string, params?: DeleteWebinarParams) {
    return zoomRequest<{}>({
      method: 'DELETE',
      path: `/webinars/${webinarId}`,
      params: params,
    });
  };
  const ListPanelists = function (webinarId: string) {
    return zoomRequest<ListPanelistsResponse>({
      method: 'GET',
      path: `/webinars/${webinarId}/panelists`,
    });
  };
  const AddPanelists = function (webinarId: string, panelists: Pick<WebinarPanelist, 'name' | 'email'>[]) {
    return zoomRequest<{}>({
      method: 'POST',
      path: `/webinars/${webinarId}/panelists`,
      body: { panelists: panelists },
    });
  };
  const RemovePanelists = function (webinarId: string) {
    return zoomRequest<{}>({
      method: 'DELETE',
      path: `/webinars/${webinarId}/panelists`,
    });
  };
  const RemoveAPanelist = function (webinarId: string, panelistId: string) {
    return zoomRequest<{}>({
      method: 'DELETE',
      path: `/webinars/${webinarId}/panelists/${panelistId}`,
    });
  };
  const ListWebinarRegistrants = function (webinarId: string, params?: ListRegistrantsParams) {
    return zoomRequest<ListRegistrantsResponse>({
      method: 'GET',
      path: `/webinars/${webinarId}/registrants`,
      params: params,
    });
  };
  const AddWebinarRegistrant = function (webinarId: string, registrant: Registrant, params?: AddRegistrantParams) {
    return zoomRequest<AddRegistrantResponse>({
      method: 'POST',
      path: `/webinars/${webinarId}/registrants`,
      params: params,
      body: registrant,
    });
  };
  const UpdateWebinarRegistrantStatus = function (
    webinarId: string,
    body: UpdateRegistrantStatusBody,
    params?: UpdateRegistrantStatusParams,
  ) {
    return zoomRequest<{}>({
      method: 'PUT',
      path: `/webinars/${webinarId}/registrants/status`,
      params: params,
      body: body,
    });
  };
  const ListPastWebinarQA = function (webinarId: string) {
    return zoomRequest<WebinarQAResponse>({
      method: 'GET',
      path: `/past_webinars/${webinarId}/qa`,
    });
  };
  const DeleteWebinarRegistrant = function (webinarId: string, registrantId: string) {
    return zoomRequest<{}>({
      method: 'DELETE',
      path: `/webinars/${webinarId}/registrants/${registrantId}`,
    });
  };
  const ListRegistrationQuestions = function (webinarId: string) {
    return zoomRequest<WebinarRegistrationQuestions>({
      method: 'GET',
      path: `/webinars/${webinarId}/registrants/questions`,
    });
  };

  return {
    ListWebinars,
    CreateWebinar,
    GetWebinar,
    UpdateWebinar,
    DeleteWebinar,
    ListPanelists,
    AddPanelists,
    RemovePanelists,
    RemoveAPanelist,
    ListWebinarRegistrants,
    AddWebinarRegistrant,
    UpdateWebinarRegistrantStatus,
    ListPastWebinarQA,
    DeleteWebinarRegistrant,
    ListRegistrationQuestions,
  };
}
