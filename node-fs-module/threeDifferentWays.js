/** Using file system promises API */
import fs from 'fs/promises';

(async () => {
  try {
    await fs.copyFile('./file.txt', 'copied-promise.txt');
  } catch (error) {
    console.log(error);
  }
})();

/** Using callback API */

import fs from 'node:fs';

fs.copyFile('./file.txt', 'copied-callback.txt', (err) => {
  if (err) {
    console.log(err);
  }
});

/** Using sychronous API */
import fs from 'node:fs';

fs.copyFileSync('./file.txt', 'copied-sychronous.txt');
