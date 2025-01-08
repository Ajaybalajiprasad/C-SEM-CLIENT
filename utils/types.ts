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

  export interface StudyResource {
    name: string;
    description: string;
  }
  
  export interface DetailedInfo {
    importanceDescription: string;
    estimatedStudyTime: string;
    keyConcepts: string[];
    studyResources: StudyResource[];
  }
  
  export interface DetailedInfoMap {
    [key: number]: DetailedInfo;
  }

  export interface AnswerDetail {
    explanation: string;
    code: string;
  }
  
  export interface Answers {
    [key: number]: string;
  }
  
  export interface TwoMarkQuestion {
    question: string;
    explanation: string;
    code: string;
  }
  
  export interface TwoMarks {
    [key: number]: TwoMarkQuestion;
  }