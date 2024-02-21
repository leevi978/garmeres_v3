const fs = require('fs');

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

export function fileExists(path: string) {
	return fs.existsSync(path);
}
