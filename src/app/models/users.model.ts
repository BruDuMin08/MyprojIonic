export interface User {
   id: number;
   name: string;
   email: string;
   avatar: string;
   status: number;
   date: Date;
}

export interface ResponseUsers {
    status: string;
    result: User[];
}