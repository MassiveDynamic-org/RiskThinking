import axios from 'axios';
import { isTemplateExpression } from 'typescript';
import { DataItem, RiskItem } from '../types/data';
//import parse from 'csv-parse';
const { parse } = require('csv-parse');
const base_url = process.env.API_URL || "";
const risk_data= process.env.RISK_DATA || "";

export const fetchData = async (): Promise<DataItem[]> => {
  const response = await axios.get(base_url+risk_data);
  return response.data;
};

export const parseCsv = (csvData: string): Promise<RiskItem[]> => {
    return new Promise((resolve, reject) => {
      parse(csvData.trim(), { columns: true }, (err, output) => {
        if (err) {
          reject(err);
        } else {
            debugger
            const data = output as RiskItem[];
            resolve(data);
        }
      });
    });
};
  
export function transformKeys(array: any[]): any[] {
  return array.map(obj => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
      newObj[key.replace(/\s+/g, '_')] = obj[key];
    });
    return newObj;
  });
}

export async function parseAndTransformCsv(csvData: string): Promise<RiskItem[]> {
  const output = await parseCsv(csvData);
  const transformedOutput = transformKeys(output);
  return transformedOutput;
}