import { Document, Model } from 'mongoose';
import { INotification} from '../../interfaces/INotification';
declare global {
  namespace Express {
    export interface Request {
      userDetails: {
        token : string,
        user : any
      };
    }    
  }

  namespace Models {
    export type NotificationModel = Model<INotification & Document>;
  }
}
