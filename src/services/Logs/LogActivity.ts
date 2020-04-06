import { Service, Inject } from 'typedi';
import { Document, Model } from 'mongoose';
import { ILogsActivity } from '../../interfaces/ILogsActivity';

namespace Models {
    export type LogsActivityModel = Model<ILogsActivity & Document>;
}

@Service()
export default class LogActivityService {
  constructor(
     @Inject('logsActivityModel') private logsActivityModel : Models.LogsActivityModel,
  ) {}

  public async Log(accessToken: string){
    try {
        // await this.logsActivityModel.create({
        //   accessToken: accessToken,
        // });
      
    } catch (e) {
      throw e;
    }
  }
}
