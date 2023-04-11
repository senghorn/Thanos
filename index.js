const fs = require('fs');
const path = require('path');


/**
 * Iterates through the directory given and randomly remove files from it.
 * @param {string} directory 
 */
function deleteRandomFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        const numFilesToDelete = Math.ceil(files.length / 2);

        for (let i = 0; i < numFilesToDelete; i++) {
            const randomIndex = Math.floor(Math.random() * files.length);
            const fileToDelete = path.join(directory, files[randomIndex]);

            fs.unlink(fileToDelete, (err) => {
                if (err) throw err;
                console.log(`Deleted file: ${fileToDelete}`);
            });

            files.splice(randomIndex, 1);
        }
    });
}

module.exports = deleteRandomFiles;
