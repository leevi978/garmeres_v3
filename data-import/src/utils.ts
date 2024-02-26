const fs = require('fs');
const https = require('https');

export function writeJsonFile(filename: string, object: object) {
    return fs.writeFileSync(filename, JSON.stringify(object), (err: any) => {
        if (err) {
            throw new Error('Something went wrong.');
        }
        console.log(`JSON written to file: ${filename}`);
    });
}

export function writeNdjsonFile(filename: string, objects: object[]) {
    return fs.writeFileSync(
        filename,
        objects.map((obj) => JSON.stringify(obj)).join('\n'),
        (err: any) => {
            if (err) {
                throw new Error('Something went wrong.');
            }
            console.log(`JSON written to file: ${filename}`);
        }
    );
}

export function readJsonFile(filename: string): object {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

export function mkdir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

export function fetchAsset(
    imageUrl: string,
    filename: string
): Promise<string> {
    return new Promise((resolve, reject) => {
        const path = filename.split('/').slice(0, -1).join('/');
        if (fileExists(path)) return resolve(filename);
        mkdir(path);
        const file = fs.createWriteStream(filename);
        https
            .get(imageUrl, (response: any) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Image downloaded as ${filename}`);
                    resolve(filename);
                });
            })
            .on('error', (err: any) => {
                fs.unlink(filename);
                console.error(`Error downloading image: ${err.message}`);
                reject();
            });
    });
}

export function fileExists(path: string) {
    return fs.existsSync(path);
}
