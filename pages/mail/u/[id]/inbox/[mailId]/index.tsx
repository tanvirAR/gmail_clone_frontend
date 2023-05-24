import { useRouter } from "next/router";
import  SingleEmailPage  from "../../../../../../Components/SingleEmailPage/SingleEmailPage";
import { inboxType } from "../../../../../../interface/EmailType";

export default function InboxSingleMail() {
  const router = useRouter();
  let mailId = router.query.mailId;
  if (mailId) {
    mailId = mailId.toString()
  }
  return <SingleEmailPage type={inboxType} emailId={mailId} />
}
