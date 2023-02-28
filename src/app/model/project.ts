export type project = {
    "project_id"? : number;
    "name"? : string;
    "description"? : string;
    "duration"? : Date;
    "taskList"? : task[];
    "assigned_emp"? :string[];
    "email"? : string; 
}

export type task = {
    "name"? : string;
    "description"? : string;
    "status"? : string;
    "priority"? : string;
}

export type user ={
    "email"? : string;
}