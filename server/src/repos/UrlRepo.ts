import { IUrl } from '@src/models/Url';
import orm from './MockOrm';


const getByTinyUrl: (urlInput: string) => Promise<IUrl | null> = async (urlInput) => {
  const db = await orm.openDb();
  for (const url of db.urls) {
    if (url.tinyUrl === urlInput) {
      return url;
    }
  }
  return null;
};
/**
 * Get one url.
 */
const getOne: (urlInput: string) => Promise<IUrl | null> = async (urlInput) => {
  const db = await orm.openDb();
  for (const url of db.urls) {
    if (url.url === urlInput) {
      return url;
    }
  }
  return null;
};

/**
 * See if a url with the given id exists.
 */
const persists: (id: number)=> Promise<boolean> = async (id) => {

  const db = await orm.openDb();
  for (const url of db.urls) {
    if (url.id === id) {
      return true;
    }
  }
  return false;
};

const isUnique: (tinyUrl: string) => Promise<boolean> = async (tinyUrl) => {
  const db = await orm.openDb();
  return !db.urls.some((url) => url.tinyUrl === tinyUrl );
};

const getAll: () => Promise<IUrl[]> = async () => {
  const db = await orm.openDb();
  return db.urls;
};

const add: (url: IUrl) => Promise<void> = async (url) => {
  const db = await orm.openDb();
  db.urls.push(url);
  return orm.saveDb(db);
};

const delete_: (id: number) => Promise<IUrl[]> = async (id) => {
  const db = await orm.openDb();
  for (let i = 0; i < db.urls.length; i++) {
    if (db.urls[i].id === id) {
      db.urls.splice(i, 1);
      orm.saveDb(db);
      return db.urls;
    }
  }
  return db.urls;
};


export default {
  getByTinyUrl,
  getOne,
  persists,
  getAll,
  add,
  delete: delete_,
  isUnique,
} as const;
