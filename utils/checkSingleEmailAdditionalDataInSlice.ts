import { singleMailAdditionalData } from "../interface/additionalEmailDataSlice.interafce";

export default function checkIfAlredyPresentInSlice(emailDataSlice: singleMailAdditionalData[], mailToBeAdded: singleMailAdditionalData):boolean {
    let isAlreadyPresentInSlice:boolean = false
    for (let i=0; i < emailDataSlice.length; i++) {
        if (emailDataSlice[i].mailId === mailToBeAdded.mailId){
            isAlreadyPresentInSlice = true
        }
    }
    return isAlreadyPresentInSlice;
}