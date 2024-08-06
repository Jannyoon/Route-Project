class Node{
  constructor(value=''){
    this.value=value;
    this.end=false;
    this.id='';
    this.child={};
  }
}

class Trie {
  constructor(){
    this.root = new Node();
    this.result = [];
  }

  insert(string, id){
    //공백도 문자로 생각하고 작업한다.
    //공백 문자는 #로 child를 넣는다.
    let currentNode = this.root;
    let arr = string.split('');
    for (let i=0; i<arr.length; i++){
      let char = new Node(arr[i]);
      let parameter = (arr[i]===" ") ? "*" : arr[i];
      
      if (!currentNode.child[parameter]){
        char.value = currentNode.value + parameter;
        currentNode.child[parameter] = char;
      }      
      currentNode = currentNode.child[parameter];
    }
    currentNode.end = true;
    currentNode.id = id;
  }

  search(string){
    let currentNode = this.root;
    let arr = string.split("");
    for (let i=0; i<arr.length; i++){
      let parameter = (arr[i]===" ") ? "*" : arr[i];
      if (currentNode.child[parameter]) currentNode = currentNode.child[parameter];
      else return false; //해당 문자열이 존재하지 않을 경우
    }
    let list = this.getList(currentNode.child);
    return list;
    //끝까지 모두 찾았을 경우, 해당 child에 속한 식구들을 모두...
  }

  getList(node){
    this.result = []; //초기화
    this.dfs(node);
    return this.result;
  }

  dfs(node){
    //child가 없거나 단어가 이미 끝난 경우
    if (Object.values(node.child).length===0){
      this.result.push([node.value, node.id]);
      return;
    }
    for (let charNode of Object.entries(node.child)){
      this.dfs(charNode);
    }    
    if (node.end) this.result.push([node.value, node.id]);
    return;
  }
}

export default function searchTrie(database){
  const trie = new Trie();

  for (let i=0; i<database.length; i++){
    const {productId, title} = database[i];
    trie.insert(title, productId);
  }

  return trie;
}
