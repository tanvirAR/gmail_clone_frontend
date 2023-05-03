import { useGetAllMailsQuery } from "../../features/email/emailApi";
import { email } from "../../interface/singleMail.interface";
import SingleEmail from "./SingleEmail";
import TempSingleEmail from "../common/singlemail/SingleMail";



export default function EmailList(props: any) {
  const {emailList} = props;
//   const {data, error, isError, isLoading, isSuccess} = useGetAllMailsQuery();

//   let emailList;
//   // console.log(data?.mails);
//   // console.log(error);


  
//  if(isError){
//   emailList = <p>Error occured! Please try again.</p>
//  }

//   if (data) {
//     emailList = data.mails.map((email: email) => (
//       <SingleEmail property={email} key={email.id} />
//     ));

//     // emailList = data.mails.map((email: email) =>{ return <SingleEmail key={email.id} property={email}  /> }   )
//   }

//  if (isLoading){
//   emailList = <p>Loading...</p>
//  }

//   if(data &&  data.mails.length == 0){
//     emailList = <p>No Email found!</p>
//   }


  // console.log(emailList)

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
