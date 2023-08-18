import fs from 'node:fs/promises';

(async () => {
  try {
    const CREATE_FILE = 'create file';
    const DELETE_FILE = 'delete file';
    const RENAME_FILE = 'rename file';
    const ADD_TO_FILE = 'add to file';

    let existingFile;
    const createFile = async (filePath) => {
      try {
        existingFile = await fs.open(filePath, 'r');
        await existingFile.close();
        if (existingFile) {
          console.log(`The file with this path ${filePath} already exist.`);
        }
      } catch (error) {
        let newFile = await fs.open(filePath, 'w');
        console.log('A new file was successfully created.');
        await newFile.close();
      }
    };

    const deleteFile = async (filePath) => {
      try {
        if (filePath) {
          await fs.unlink(filePath);
          console.log('The file was successfully deleted.');
        }
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log('File does not exist');
        } else {
          console.log('Error occured while deleting the file');
        }
      }
    };

    const renameFile = async (oldPath, newPath) => {
      try {
        existingFile = await fs.open(newPath, 'r');
        if (existingFile) {
          await fs.rename(oldPath, newPath);
          console.log(`Rename ${oldPath} to ${newPath}`);
        }
        await existingFile.close();
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log('File does not exist');
        } else {
          console.log(`The file with path ${oldPath} does not exist`);
        }
      }
    };

    const updateFile = async (filePath, content) => {};

    const fileHandler = await fs.open('./command.txt', 'r');
    fileHandler.on('change', async () => {
      const size = (await fileHandler.stat()).size;
      const buffer = Buffer.alloc(size);
      const option = {
        buffer,
        offset: 0,
        length: size,
        position: 0,
      };
      await fileHandler.read(option);
      const command = buffer.toString('utf-8');
      if (command.includes(CREATE_FILE)) {
        createFile(command.substring(CREATE_FILE.length + 1));
      }

      if (command.includes(DELETE_FILE)) {
        deleteFile(command.substring(DELETE_FILE.length + 1));
      }

      if (command.includes(RENAME_FILE)) {
        let oldPath = command.substring(RENAME_FILE.length + 1);
        let newPath =
          command.substring(
            RENAME_FILE.length + 1,
            command.lastIndexOf('/') + 1
          ) + 'updateName.txt';
        console.log(newPath);
        renameFile(oldPath, newPath);
      }
    });

    const watcher = fs.watch('./command.txt');
    for await (const event of watcher) {
      if (event.eventType === 'change') {
        fileHandler.emit('change');
      }
    }
    await fileHandler.close();
  } catch (error) {
    console.log(error);
  }
})();
