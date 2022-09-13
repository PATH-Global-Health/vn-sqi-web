export interface Detail {
  sex: string;
  age_group: string;
  key_population: string;
  type: string;
  value: string;
  _value: number;
  denominatorValue: number;
}

export interface OptionalData {
  value: string;
  _value: number;
  drug_name?: any;
  unit_name?: any;
  data_source?: any;
}

export interface Data {
  indicator_code: string;
  district_code: string;
  site_code: string;
  data: Detail;
  optional_data: OptionalData;
}

export interface Report {
  id: string;
  province_code: string;
  month: string;
  year: string;
  date: Date;
  datas: Data[];
  isSync: boolean;
}

export interface ReportCreateModel {
  month: number;
  year: number;
}

export interface ReportSyncModel {
  month: string;
  year: string;
  province_code: string;
}
