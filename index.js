const fs = require('fs');
const path = require('path');


/**
 * Iterates through the directory given and randomly remove files from it.
 * @param {string} directory 
 */
async function deleteRandomFiles(directory) {
    const files = await new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) reject(err);
            resolve(files);
        });
    });

    const numFilesToDelete = Math.ceil(files.length / 2);
    const randomIndices = Array.from({ length: numFilesToDelete }, (_, i) => i);
    randomIndices.sort((a, b) => b - a); // sort in descending order

    for (let i = 0; i < numFilesToDelete; i++) {
        const fileToDelete = path.join(directory, files[randomIndices[i]]);

        await new Promise((resolve, reject) => {
            fs.unlink(fileToDelete, (err) => {
                if (err) reject(err);
                console.log(`Deleted file: ${fileToDelete}`);
                resolve();
            });
        });
    }
}


module.exports = deleteRandomFiles;
