class Node{
  constructor(value=''){
    this.value=value;
    this.end=false;
    this.id='';
    this.child={};
    this.data={};
  }
}

class Trie {
  constructor(){
    this.root = new Node();
    this.result = [];
  }

  insert(string, id, data){
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
    currentNode.data = data;
  }

  search(string){
    let currentNode = this.root;
    let arr = string.split("");
    for (let i=0; i<arr.length; i++){
      let parameter = (arr[i]===" ") ? "*" : arr[i];
      if (currentNode.child[parameter]) currentNode = currentNode.child[parameter];
      else return false; //해당 문자열이 존재하지 않을 경우
    }
    let list = this.getList(currentNode, currentNode.child);
    list.sort((a,b)=>{
      if (a[0]<b[0]) return -1;
      return 1;
    });

    //개수 제한
    if (list.length>10) return list.slice(0,11);
    return list;
    //끝까지 모두 찾았을 경우, 해당 child에 속한 식구들을 모두...
  }

  getList(node, childObj){
    this.result = []; //초기화
    this.dfs(node, childObj);
    return this.result;
  }

  dfs(nowNode, childobj){
    let nowValueStr = nowNode.value.split("").map(v =>{
      if (v==='*') return " ";
      else return v;
    }).join("");

    //child가 없거나 단어가 이미 끝난 경우
    if (Object.values(childobj).length===0){
      this.result.push([nowValueStr, nowNode.id, nowNode.data]);
      return;
    }
    for (let charNode of Object.entries(childobj)){
      this.dfs(charNode[1], charNode[1].child);
    }    
    if (nowNode.end){
      this.result.push([nowValueStr, nowNode.id, nowNode.data]);
    }
    return;
  }
}

export default function searchTrie(database){
  const trie = new Trie();

  for (let i=0; i<database.length; i++){
    const {productId, title} = database[i];
    trie.insert(title, productId, database[i]);
  }

  return trie;
}
