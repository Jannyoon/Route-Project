// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, set, child, get, remove } from "firebase/database";
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser
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
  if (isFarmer){
    set(ref(db, 'Farmers/' + userId), {
      userId,
      email,
    });
  }
  //idCheck를 위해 email만 저장해놓는다.
  userId && set(ref(db, 'FOR_ID_CHECK/'+userId), email);

  return set(ref(db, 'users/' + userId), {
    userId,
    email: email,
    profile_picture: 'https://res.cloudinary.com/doujrgenf/image/upload/v1720285571/%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_emikyc.jpg',
    nickName:"별명을 입력해주세요",
    isFarmer,
    story:'0'
  });
}


export async function checkPrevIDs(){
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `FOR_ID_CHECK`)).then((snapshot) => {
    if (snapshot.exists()) {
      let result = Object.values(snapshot.val())
      console.log(result);
      return result;
    } else return [];
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

//프로퍼티 추가, 혹은 데이터 수정할 때 사용하는 함수
export async function updateUserInfo(userInfo, newProp, newVal){
  const db = getDatabase();
  return set(ref(db, 'users/' + userInfo.userId), {
    ...userInfo,
    [newProp] : newVal
  }).catch(()=>{
    console.log("여기서 에러 발생");
  });
}


//farmer
export async function updateFarmerInfo(userId, userInfo){
  const db = getDatabase();

  if (userId){  
    if (!userInfo.isFarmer){
      remove(ref(db, 'Farmers/'+userId)).catch(console.error);
    }
    else set(ref(db, 'Farmers/'+userId), {email:userInfo.email, userId})
    return set(ref(db, 'users/' + userId), userInfo).catch(()=>{
      console.log("여기서 에러 발생");
    });
  }
}

export async function removeUser(userId){
  /*
  1)forIdCheck/userId 삭제
  2) isFarmer가 true 값이라면 Farmer/userId도 삭제
  3) users/userId도 삭제
  4) Authentication 삭제가 마지막
  
  */
  const db = getDatabase();
  if (!userId) return;
  remove(ref(db, 'FOR_ID_CHECK/'+userId)).catch(console.error);
  remove(ref(db, 'Farmers/'+userId)).catch(console.error);
  remove(ref(db, 'users/'+userId)).catch(console.error); 
}

export function deleteUserAuth(){
  const user = auth.currentUser;

  return deleteUser(user).then(() => {
    console.log("authentication 삭제")
  }).catch(console.error);

}

//프로퍼티 추가, 혹은 데이터 수정할 때 사용하는 함수
export async function updateUserStory(user, story, storyid){
  const db = getDatabase();
  return set(ref(db, `users/${user.userId}/story/${storyid}`), {...story})
  .catch(()=>{
    console.log("여기서 에러 발생");
  });
}

export async function updateServerStory(story, userData, storyid){
  const db = getDatabase();
  return set(ref(db, `Story/${storyid}`), 
  {...story,
    userId : userData.userId,
    userName : userData.nickName,
    userProfileImg : userData.profile_picture
  })
  .then(result =>console.log(result))
  .catch(console.error)
}