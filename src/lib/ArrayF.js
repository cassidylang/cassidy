"use strict";
exports.__esModule = true;
exports.ArrayF = void 0;
exports.ArrayF = {
    // Prototype
    sum: function(arr) { return arr.reduce(function(a, b) { return a + b; }); },
    max: function(arr) { return Math.max.apply(arr); },
    min: function(arr) { return Math.min.apply(arr); },
    binarysearch: function(Arr, value) {
        var arr = exports.ArrayF.sort(Arr),
            low = 0,
            high = arr.length - 1,
            mid;
        while (low <= high) {
            mid = Math.floor((low + high) / 2);
            if (arr[mid] === value)
                return mid;
            else if (arr[mid] < value)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return -1;
    },
    sort: function(arr) {
        function quicksort(array, left, right) {
            if (left >= right) {
                return;
            }
            var pivot = array[Math.floor((left + right) / 2)];
            var index = partition(array, left, right, pivot);
            quicksort(array, left, index - 1);
            quicksort(array, index, right);
        }

        function swap(array, left, right) {
            var t = array[right];
            array[right] = array[left];
            array[left] = t;
        }

        function partition(array, left, right, pivot) {
            while (left <= right) {
                while (array[left] < pivot) {
                    left++;
                }
                while (array[right] > pivot) {
                    right--;
                }
                if (left <= right) {
                    swap(array, left, right);
                    left++;
                    right--;
                }
            }
            return left;
        }
        quicksort(arr, 0, arr.length - 1);
        return arr;
    }
};