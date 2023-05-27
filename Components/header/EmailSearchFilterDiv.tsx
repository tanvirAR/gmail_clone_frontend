import { useEffect, useRef, useState } from "react";
import EmailCategorySelect from "./EmailCategorySelect";
import styles from "./EmailSearchFilterDiv.module.css";
import DaySelect from "./DaySelect";
import { allMail, searchMailType } from "../../interface/searchEmailCategory.interface";
import getCategoryName from "../../utils/searchEmailcategoryNameUI";
import getDays from "../../utils/emailSearchDaySelectedUIName";
import { emailSearchQuery } from "../../interface/emailSearchQuery.interace";
import { useRouter } from "next/router";
import { accountNumber } from "../../constants/userAccountSerial";

interface props {
  toggleButtonRef: any;
  setShowComponent: any;
}

const EmailSearchFilterDiv = (props: props) => {
  const router = useRouter();

  const { setShowComponent, toggleButtonRef } = props;
  const thisCompRef = useRef<HTMLDivElement | null>(null);

  const [daySelectShow, setDaySelectShow] = useState(false);
  const daySelectOptionToggleRef = useRef<HTMLDivElement | null>(null);
  const dalySelectShowHandler = () => {
    setDaySelectShow((prev) => !prev);
  };

  const [showEmailCategorySelectOption, setShowEmailCategorySelectOption] =
    useState(false);
  const emailCategoryOptionToggleRef = useRef<HTMLDivElement | null>(null);
  const emailCategorySelectOptionToggleHandler = () => {
    setShowEmailCategorySelectOption((prev) => !prev);
  };

  useEffect(() => {
    // Function to handle when clicks outside the popup to hide this component
    const handleClickOutside = (event: MouseEvent) => {
      if (
        thisCompRef.current &&
        !thisCompRef.current.contains(event.target as Node)
      ) {
        // this div will close upon clicking outside but user can also clik on button which is also outside, so ref of that button is used here
        if (toggleButtonRef.current === event.target) {
          setShowComponent(true);
        } else {
          setShowComponent(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowComponent, toggleButtonRef]);



    const [day, setDay] = useState(1);
    const [category, setCategory] = useState<searchMailType>(allMail); 
    const [attachmentChecked, setAttachmentChecked] = useState(false);

    const [toEmail, setToEmail] = useState('')
    const [fromEmail, setFromEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [hasTheWords, setHasTheWords] = useState('')
    const [doesNoHave, setDoesNotHave] = useState('');

 
    const categoryVisualName = getCategoryName(category);
    const numberOfDaysVisual = getDays(day)


  const searchEmailHandler = () => {
    let query: emailSearchQuery = {
      hasAttachment: attachmentChecked,
      type: category,
      dateWithIn: day,
    };
    if (fromEmail.length > 0) {
      query['from'] = fromEmail
    } 
    if (toEmail.length > 0) {
      query['to'] = toEmail
    }

    if (hasTheWords.length > 0) {
      query['hasWords'] = hasTheWords.split(" ")
    }

    if (doesNoHave.length > 0) {
      query['doesNotHaveWords'] = doesNoHave.split(" ")
    }

    if (subject.length > 0) {
      query['subject'] = subject
    }


    const params = new URLSearchParams();
  for (const key in query) {
    params.set(key, String(query[key as keyof emailSearchQuery]));
  }

    const paramsValue = params.toString();

    router.push(`/mail/u/${accountNumber}/search/${paramsValue}`);
    setShowComponent(false)

  }


  return (
    <div ref={thisCompRef} className={styles.emailSearchFilterDiv}>
      <div>
        <p>From</p>
        <input value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} type="text" />
      </div>

      <div>
        <p>To</p>
        <input value={toEmail} onChange={(e) => setToEmail(e.target.value)} type="text" />
      </div>

      <div>
        <p>Subject</p>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" />
      </div>

      <div>
        <p>Has the words</p>
        <input value={hasTheWords} onChange={(e) => setHasTheWords(e.target.value)} type="text" />
      </div>

      <div>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>Doesn't have</p>
        <input value={doesNoHave} onChange={(e) => setDoesNotHave(e.target.value)} type="text" />
      </div>

      <div className={styles.dayWithin}>
        <p className={styles.day1}>Date Within</p>
        <div
          onClick={dalySelectShowHandler}
          ref={daySelectOptionToggleRef}
          className={styles.select}
        >
          <p>{numberOfDaysVisual}</p>
        </div>
        {daySelectShow && (
          <DaySelect
            setShowComponent={setDaySelectShow}
            toggleButtonRef={daySelectOptionToggleRef}
            setDaySelect={setDay}
          />
        )}
      </div>

      <div className={styles.search}>
        <p>See From</p>
        <div
          onClick={emailCategorySelectOptionToggleHandler}
          ref={emailCategoryOptionToggleRef}
          className={styles.selectS}
        >
          {categoryVisualName}
        </div>
      </div>

      <div className={styles.attachmentFilter}>
        <div>
          <input checked={attachmentChecked} onChange={() => setAttachmentChecked((prev) => !prev)} type="checkbox" />
          <p>Has attachment</p>
        </div>
      </div>

      <div className={styles.bottom}>
   
        <div onClick={searchEmailHandler} className={styles.bottomSearch}>
          <p>Search</p>
        </div>
        {showEmailCategorySelectOption && (
          <EmailCategorySelect
            setShowComponent={setShowEmailCategorySelectOption}
            toggleButtonRef={emailCategoryOptionToggleRef}
            setCategory={setCategory}
          />
        )}
      </div>
    </div>
  );
};

export default EmailSearchFilterDiv;
