import Layout from '@/components/Layout'
import { GET_BEST_SELLERS } from '@/helpers/queries'
import { useQuery } from '@apollo/client'
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

const BestSellers = () => {
  const { data, loading, error, startPolling, stopPolling } = useQuery(GET_BEST_SELLERS)

  React.useEffect(() => {
    // Refetch data after 1 sec to update bar chart
    startPolling(1000)
    return () => {
      stopPolling()
    }
  }, []) 

  if(loading) return 'Loading ...'

  console.log(data);

  const { bestSellers } = data

  const sellerForGraph = []

  // Flatten bestSellers array to match data as required for the bar chart (rechart)
  bestSellers.map((seller, index) => {
    sellerForGraph[index] = {
      ...seller.seller[0],
      total: seller.total
    }
  })

  return (
    <Layout>
      <h1 className="text-2xl text-gray-200 font-light">Best Sellers</h1>
      <BarChart
        className="mt-10"
        width={600}
        height={500}
        data={sellerForGraph}
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
 
export default BestSellers;