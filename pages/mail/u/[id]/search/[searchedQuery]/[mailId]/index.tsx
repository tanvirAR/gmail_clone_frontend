import { useRouter } from "next/router";
import SingleEmailPage from "../../../../../../../Components/SingleEmailPage/SingleEmailPage";
import { searchedEmailType } from "../../../../../../../interface/EmailType";

export default function SearchedSingleEmail() {
  const router = useRouter();
  let mailId = router.query.mailId;
  if (mailId) {
    mailId = mailId.toString();
  }
  return <SingleEmailPage emailId={mailId} type={searchedEmailType} />
}

