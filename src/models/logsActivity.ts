import { ILogsActivity } from '../interfaces/ILogsActivity';
import mongoose from 'mongoose';

const LogsActivity = new mongoose.Schema(
  {
    accessToken: {
      type: String,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ILogsActivity & mongoose.Document>('LogsActivity', LogsActivity);
