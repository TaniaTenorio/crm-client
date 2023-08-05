import Layout from '@/components/Layout';
import * as React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useQuery } from '@apollo/client'
import { GET_BEST_CLIENTS } from '@/helpers/queries';

const BestClients = () => {
  const { data, loading, error, startPolling, stopPolling } = useQuery(GET_BEST_CLIENTS)

  React.useEffect(() => {
    // Refetch data after 1 sec to update bar chart
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [])

  if(loading) return 'Loading ...'
  
  const clientForGraph = [];

  if(data) {
    const { bestClients } = data;
    // Flatten bestClients array to match data as required for the bar chart (rechart)
    bestClients.map((client, index) => {
      clientForGraph[index] = {
        ...client.client[0],
        total: client.total,
      };
    });
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-200 font-light">Best Clients</h1>

      <BarChart
        className="mt-10"
        width={600}
        height={500}
        data={clientForGraph}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#3182CE" />
      </BarChart>
    </Layout>
  );
}
 
export default BestClients