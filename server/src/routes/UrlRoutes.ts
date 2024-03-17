import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import UrlService from '@src/services/UrlService';
import { IUrl } from '@src/models/Url';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get all urls.
 */
async function getAll(_: IReq, res: IRes) {
  const urls = await UrlService.getAll();
  return res.status(HttpStatusCodes.OK).json({ urls });
}

/**
 * Add one url.
 */
async function add(req: IReq<{url: IUrl}>, res: IRes) {
  const { url } = req.body;
  const response = await UrlService.addOne(url);
  return res.status(HttpStatusCodes.CREATED).json(response);
}

/**
 * Delete one url.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  const response = await UrlService.delete(id);
  return res.status(HttpStatusCodes.OK).json({ response });
}

/**
 * get url from tinyUrl
 */
async function getFromTinyUrl(req: IReq, res: IRes) {
  const id = req.params.id;
  const url = await UrlService.getByTinyId(id);
  return res.redirect(url.url);
  // return res.status(HttpStatusCodes.OK).json({ url });
}

export default {
  getFromTinyUrl,
  getAll,
  add,
  delete: delete_,
} as const;
