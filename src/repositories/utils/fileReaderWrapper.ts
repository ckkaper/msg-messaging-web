import * as fs from 'fs';

export function readFile(filePath: string): string {
    return fs.readFileSync(filePath).toString();
}

export function readJsonFromFile(filePath: string)  {
    return JSON.parse(readFile(filePath)).toJson();
}

export function writeFile(filePath: string, data: string): void {
    fs.writeFileSync(filePath, data);
}