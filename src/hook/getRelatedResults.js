export default function getRelatedResults(string, all){
  let ans = [];

  for (let product of all){
    if (product.title.includes(string) || product.keyword.includes(string)){
      ans.push([product.title, product.productId, product])
    }
  }
  return ans;
}
