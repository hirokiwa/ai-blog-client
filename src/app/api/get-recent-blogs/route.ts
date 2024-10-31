import { NextResponse } from 'next/server';
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, Timestamp, query, where, orderBy, limit } from "firebase/firestore";

const RECENT_BLOG_QUANTITY = 5;

export async function GET() {
  const data = await getAllBlogs();
  return NextResponse.json({ data: data } );
}

const getAllBlogs = async (): Promise<blog[]|undefined> => {
  try {
    const blogCollection = initializeBlogCollection();
    const TIME_DIFFERENCE = Number(process.env.TIME_DIFFERENCE ?? "0");
    const publishedDate = new Date();
    publishedDate.setHours(publishedDate.getHours() + TIME_DIFFERENCE);
    const blogQuery = query(blogCollection, where("publishedAt", "<=", publishedDate), orderBy("publishedAt", "desc"), limit(RECENT_BLOG_QUANTITY));
    const blogSnapshot = await getDocs(blogQuery);
    const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const formatedData = blogList
      .filter((b: any) => b.publiclyAvailable )
      .map((b: any): blog => ({
        id: b.id,
        title: b.title,
        body: b.body,
        publishedAt: timeStampToDate(b.publishedAt),
    }));
    return formatedData.length > 0 ? formatedData : undefined;
  } catch (e) {
    console.error("Faild to get recent blogs.", e);
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

const initializeBlogCollection = () => {
  try {
    const db = initializeDb();
    const collectionName = process.env.FIREBASE_BLOG_COLLECTION;
    if (!db || !collectionName) {
      throw new Error(!db
        ? "Faild to initialize app."
        : "Collection Name is not found."
      );
    }
    return collection(db, collectionName);
  } catch (e) {
    console.error("Faild to initialize blog collection.", e);
    throw e;
  }
}

const timeStampToDate = (timeStamp: Timestamp) => {
  try {
    console.log(timeStamp.toDate())
    return timeStamp.toDate();
  } catch (e) {
    console.error(e, "Faild to convert from time stamp to Date.")
    throw e;
  }
}
