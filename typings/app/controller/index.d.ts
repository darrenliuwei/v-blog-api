// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/controller/admin';
import ExportArticle from '../../../app/controller/article';
import ExportClassify from '../../../app/controller/classify';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    article: ExportArticle;
    classify: ExportClassify;
    home: ExportHome;
  }
}
