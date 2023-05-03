import {
  ref,
  deleteObject,
} from "firebase/storage";

import { storage } from "../firebase/firebase";

export const deleteFile = async (fileName: string) => {
  const storageRef = ref(storage, `gmailClone/files/${fileName}`);
  await deleteObject(storageRef);
  console.log("File deleted successfully");
};
