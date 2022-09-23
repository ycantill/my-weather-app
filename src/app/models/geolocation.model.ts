export interface GeoLocationResponse {
  generationtime_ms: number;
  results: GeoLocationResult[];
}

export interface GeoLocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id?: number;
  admin3_id?: number;
  timezone: string;
  population: number;
  postcodes?: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
  admin3?: string;
}

export type GeoLocationForecast = Pick<
  GeoLocationResult,
  'id' | 'name' | 'country' | 'latitude' | 'longitude' | 'admin1'
>;
