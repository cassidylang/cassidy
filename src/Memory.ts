// import * as fs from 'fs';
// export class Memory {
//     constructor() {}
//     /**
//      * Add flags to mem
//      */
//     public static addToMem(str: string) {
//         fs.appendFile('mem.txt', str, err => {
//             if (err) throw err;
//             console.log('Variable data and flags pushed to memory');
//           });
//     }
//     /**
//      * Delete mem file
//      */
//     public static removeMem(str: string) {
//         fs.unlink('mem.txt', err => {
//             if (err) throw err;
//             console.log('Memory cleared');
//           });
//     }
//     /**
//      * Read mem
//      */
//     public static readMem(str: string) {
//         fs.readFile('mem.txt', 'utf8',(err, data) => {
//             if (err) throw err;
//             let mem = data;
//             return mem;
//         });
//     }
// }