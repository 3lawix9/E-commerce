// var containsDuplicate = function(nums) {
//     let i = new Set(nums);
//     arr = Array.from(i)
//     if (nums.length !== arr.length){
//         return true;
//     }else {
//         return false;
//     }
// };


// console.log(containsDuplicate([1, 2, 3 , 5]));

// var isAnagram = function(s, t) {
//     let arr = s.concat(t).split('') // [ 'e', 'a', 't', 't', 'e', 'a' ]
//     let set = new Set(arr); // { 'e', 'a', 't' }
//     if(arr.length !== set.size){
//         return true;
//     }else {
//         return false;
//     }

// };

// console.log(isAnagram('eat','ali' ));
let s = 'eat';
let t = 'ali';
let final = s.concat(t).split('');

console.log(final);


// [ 'e', 'a', 't] , ['l', 'i', 'a' ]