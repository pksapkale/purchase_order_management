export interface Docket {
  docket_id?: number;
  name: string;
  start_time: string;
  end_time: string;
  no_of_hours_worked: number;
  rate_per_hour: number;
  supplier_name: string;
  purchase_order: number;
}
