export type Tmeta = {
  timestamp: string;
  request_id: string;
  response_code: number;
  response_time: number;
  cache_hit: boolean;
  rate_limit_remaining: number;
  rate_limit_reset: number;
};

export type TerrorDetail = {
  code: number;
  name: string;
  message: string;
  details: string;
  field?: string;
  severity: "warning" | "error" | "critical";
  type: "validation" | "authorization" | "system";
  timestamp: string;
};

export type Twarning = {
  name: string;
  message: string;
};

export type TresponseFormat<T> = {
  success: true;
  message: string;
  meta: Tmeta;
  data: T;
  errors: TerrorDetail[];
  warnings?: Twarning[];
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
