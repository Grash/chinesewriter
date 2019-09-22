import { characterList } from "./characters"
import * as dbService from './db'

export const loadDailyPracticeCollection = async () => {
  const beginnerCharacters = _.cloneDeep(await dbService.getByLevel('Beginner'))
  const dailyCharacters = []
  for (let i = 0; i < 10; i++) {
    const randomDbCharacter = beginnerCharacters.splice(Math.floor(Math.random() * beginnerCharacters.length), 1)[0]
    const characterData = characterList.find(c => c.character === randomDbCharacter.character)
    dailyCharacters.push(Object.assign({}, characterData, randomDbCharacter));
  }
  return dailyCharacters
}