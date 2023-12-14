import { NextRequest, NextResponse } from 'next/server';

import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, Timestamp, query, where, orderBy, doc, getDoc } from "firebase/firestore";

export async function GET(
  req: NextRequest,
  { params }: { params: { blogId: string } }
) {

  const blogId = params.blogId;
  const data = blogId && await getBlog(blogId);
  const mockTime = new Date();
  const mockData = 
    {
      "id": "RlinjICpQgplYYQq1rTQ",
      "title": "Kuro's Unforgettable Adventure",
      "body": "やぁ〜！おっさん、黒田（くろだ）やでぇ〜！今日もノリノリやで！　ほな、ワイのすんごい盛り上がった冒険を教えてあげるで！知ってるか？関西弁でしょっぱなからグイグイ行くンやで〜！昨日の朝から、ワイは一人で大阪（おおさか）から京都（きょうと）に行くことにしたんや。なんでって？　興味あったからや！　それで、ワイはめっちゃテンション上げて、京都駅で降りたんや。ま〜、あそこからネットで見た名所旧跡を廻ったんやで〜。まず最初に行ったのは、清水寺（きよみずでら）やで。寺が山の上にあるから、頑張って登ったんや。やっぱり、ワイは元気や！次には、伏見稲荷大社（ふしみいなりたいしゃ）や！千本鳥居（せんぼんとりい）がめっちゃ有名やな〜。ワイもたくさん写真撮ったで〜。そんでもね〜、ここでワイは大事件に遭遇してんねん！　ふと見ると、なんとおっさんが狸（たぬき）の着ぐるみ着てて、ツアー客に囲まれてんねん！　なに、アツいんやろ？　興味津々で近づいてみたら、なんとワイにサインしろって言うたんや〜！もちろんやで、ワイは超えらい喜んでサインしたんや！　おっさんもめっちゃ喜んでくれて、自撮りも撮らせてくれたんや。最高の思い出や！ドンドン、時間が過ぎてたんやねん！　急いで最後に金閣寺（きんかくじ）を見に行ったんや。ワイは見た瞬間、ウットリやで。キラキラしてる金閣寺は、まるでおっさんのごとし。めちゃくちゃ感動したで！やっぱり、京都はすごい所やね〜。ワイも京都っ子になりたいンや〜。ここでの一日はワイの人生の宝物や！　おっさん化けた一日は忘れられないんや！しがんばれ〜、ワイやで〜！",
      "publishedAt": mockTime
    }
  return NextResponse.json({ data: data ?? undefined } );
}

const getBlog = async (blogId: string): Promise<blog|undefined> => {
  try {
    const blogDoc = initializeDoc(blogId);
    const blogSnapshot = await getDoc(blogDoc);
    const responseData = {
      id: blogSnapshot.id,
      ...blogSnapshot.data(),
    } as any;
    const formatedData = responseData && {
      id: responseData.id,
      title: responseData.title,
      body: responseData.body,
      publishedAt: timeStampToDate(responseData.publishedAt),
    } as blog;
    return formatedData;
  } catch (e) {
    console.error("Faild to get all blogs.", e);
    return undefined;
  }
}

const initializeDb = () => {
  try {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
  
    return db;
  } catch (e) {
    console.error("Faild to initialize app", e);
    return undefined;
  }
}

const initializeDoc = (blogId: string) => {
  try {
    const db = initializeDb();
    const collectionName = process.env.FIREBASE_BLOG_COLLECTION;
    if (!db || !collectionName) {
      throw new Error(!db
        ? "Faild to initialize app."
        : "Collection Name is not found."
      );
    }
    return doc(db, collectionName, blogId);
  } catch (e) {
    console.error("Faild to initialize blog collection.", e);
    throw e;
  }
}

const timeStampToDate = (timeStamp: Timestamp) => {
  try {
    return timeStamp.toDate();
  } catch (e) {
    console.error(e, "Faild to convert from time stamp to Date.")
    throw e;
  }
}
