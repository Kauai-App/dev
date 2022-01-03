import { Service, Inject } from 'typedi';

@Service()
export default class MessageService {
  constructor(
    @Inject('logger') private logger,
    @Inject('cheetahMessaging') private cheetahMessaging,
  ) {}

  public async getMyMessages(user_details: any) : Promise<{ messages_list: any }> {
    try {
      const messages_response = await this.cheetahMessaging.getMessages(user_details.cheetah_access_token);
      
      this.logger.silly('messages_response %o', messages_response);
      if(messages_response.success) {
        return { 
          messages_list: messages_response.content 
        }
      } else {
        return { 
          messages_list: [] 
        };
      }
    } catch (e) {
      this.logger.error('🔥 error %o', e);
      throw new Error('Member messages could not be retrieved!');
    }
  }

  public async getMessage(user_details: any, message_id: string) : Promise<{ message: any }> {
    try {
      const message_response = await this.cheetahMessaging.getMessage(user_details.cheetah_access_token, message_id);
      
      this.logger.silly('message_response %o', message_response);
      if(message_response.success) {
        return { message: '' }
      } else {
        return { message: null };
      }
    } catch (e) {
      this.logger.error('🔥 error %o', e);
      throw new Error('Member message could not be retrieved!');
    }
  }
}
