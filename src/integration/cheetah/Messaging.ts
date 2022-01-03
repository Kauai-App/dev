import * as api from './CheetahApi';
import Logger from '../../loaders/logger';
import { success } from '../../api/responses/success';
import { failure } from '../../api/responses/failure';

export default class Messaging {
  constructor(){}

  async getMessages(access_token: string) {
    try {
      const { data } = await api.fetchMessages(access_token)

      const response_data: any = data;
      Logger.silly('response_data %o', response_data);
      if(response_data.success)
        return success('Successfully fetched member messages', response_data.data);
      else
        return failure(response_data.message);

    } catch (error) {
      Logger.error('🔥 error %o', error);
    }
  }

  async getMessage(access_token: string, message_id: string) {
    try {
      const { data } = await api.fetchMessage(access_token, message_id)

      const response_data: any = data;
      if(response_data.success)
        return success('Successfully fetched the message', response_data.data);
      else
        return failure(response_data.message);

    } catch (error) {
      Logger.error('🔥 error %o', error);
    }
  }
}