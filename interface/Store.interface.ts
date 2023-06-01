import AuthSliceInterface from "./AuthSlice.interface";
import { emailSlice } from "./EmailSliceInterface";
import UIInitialState from "./UISlice.interface";
import { additionalEmailDataSlice } from "./additionalEmailDataSlice.interafce";



export default interface storeStateInterface {
  UI: UIInitialState;
  auth: AuthSliceInterface;
  email: emailSlice;
  additionalEmailData: additionalEmailDataSlice;
}