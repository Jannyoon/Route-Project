// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, set, child, get } from "firebase/database";
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID 
};
const app = initializeApp(firebaseConfig);


const auth = getAuth();
// Initialize Firebase

/*로그인 관련 훅*/
export function getAuthChanged(func){
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      func(user); //콜백 함수 실행
      return user;
    } 
  });

}

export async function AddNewUser(email, password, func){
  if (password.length<8 || password.length>10){
    alert("비밀번호 자릿수가 맞지 않습니다.")
    return;
  }
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("새로운 유저", user); //가장 중요하게 쓰일 정보는 user.uid
    func();
    return user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    //에러메시지
    let arr = errorMessage && errorMessage.split("(auth/")
    let len = arr[arr.length-1].length;
    let errorType = arr[arr.length-1].slice(0,len-2)
    console.log(arr[arr.length-1].slice(0,len-2));
    console.log(errorMessage);
    alert(errorType);
  });
}

export async function LogIn(email, password, func){
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("로그인 성공", user);
    func();
    return user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("로그인 실패")
  });
}

export async function LogOut(){
  return signOut(auth).then(() => {
  // Sign-out successful.
    console.log("로그아웃");
  }).catch(console.error);
}


/*realtime Database */
export function signUp(userId, email, isFarmer) {
  const db = getDatabase();
  const checkId = uuidv4();
  if (isFarmer){
    set(ref(db, 'Farmers/' + userId), {
      userId,
      email,
    });
  }
  //idCheck를 위해 email만 저장해놓는다.
  userId && set(ref(db, 'FOR_ID_CHECK/'+checkId), email);

  return set(ref(db, 'users/' + userId), {
    userId,
    email: email,
    profile_picture : "https://res-console.cloudinary.com/doujrgenf/thumbnails/v1/image/upload/v1720285571/6riw67O47ZSE66Gc7ZWEX2VtaWt5Yw==/drilldown", 
    nickName:"별명을 입력해주세요",
    isFarmer,
    for_check : checkId  //추후 회원 탈퇴 시 데이터를 삭제할 때 찾을 수 있도록.
  });
}


export async function checkPrevIDs(){
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `FOR_ID_CHECK`)).then((snapshot) => {
    if (snapshot.exists()) {
      let result = Object.values(snapshot.val())
      console.log(result);
      return result;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}


export async function getUserProfile(userId){
  const dbRef = ref(getDatabase());
  if (!userId) return;
  return get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      let result = snapshot.val();
      return result;
    }
  }).catch((error) => {
    console.error(error);
  });
}

export async function updateUserInfo(userInfo, newProp, newVal){
  const db = getDatabase();
  return set(ref(db, 'users/' + userInfo.userId), {
    ...userInfo,
    [newProp] : newVal
  });
}