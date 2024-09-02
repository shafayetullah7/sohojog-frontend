export type Tmeta = {
  timestamp: string;
  request_id: string;
  response_code: number;
  response_time: number;
  url: string;
  method: string;
  rate_limit_remaining: number;
  rate_limit_reset: number;
};

export type TerrorIssue = {
  field?: string;
  message: string;
};

export type TerrorDetail = {
  code: number;
  name: string;
  message: string;
  details: any;
  issues: TerrorIssue[];
  severity: "warning" | "error" | "critical";
  type: "validation" | "authorization" | "system" | "http" | "prisma";
  timestamp: string;
};

export type Twarning = {
  name: string;
  message: string;
};

export type Taccess = {
  token?: string;
  otpToken?: string;
  sessionExpired?: boolean;
  verificationRequired?: boolean;
  refreshToken?: string;
};
export type TresponseFormat<T> = {
  success: boolean;
  message: string;
  meta: Tmeta;
  data: T;
  errors: TerrorDetail[];
  warnings?: any[];
  access: Taccess;
};

export type TerrorResponse = {
  success: false;
  message: string;
  meta: Tmeta;
  data: null;
  errors: TerrorDetail[];
  warnings?: Twarning[];
};

export type Tresponse<T> = {
  data: TresponseFormat<T>;
};
