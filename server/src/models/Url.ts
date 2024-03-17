import { getRandomInt } from '@src/util/misc';

// eslint-disable-next-line
const urlRegex = /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;


export interface IUrl {
  id: number;
  url: string;
  tinyUrl?: string;
}


/**
 * Create new User.
 */
function new_(
  url: string,
): IUrl {
  return {
    id: getRandomInt(),
    url: url,
  };
}

function isUrl(arg: unknown): boolean {
  return (!!arg && 
    typeof arg === 'object' && 
    urlRegex.test(((arg as IUrl).url))
  );
}

function from(param: object): IUrl {
  // Get urlobj instance
  const p = param as IUrl;
  return new_(p.url);
}

// **** Export default **** //

export default {
  new: new_,
  from,
  isUrl,
} as const;
