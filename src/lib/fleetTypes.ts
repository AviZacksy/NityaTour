export type FleetCarJson = {
  model: string;
  year?: string | number;
  seating?: string;
  fuel?: string;
  rate?: { ac?: number; non_ac?: number };
  per_day_charge?: number;
  images?: string[];
};
