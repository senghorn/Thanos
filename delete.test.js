const deleteRandomFiles = require('./index.js');
const fs = require('fs');
const path = require('path');

describe('deleteRandomFiles', () => {
    it('should delete 50% of the files in the specified directory', async () => {
        const directory = './test_directory';
        const numFiles = 10;
        const expectedNumFiles = numFiles / 2;

        // Create test directory with 10 files
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
            for (let i = 0; i < numFiles; i++) {
                fs.writeFileSync(path.join(directory, `file${i}.txt`), `KEKW ${i}`);
            }
        }

        await deleteRandomFiles(directory);

        // Verify that half of the files were deleted
        const files = fs.readdirSync(directory);
        console.log('files in the directory', files);
        expect(files.length).toBe(expectedNumFiles);

        // Clean up the test directory
        for (let i = 0; i < files.length; i++) {
            fs.unlinkSync(path.join(directory, files[i]));
        }
        fs.rmdirSync(directory);
    });
});
