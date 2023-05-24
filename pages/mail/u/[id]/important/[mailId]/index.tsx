import { useRouter } from "next/router";
import SingleEmailPage from "../../../../../../Components/SingleEmailPage/SingleEmailPage";
import { importantEmailApi } from "../../../../../../features/importantEmail/importantEmailApi";
import { importantType } from "../../../../../../interface/EmailType";

export default function ImportantSingleMail() {
  const router = useRouter();
  let mailId = router.query.mailId;
  if (mailId) {
    mailId = mailId.toString();
  }
  return <SingleEmailPage type={importantType} emailId={mailId} />;
}
