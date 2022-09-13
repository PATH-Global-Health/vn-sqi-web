export interface Ward {
  label: string;
  value: string;
}

export interface District {
  label: string;
  value: string;
  wards: Ward[];
}

export interface Province {
  label: string;
  value: string;
  type: string;
  districts: District[];
}
