export interface Keyword {
    keyword: string
    score: number
    color?: string;
    available:boolean;
    message?: string;
    childrens?:Keyword[];
    isChild?:boolean;
  }