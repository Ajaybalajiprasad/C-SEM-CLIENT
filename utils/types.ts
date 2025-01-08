export interface ChecklistItem {
    id: number;
    text: string;
    completed: boolean;
    unit: number;
    important: boolean;
  }
  
 export interface Unit {
    id: number;
    name: string;
    description: string;
  }