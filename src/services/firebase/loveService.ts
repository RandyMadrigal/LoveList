// src/services/firebase/loveService.ts
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const saveReasons = async (
  slug: string,
  reasons: string[],
  name: string,
) => {
  const ref = doc(db, "lovePages", slug);
  await setDoc(ref, { name, reasons, createdAt: new Date().toISOString() });
};

export const getReasonsBySlug = async (slug: string) => {
  const ref = doc(db, "lovePages", slug);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;
  return snapshot.data() as { name: string; reasons: string[] };
};
