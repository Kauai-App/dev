import { Service, Inject } from 'typedi';
import { Document } from 'mongoose';
import { INotification } from '../interfaces/INotification'

@Service()
export default class NotificationService {
  constructor(
    @Inject('notificationModel') private notificationModel: Models.NotificationModel,
    @Inject('logger') private logger
  ) {}

  public async getNotificationRecord( filter : any ) : Promise<{ notificationRecord : INotification & Document }>{
    try {
      const notificationRecord = await this.notificationModel.findOne(filter);
      return { notificationRecord };
    } catch (e) {
      this.logger.error('🔥 error %o', e);
      throw e;
    }
  }

  public async getAllNotifications() {
    try {
      const notification_list = await this.notificationModel.find({},{
        createdAt:0,
        updatedAt:0,
        __v:0
      });
      
      return notification_list;
    } catch (e) {
      this.logger.error('🔥 error %o', e);
      throw e;
    }
  }
}
