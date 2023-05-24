

export interface additionalEmailDataSlice {
    inbox: singleMailAdditionalData[]
    starred: singleMailAdditionalData[];
    important: singleMailAdditionalData[];
    sent: singleMailAdditionalData[];
    spam: singleMailAdditionalData[];
    trash: singleMailAdditionalData[];
    scheuduled: singleMailAdditionalData[],
    snoozed: singleMailAdditionalData[],
}

// deleted: false;
export interface singleMailAdditionalData {
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