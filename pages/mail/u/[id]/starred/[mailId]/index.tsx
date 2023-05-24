import { useRouter } from "next/router";
import SingleEmailPage from "../../../../../../Components/SingleEmailPage/SingleEmailPage";
import { starredType } from "../../../../../../interface/EmailType";

export default function StarredSingleMail() {
  const router = useRouter();
  let mailId = router.query.mailId;
  if (mailId) {
    mailId = mailId.toString();
  }
  return <SingleEmailPage type={starredType} emailId={mailId} />;
}
