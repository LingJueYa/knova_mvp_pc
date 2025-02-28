// 从 package.json 中读取版本信息
import packageJson from '../../package.json'

export const APP_VERSION = {
  version: packageJson.version,
  buildTime: new Date().toISOString(),
  environment: process.env.NODE_ENV,
};