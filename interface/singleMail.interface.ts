export  interface email {
    id: string;
    createdAt: string;
    sender: string;
    senderId: string;
    senderEmail: string;
    receiver: string;
    receiverId: string;
    subject: string;
    message: string;
    senderName: string;
    attachment: string;
    sendMailProperty: string;
    receivedMailProperty: string;
    deletedMails: boolean;
}



