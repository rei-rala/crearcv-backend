import { Express } from 'express';

import { initSvConfig } from './initialConfig';
import { templateConfig } from './handlebars';
import { passportConfig } from './passport';

const configServer = (expressApp: Express, port: string, dirPath: string, mongoUrl: string) => {
  initSvConfig(expressApp, mongoUrl, port)
  templateConfig(expressApp, dirPath)
  passportConfig(expressApp, mongoUrl)
}

export default configServer
export { configServer, initSvConfig, templateConfig }