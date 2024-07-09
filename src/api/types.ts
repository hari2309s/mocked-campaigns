export interface IInstall {
  [key: string]: string | number;
}

export interface IRevenue extends IInstall {}

export interface IOverview {
  installs: IInstall[];
  revenue: IRevenue[];
}

export interface ICampaign {
  id: string;
  name: string;
  installs: IInstall[];
}
