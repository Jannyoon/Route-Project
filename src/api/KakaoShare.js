export default function KakaoShare(product) {
  const {Kakao} = window;
  const realUrl = "https://jann-rooute-project.netlify.app/"
  console.log("전달받은 product",product);
  const {imgFirst, title, option} = product;
  //"option":"30미dddddddddddddddddddddd, 50미, 60미",
  
  let str = option ? option.split(",").map((obj)=>obj.trim().split(":").map((v,i)=>{
    if (i===1) return ""+v+"원";
    else return v;
  }).join("-")).join("/") : "";

  //console.log("보여줄 것",str)
  const shareKakao = () =>{
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title,
            description: str,
            imageUrl: imgFirst,
            link: {
                mobileWebUrl: realUrl,
            },
        },
        buttons: [
            {
                title: '구매하러 가기',
                link: {
                mobileWebUrl: realUrl,
                },
            },
            ],
        });
    } 
    return {shareKakao};
}


