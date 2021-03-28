export const CArray = {
    sum: (arr: Array<number>) => arr.reduce((a, b) => a + b),
    max: (arr: Array<number>) => Math.max.apply(arr),
    min: (arr: Array<number>) => Math.min.apply(arr),
}
