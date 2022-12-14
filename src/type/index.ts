export interface FormResponse<T> {
  data?: T | null | undefined;
  message?: string;
  status?: number;
  totalElements?: number;
}

export interface IFormRules {
  name: string;
  required: boolean;
  value: any;
}

export interface Count {
  total: number | undefined;
}

export interface Total {
  totalItem: number | undefined;
}
