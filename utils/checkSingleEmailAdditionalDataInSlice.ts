import lodash from "lodash"
import { singleMailAdditionalData } from "../interface/additionalEmailDataSlice.interafce";

export default function checkIfAlredyPresentInSlice(emailDataSlice: singleMailAdditionalData[], mailToBeAdded: singleMailAdditionalData):boolean | undefined {
    let isAlreadyPresentInSlice:boolean | undefined = false
    for (let i=0; i < emailDataSlice.length; i++) {
        if (emailDataSlice[i].mailId === mailToBeAdded.mailId){
            const isEqual = lodash.isEqual(emailDataSlice[i], mailToBeAdded)
            if (isEqual) {
                isAlreadyPresentInSlice = true;

            } else {
                isAlreadyPresentInSlice = undefined
            }

        }
    }
    return isAlreadyPresentInSlice;
}