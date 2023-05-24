import { useRouter } from "next/router";
import SingleEmailPage from "../../../../../../Components/SingleEmailPage/SingleEmailPage";
import { scheduledType } from "../../../../../../interface/EmailType";

export default function ScheuduledSingleMail() {
  const router = useRouter();
  let mailId = router.query.mailId;
  if (mailId) {
    mailId = mailId.toString();
  }
  return <SingleEmailPage type={scheduledType} emailId={mailId} />;
}
