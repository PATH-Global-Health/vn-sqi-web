export interface SurveyPayload {
  id?: string;
  surveyDate?: Date;
  age?: number | string;
  gender: number | string;
  province: string;
  district: string;
  facility: string;
  facilityName?: string;
  otherService: string;
  app?: string;
  question1: number;
  question2: number;
  question3: number;
  question4: number;
  question5: number;
  question6: number;
  question7: number[];
}

export interface SurveyStatistic {
  indicator: string;
  numerator: number;
  denominator: number;
}
