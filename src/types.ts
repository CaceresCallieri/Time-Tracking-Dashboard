export interface ITimeframesData {
  daily: { current: number; previous: number };
  weekly: { current: number; previous: number };
  monthly: { current: number; previous: number };
}

export interface IActivityData {
  title: string;
  timeframes: ITimeframesData;
}

export type ITimeframesOptions = "daily" | "weekly" | "monthly";
