import './globals.css'
import React from 'react';
import Head from 'next/head';
import RiskDataDisplay from '@/components/RiskDataDisplay';
import AssetTable from '@/components/RiskThinkinTable';
import LineGraph from '@/components/RiskGraph';
import {fetchData, parseCsv,parseAndTransformCsv} from "@/util/dataService"
import { DataItem, RiskItem } from '@/types/data';

const base_url = process.env.API_URL || "";
const risk_data_csv= process.env.RISK_DATA_CSV || "";

interface RiskDataDisplayProps {
  data: RiskItem[];
}


const IndexPage: React.FC = () => {
const [sortedData, setData] = React.useState<RiskDataDisplayProps['data']>([]);
//const [data, setData] = React.useState<RiskItem[]>([]);
  React.useEffect(() => {
    const fetchDataAsync  = async () => {
      debugger;
      const response = await fetch(base_url+risk_data_csv);
      const csvData = await response.text();
      const data = await parseAndTransformCsv(csvData);
      const sortedData = data.sort((a, b) => a.Year - b.Year);
      setData(sortedData);      
      //const jsonData = await fetchData();
      //setData(jsonData);
    };
    fetchDataAsync ();
  }, []);

  return (
    <div>
      <Head>
        <title>RiskThinking</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col justify-center items-center ">
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex h-1/3">
          <RiskDataDisplay data={sortedData} />

          </div>
          <div style={{ minHeight: '100px' }} className="w-full max-w-5xl h-20 flex-shrink-0 ">
          </div>
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex h-1/3">
          <AssetTable assets={sortedData} />
          </div>
          <div style={{ minHeight: '100px' }} className="w-full max-w-5xl h-20 flex-shrink-0 ">
          </div>

          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex h-1/3">
          <LineGraph  data={sortedData} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default IndexPage;