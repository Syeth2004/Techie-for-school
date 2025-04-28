export type Module = {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    status: string;
    resources?: string[];
  };
  
  export type ModulesData = Module[];