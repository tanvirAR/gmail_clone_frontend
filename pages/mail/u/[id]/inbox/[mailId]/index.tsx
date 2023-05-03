import { useRouter } from "next/router";
import  SingleEmailPage  from "../../../../../../Components/SingleEmailPage/SingleEmailPage";

export default function SingleMail() {
  const router = useRouter();
  let mailId = router.query.mailId;
  if (mailId) {
    mailId = mailId.toString()
  }
  return <SingleEmailPage emailId={mailId} />
}
