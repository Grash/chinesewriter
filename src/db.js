import { openDB } from 'idb'
import { characterList } from "./characters"

let db;

export const open = async () => {
  db = await openDB('ChineseWriting', 1, {
    upgrade(db) {
      const store = db.createObjectStore('characters', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('skillLevel', 'skillLevel');
      store.createIndex('id', 'id');
    }
  })

  if( ( await db.getAll('characters')).length === 0 ) {
    const tx = db.transaction('characters', 'readwrite');
    for(let i = 0; i < characterList.length; i++) {
      const { character } = characterList[i];
      tx.store.add({
        character: character,
        skillLevel: 'Beginner',
        skillValue: 0
      });
    }
    await tx.done;
  }
}

export const get = async (key) => {
  return (await db).get('characters', key);
}

export const set = async (key, val) => {
  return (await db).put('characters', val, key);
}

export const getByLevel = async (level) => {
  const tx = db.transaction('characters', 'readwrite');
  const index = tx.store.index('skillLevel');
  return index.getAll(level)
}

export const updateSkillValue = async (id) => {
  let cursor = await db.transaction('characters', 'readwrite').store.index('id').openCursor();

  while (cursor) {
    if(cursor.key === id) {
      cursor.value.skillValue++
      await cursor.update(cursor.value)
    }
    cursor = await cursor.continue();
  }
}