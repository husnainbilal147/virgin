import { Document, Model } from 'mongoose';
import { ILogsActivity } from '../../interfaces/ILogsActivity';
declare global {
  namespace Models {
    export type LogActivityModel = Model<ILogsActivity & Document>;
  }
}
