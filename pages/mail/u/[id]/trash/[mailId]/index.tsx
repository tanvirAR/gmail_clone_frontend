import { useRouter } from "next/router";
import SingleEmailPage from "../../../../../../Components/SingleEmailPage/SingleEmailPage";
import { trashType } from "../../../../../../interface/EmailType";

export default function TrashSingleMail() {
  const router = useRouter();
  let mailId = router.query.mailId;
  if (mailId) {
    mailId = mailId.toString();
  }
  return <SingleEmailPage type={trashType} emailId={mailId} />;
}
