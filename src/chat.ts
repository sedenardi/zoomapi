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
}

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
  
export default function (zoomRequest: ReturnType<typeof request>) {
    const ListChannelMembers = (params: ListChannelMembersParams) => {
        return zoomRequest<ListChannelMembersResponse>({
            method: 'GET',
            path: `/chat/channels/${params.channel_id}/members`,
            params,
        });
    }
    const SendChatMessage = (params: SendChatMessageParams) => {
        return zoomRequest<SendMessageResponse>({
            method: 'POST',
            path: '/chat/users/me/messages',
            body: params,
        });
    }

    return {
        ListChannelMembers,
        SendChatMessage,
    }
}
