 interface sendMailReqBodyInterface {
  email: string;
  message?: string;
  subject?: string;
  attachment?: string;
}

export default sendMailReqBodyInterface;

export interface sendScheduledMailInterface extends sendMailReqBodyInterface {
  time: string
}