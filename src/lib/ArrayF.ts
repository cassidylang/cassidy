export const ArrayF = {
    sum: (arr: Array<number>) => arr.reduce((a, b) => a + b),
    max: (arr: Array<number>) => Math.max.apply(arr),
    min: (arr: Array<number>) => Math.min.apply(arr),
    binarysearch: (Arr: Array<number>,value: number) =>{
        let arr = ArrayF.sort(Arr),low = 0, high = arr.length - 1, mid;      
        while (low <= high) {
            mid = Math.floor((low + high) / 2);     
            if (arr[mid] === value) return mid ; 
            else if (arr[mid] < value) low = mid+1;
            else high = mid-1;
        }
        return -1;
    },
    sort: (arr: Array<number>) => {
        function quicksort(array: number[], left: number, right: number) {
            if (left >= right) {
                return;
            }
            const pivot = array[Math.floor((left + right) / 2)]
            const index = partition(array, left, right, pivot)
            quicksort(array, left, index - 1)
            quicksort(array, index, right)
        }
          
        function swap(array: number[], left: number, right: number) {
            const t = array[right]
            array[right] = array[left]
            array[left] = t
        }
          
        function partition(
            array: number[],
            left: number,
            right: number,
            pivot: number
        ) {
            while (left <= right) {
                while (array[left] < pivot) {
                    left++
                }
            
                while (array[right] > pivot) {
                    right--
                }
            
                if (left <= right) {
                    swap(array, left, right)
                    left++
                    right--
                }
            }
            return left
        }
        quicksort(arr, 0, arr.length - 1)
        return arr;
    }
}
