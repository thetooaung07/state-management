/* Use Memo whenever there is a complex calculation that doesn't 
necessarily change with component re-render

other thing is when creating objects or array use- useMemo
*/

/* Use Callback when you don't want to define function outside && 


if you defind that inside, it gonna give different reference everytime the parent component render


so useCallback is the way (for function)
useMemo for array and objects

(scalar - bool, num, string) can be use only with useState but arrays and objects should be use with useMemo (if heavy calculation is neccessary ) while in order to prevent calling function when component re-renders use - useCallback

*/

import { useMemo, useState } from "react";

function SortedList({ list }: any) {
  console.log("Sorted List Render");
  const sortedList = useMemo(() => {
    console.log("Run inside useMemo");

    return [...list].sort();
  }, []);
}
export const useMemoTest = () => {
  const [numbers] = useState([10, 20, 30]);

  const total = useMemo(() => {
    return numbers.reduce((cur, next) => {
      return cur + next;
    }, 0);
  }, []);

  const [names] = useState(["John", "Paul", "George", "Ringo"]);

  const sortedNames = [...names].sort();

  return (
    <div>
      <div>Total ${total}</div>
      <div>Names ${names.join(" , ")}</div>
      <div>Sorted Names ${sortedNames.join(" , ")}</div>
    </div>
  );
};
