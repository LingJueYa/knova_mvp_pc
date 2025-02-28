// 从 package.json 中读取版本信息
import { version } from '../../package.json';

export const APP_VERSION = {
  version,
  buildTime: new Date().toISOString(),
  environment: process.env.NODE_ENV,
};