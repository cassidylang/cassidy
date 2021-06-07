export const CArray = {
    sum: (arr: Array<number>) => arr.reduce((a, b) => a + b),
    max: (arr: Array<number>) => Math.max.apply(arr),
    min: (arr: Array<number>) => Math.min.apply(arr),
    sort: (arr: Array<number>) => arr.sort((a: number, b: number) => a-b),
    binarysearch: (Arr: Array<number>,value: number) =>{
        let arr = CArray.sort(Arr);
        var low = 0, high = arr.length - 1, mid;      
        while (low <= high){
            mid = Math.floor((low+high)/2);     
            if(arr[mid] === value) 
                return mid; 
            else if (arr[mid]<value) 
                low = mid+1;
            else 
                high = mid-1;          
        }
        return -1;
    }
}
