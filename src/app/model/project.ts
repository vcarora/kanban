export type project = {
    "project_id"? : number;
    "name"? : string;
    "description"? : string;
    "duration"? : Date;
    "taskList"? : task[];
    "assigned_emp"? :string[];
    "email"? : string;
    "archive"?: string; 
    "assigned_empl"?:user[]
}

export type task = {
    "name"? : string;
    "description"? : string;
    "status"? : string;
    "priority"? : string;
    "email"?: string
    "memberList"?:user[]
}

export type user = {
    "email"? : string;
    "username"?: string;
    "title"?: string;
    "profile_pic"?: string;
}