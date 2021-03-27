export const CArray = {
    sum: arr => arr.reduce((a, b) => a + b),
    max: arr => Math.max.apply(arr),
    min: arr => Math.min.apply(arr),
}