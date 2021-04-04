import * as l from './parser/Lexer';
import * as li from './parser/Keyword';
import * as fs from 'fs';
import { PathLike } from 'node:fs';
const builtinpath: string[] = [
    'CMath',
    'CArray',
]
const basePath: string = './lib';
class Compiler {
    constructor() {}
    public static produceBuiltInMethod() {
        l.Lexer.tokenArray.forEach(function (e) {
            let token = li.List.List.findIndex(el=>el.keyword = 'using');
            if (e===li.List.List.find(el=>el.keyword==='using')?.keyword) Compiler.evalLib(li.List.List[token].keyword, 1,['']);
        });
    }
    public static evalLib(lib : string, filecount: number = 1, p_array: PathLike[]) {
        let rpath=basePath+lib;
        if (!builtinpath.find(e=>e===lib)) {
            console.error(lib);
        } else if (p_array.length===1){
            fs.copyFile(rpath, p_array[1], (err) => {
                if (err) throw err;
                console.error('Library imported');
            });
        } else {
            fs.appendFile('cas_modules.ts', '',  (err) => {
                if (err) throw err;
                console.error('');
            });
            fs.copyFile(rpath, 'cas_modules.ts', (err) => {
                if (err) throw err;
                console.error('Library imported');
            });
            p_array.forEach(function (e) {
                fs.appendFile('cas_modules.ts', `const ${lib} = require('${rpath}')`,  (err) => {
                    if (err) throw err;
                    console.error('');
                });
            });
        }
    }
}