
import React from 'react';
import { 
  Bar, 
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from "@/lib/utils";

// Bar Chart Component
export const BarChart = ({ 
  data, 
  index, 
  categories,
  colors = ['#8884d8'],
  valueFormatter,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = 40
}: {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && <YAxis width={yAxisWidth} />}
        <Tooltip 
          formatter={(value: number) => valueFormatter ? [valueFormatter(value), ''] : [value, '']} 
          labelFormatter={(label) => `${label}`}
        />
        {showLegend && <Legend />}
        
        {categories.map((category, i) => (
          <Bar 
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]} 
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

// Line Chart Component
export const LineChart = ({ 
  data, 
  index, 
  categories,
  colors = ['#8884d8'],
  valueFormatter,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = 40,
  startEndOnly = true
}: {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  yAxisWidth?: number;
  startEndOnly?: boolean;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        {showXAxis && (
          <XAxis 
            dataKey={index} 
            tickFormatter={startEndOnly ? (value, index) => {
              return index === 0 || index === data.length - 1 ? value : '';
            } : undefined}
          />
        )}
        {showYAxis && <YAxis width={yAxisWidth} />}
        <Tooltip 
          formatter={(value: number) => valueFormatter ? [valueFormatter(value), ''] : [value, '']} 
          labelFormatter={(label) => `${label}`}
        />
        {showLegend && <Legend />}
        
        {categories.map((category, i) => (
          <Line 
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]} 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

// Pie Chart Component
export const PieChart = ({ 
  data, 
  index, 
  categories,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
  valueFormatter
}: {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Tooltip 
          formatter={(value: number) => valueFormatter ? [valueFormatter(value), ''] : [value, '']} 
          labelFormatter={(label) => `${label}`}
        />
        <Legend />
        
        {categories.map((category, i) => (
          <Pie
            key={category}
            data={data}
            dataKey={category}
            nameKey={index}
            cx="50%"
            cy="50%"
            innerRadius={i * 10}
            outerRadius={50 + i * 10}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        ))}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
