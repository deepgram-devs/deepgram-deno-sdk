import { UsageResponseDetail } from "./usageResponseDetail.ts";

export type UsageResponse = {
  start: string;
  end: string;
  resolution: {
    units: string;
    amount: number;
  };
  results: Array<UsageResponseDetail>;
};
