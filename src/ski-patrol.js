import husky from './husky';

export default async function ({projectRoot}) {
  await husky(projectRoot);
}
