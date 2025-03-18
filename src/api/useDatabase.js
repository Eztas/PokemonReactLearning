// https://zenn.dev/nash/articles/6e18bd94eca63e

import { firestore, collectionAccessLogID, documentID } from '../firebaseConfig'; // 上記のコードを保存したファイル
import { doc, setDoc, updateDoc, collection, getDocs, increment } from 'firebase/firestore'

export const updateAccessLog = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}/` + month + '/' + day;

  const docRef = doc(firestore, collectionAccessLogID, documentID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const newestAccessTime = data.newestAccessTime || "";
    if (newestAccessTime === todayStr) {
      await updateDoc(docRef, { accessCount: increment(1) });
    } else {
      await updateDoc(docRef, { newestAccessTime: todayStr, accessCount: increment(1) });
    }
  } else {
    await setDoc(docRef, { newestAccessTime: todayStr, accessCount: 1 });
  }
}
