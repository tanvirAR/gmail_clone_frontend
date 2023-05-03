

export interface additionalEmailDataSlice {
    inbox: singleMailAdditionalData[]
}

// deleted: false;
interface singleMailAdditionalData {
    deleted?: boolean;
    draft?: boolean;
    id: string;
    important?: boolean;
    inbox?: boolean;
    mailId: string;
    promotion?: boolean;
    read?: boolean;
    snoozed?: any;
    social?: boolean;
    spam?: boolean;
    starred?: boolean;
    trashbin?: boolean;

}