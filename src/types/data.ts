export interface DataItem {
    location: string;
    latitude: number;
    longitude: number;
    risk_level: number;
  }
export interface RiskItem{
    Asset_Name: string,
    Lat: number,
    Long: number,
    Business_Category: string,
    Risk_Rating: number,
    Risk_Factors: {},
    Year: number
}