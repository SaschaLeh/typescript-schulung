let numbers2: number[] = [1, 2, 3, 4, 5];

const index = numbers2.indexOf(4);
if (index !== -1) {
  numbers2.splice(index, 1);
}
console.log(numbers2); // [1, 2, 3, 5]