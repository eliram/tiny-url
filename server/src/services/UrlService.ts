import UrlRepo from '@src/repos/UrlRepo';
import { IUrl } from '@src/models/Url';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { getRandomInt } from '@src/util/misc';
import { makeTinyUrl } from './TinyUrlService';


export const URL_NOT_FOUND_ERR = 'Url not found';
export const TINY_URL_NOT_FOUND_ERR = 'Tiny Url not found';


/**
 * Get all urls.
 */
function getAll(): Promise<IUrl[]> {
  return UrlRepo.getAll();
}

/**
 * Add one url.
 */
const addOne: (url: IUrl) => Promise<IUrl> = async (url) => {

  let isUnique = false;
  do {
    url.tinyUrl = makeTinyUrl();
    isUnique = await UrlRepo.isUnique(url.tinyUrl);
  } while (!isUnique);
  url.id = getRandomInt();
  await UrlRepo.add(url);
  return url;
};

/**
 * Delete a url by their id.
 */
async function _delete(id: number): Promise<IUrl[]> {
  const persists = await UrlRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      URL_NOT_FOUND_ERR,
    );
  }
  // Delete url
  console.log(id, "ELIRAM")
  return UrlRepo.delete(id);
}

const getByTinyId: (tinyUrl: string) => Promise<IUrl> 
  = async (tinyUrl) => {
    const url = await UrlRepo.getByTinyUrl(tinyUrl);
    if (!url) {
      throw new RouteError(
        HttpStatusCodes.NOT_FOUND,
        TINY_URL_NOT_FOUND_ERR,
      );
    }
    return url;
  };


export default {
  getByTinyId,
  getAll,
  addOne,
  delete: _delete,
} as const;
