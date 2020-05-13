import {promises as fs} from 'fs';
import {warn} from '@travi/cli-messages';

export default async function (projectRoot) {
  const {scripts} = JSON.parse(await fs.readFile(`${projectRoot}/package.json`, 'utf8'));

  if (scripts.precommit) warn('`precommit` npm script found. This approach has been deprecated by `husky`');
  if (scripts.commitmsg) warn('`commitmsg` npm script found. This approach has been deprecated by `husky`');
}
