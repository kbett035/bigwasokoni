import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/useUserStore';

interface Transaction {
  amount: number;
  created_at: string;
}

interface AggregatedData {
  [date: string]: number;
}

const UsageGraph = () => {
  const screenWidth = Dimensions.get('window').width;
  const { session } = useUserStore();

  const [growthData, setGrowthData] = useState<{ date: string; amount: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGrowthData = async () => {
    setLoading(true);

    try {
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from('transactions')
        .select('amount, created_at')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Error fetching transaction data:", error);
        return;
      }

      const aggregatedData: AggregatedData = data.reduce((acc: AggregatedData, transaction: Transaction) => {
        const date = new Date(transaction.created_at).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + transaction.amount;
        return acc;
      }, {});

      const formattedData = Object.keys(aggregatedData).map((date) => ({
        date,
        amount: aggregatedData[date],
      }));

      setGrowthData(formattedData);
    } catch (error) {
      console.error("Error processing data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrowthData();
  }, [session?.user?.id]);

  const getChartData = () => {
    return {
      labels: growthData.map((entry) =>
        new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      ),
      datasets: [
        {
          data: growthData.map((entry) => entry.amount),
          color: (opacity = 1) => `rgba(13, 246, 158, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  return (
    <View style={{ paddingVertical: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Growth Over Time</Text>
      {loading ? (
        <Text style={{ color: 'gray', textAlign: 'center' }}>Loading data...</Text>
      ) : growthData.length > 0 ? (
        <LineChart
          data={getChartData()}
          width={screenWidth - 40}
          height={220}
          yAxisSuffix=" KES"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#f5f5f5',
            backgroundGradientTo: '#e6e6e6',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#0DF69E',
            },
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      ) : (
        <Text style={{ color: 'gray', textAlign: 'center' }}>No growth data available</Text>
      )}
    </View>
  );
};

export default UsageGraph;
