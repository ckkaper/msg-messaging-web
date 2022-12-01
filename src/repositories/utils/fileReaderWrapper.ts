import * as fs from 'fs';

function readFile(filePath: string): any {
    return fs.readFileSync(filePath);
}

export function readJsonFromFile(filePath: string) {
    return JSON.parse(readFile(filePath));
}

export function writeFile(filePath: string, data: string): void {
    fs.writeFileSync(filePath, data);
}
