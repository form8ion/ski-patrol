import husky from './husky';

export default async function () {
  await husky(process.cwd());
}
