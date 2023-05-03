import { useGetAllMailsQuery } from "../../features/email/emailApi";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "./SingleEmail";
import TempSingleEmail from "../common/singlemail/SingleMail";



export default function EmailList(props: any) {
  const {emailList} = props;
  
  return (
    <div  >
      {emailList}
      <TempSingleEmail />
      <TempSingleEmail />
      <TempSingleEmail />
      <TempSingleEmail />
      <TempSingleEmail />
    </div>
  );
}
