export interface ITickets {
  actual: boolean;
  depart_date: string;
  destination: string;
  distance: number;
  duration: number;
  found_at: string;
  gate: string;
  number_of_changes: number;
  origin: string;
  return_date: string;
  show_to_affiliates: boolean;
  trip_class: number;
  value: number;
}
