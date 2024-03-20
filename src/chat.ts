import { PaginatedResponse } from './common';
import request from './util/request';

export type ListChannelMembersParams = {
  channel_id: string;
  page_size?: number;
  next_page_token?: string;
};
export type ListChannelMembersResponse = PaginatedResponse & {
  members: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  }[]
};

export type SendChatMessageParams = {
  at_items: AtItemsItem[];
  rich_text: RichTextItem[];
  message: string;
  file_ids: string[];
  reply_main_message_id: string;
  to_channel: string;
  to_contact: string;
};

interface AtItemsItem {
  at_contact: string;
  at_type: number;
  end_position: number;
  start_position: number;
}
interface RichTextItem {
  start_position: number;
  end_position: number;
  format_type: string;
  format_attr: string;
}


export type SendMessageResponse = {
  id?: string;
};

export interface ListUserChannelsResponse {
  channels: ChannelsItem[];
  next_page_token: string;
  page_size: number;
  total_records: number;
}
interface ChannelsItem {
  channel_settings: Channel_settings;
  id: string;
  jid: string;
  name: string;
  type: number;
  channel_url: string;
}
interface Channel_settings {
  add_member_permissions: number;
  new_members_can_see_previous_messages_files: boolean;
  posting_permissions: number;
  mention_all_permissions: number;
  allow_to_add_external_users: number;
}
type ListUserChannelsParams = {
  userId: string;
  page_size?: number;
  next_page_token?: string;
};

export default function (zoomRequest: ReturnType<typeof request>) {
  const ListChannelMembers = (params: ListChannelMembersParams) => {
    return zoomRequest<ListChannelMembersResponse>({
      method: 'GET',
      path: `/chat/channels/${params.channel_id}/members`,
      params,
    });
  };
  const SendChatMessage = (params: SendChatMessageParams) => {
    return zoomRequest<SendMessageResponse>({
      method: 'POST',
      path: '/chat/users/me/messages',
      body: params,
    });
  };
  const ListUserChannels = (params: ListUserChannelsParams) => {
    return zoomRequest<ListUserChannelsResponse>({
      method: 'GET',
      path: '/chat/users/me/channels',
      params: params,
    });
  };

  return {
    ListChannelMembers,
    SendChatMessage,
    ListUserChannels,
  };
}
