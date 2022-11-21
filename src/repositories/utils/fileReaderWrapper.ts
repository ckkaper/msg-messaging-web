import * as fs from 'fs';

export function readFile(filePath: string): string {
    return fs.readFileSync(filePath).toString();
}

export function readJsonFromFile(filePath: string)  {
    const r = JSON.parse(readFile(filePath)).toJson();
    console.log('readJsonFile');
    console.log(r);
    console.log(typeof(r));
    return r 
}

export function writeFile(filePath: string, data: string): void {
    fs.writeFileSync(filePath, data);
}