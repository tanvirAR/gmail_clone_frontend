import classes from "./ScheduleSendButton.module.css"

 const ScheduleSendButton = () => {
  return (
    <div className={classes.main}>
      <span className={`material-symbols-outlined ${classes.icon}`}>schedule_send</span>
      <p>Schedule send</p>
    </div>
  );
}

export default ScheduleSendButton;