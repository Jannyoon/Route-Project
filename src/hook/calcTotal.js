export default function calcTotal(arr){

  if (!arr) return 0;
  let total = 0;
  for (let i=0; i<arr.length; i++){
    total += parseInt(arr[i].total);
  }
  return total;

}