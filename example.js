import {patrol} from './lib/index.cjs';

(async () => {
  await patrol({projectRoot: process.cwd()});
})();
