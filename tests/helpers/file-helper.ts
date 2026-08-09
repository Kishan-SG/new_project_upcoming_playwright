import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

export function readCSV(filePath: string): any[] {
    //read the file
    const csvDataStr = fs.readFileSync(filePath, {encoding: 'utf-8'});

    const csvDataArr = parse(csvDataStr, {columns: true, skip_empty_lines: true, trim: true,});
    return csvDataArr; 
}