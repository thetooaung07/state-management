const numbers = [10, 20, 30];
let total = 0;
for (const n of numbers) {
  total += n;
}
total;
//cv - currentValue , n -
const redeuceNumber = numbers.reduce((cv, n) => {
  console.log(cv);
  return (cv += n);
}, 0);
redeuceNumber;
