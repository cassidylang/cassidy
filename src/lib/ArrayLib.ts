export const CArray = {
    sum: (arr: Array<any>) => arr.reduce((a, b) => a + b),
    max: (arr: Array<any>) => Math.max.apply(arr),
    min: (arr: Array<any>) => Math.min.apply(arr),
}
