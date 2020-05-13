// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {patrol} from './lib/index.cjs';

// remark-usage-ignore-next
stubbedFs();

(async () => {
  await patrol();
  // remark-usage-ignore-next
  stubbedFs.restore();
})();
