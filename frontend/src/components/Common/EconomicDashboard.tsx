import { useEffect, useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface EconomicData {
  gdp: Record<string, number>;
  unemployment: Record<string, number>;
  inflation: Record<string, number>;
}

export const EconomicDashboard = () => {
  const [data, setData] = useState<EconomicData | null>(null);

  useEffect(() => {
    fetch('/api/fred/economic-indicators')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  if (!data) return <Text>Loading economic data...</Text>;

  return (
    <VStack spacing={4}>
      <Box>
        <Text fontSize="lg">GDP Trend</Text>
        <LineChart width={300} height={200} data={Object.entries(data.gdp).map(([date, value]) => ({ date, value }))}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </Box>
    </VStack>
  );
};