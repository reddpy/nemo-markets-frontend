export enum OrgStatus {
  Sunsetting = "Sunsetting",
  Bankruptcy = "Bankruptcy",
}
export type MarketObject = {
  id: number;
  portfolio_unique_id: string;
  key_metrics_json: JSON;
  display_url: string;
  description: string;
  portfolio_price: string;
  asset_count: number;
  asset_types: string[];
  status: OrgStatus.Bankruptcy | OrgStatus.Sunsetting;
  investors: string[];
  sector: string;
  company_name: string;
};

export type KeyMetrics = {
  header: string;
  value: string;
};
