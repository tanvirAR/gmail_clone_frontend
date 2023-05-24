import { useRouter } from "next/router";
import SingleEmailPage from "../../../../../../Components/SingleEmailPage/SingleEmailPage";
import { snoozedType } from "../../../../../../interface/EmailType";

export default function SnoozedSingleMail() {
  const router = useRouter();
  let mailId = router.query.mailId;
  if (mailId) {
    mailId = mailId.toString();
  }
  return <SingleEmailPage type={snoozedType} emailId={mailId} />;
}
