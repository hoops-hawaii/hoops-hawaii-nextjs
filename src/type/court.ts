export type CourtFormData = {
  name: string;
  address: string;
  environment: string;
  capacity: number;
  present: number;
  condition: "very_good" | "good" | "mid" | "bad" | "trash" ;
};