import husky from './husky';

export async function patrol({projectRoot}) {
  await husky(projectRoot);
}
