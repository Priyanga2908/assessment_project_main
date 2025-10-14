// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { ModelMetrics } from '../../../types';

// type Metric = 'Pass Rate' | 'Avg Latency' | 'Avg Quality Score' | 'Avg Toxicity Score' | 'Avg Readability Score';

// interface Report_ChartProps {
//   data: ModelMetrics[];
//   selectedMetric: Metric;
// }

// const METRIC_CONFIG = {
//   'Pass Rate': { key: 'passRate', unit: '%', domain: [0, 100], color: '#22c55e' },
//   'Avg Latency': { key: 'avgLatency', unit: 'ms', domain: [0, 'auto'], color: '#a855f7' },
//   'Avg Quality Score': { key: 'avgQualityScore', unit: '/10', domain: [0, 10], color: '#f59e0b' },
//   'Avg Toxicity Score': { key: 'avgToxicityScore', unit: '', domain: [0, 'auto'], color: '#ef4444' },
//   'Avg Readability Score': { key: 'avgReadabilityScore', unit: ' G', domain: [0, 'auto'], color: '#4f46e5' },
// };

// const CustomizedDot: React.FC<any> = (props) => {
//     const { cx, cy, stroke } = props;
//     return (
//       <circle cx={cx} cy={cy} r={5} stroke={stroke} strokeWidth={2.5} fill="white" />
//     );
// };

// const CustomLegend = ({ payload }: any) => {
//     if (!payload || !payload.length) return null;
//     const { color, value } = payload[0];
//     return (
//         <div className="flex justify-center items-center pt-4">
//             <span className="flex items-center gap-2 font-medium text-sm" style={{color: color}}>
//                  <svg width="30" height="12" viewBox="0 0 30 12" className="mr-1">
//                     <line x1="0" y1="6" x2="30" y2="6" stroke={color} strokeWidth="2.5" />
//                     <circle cx="15" cy="6" r="5" fill="white" stroke={color} strokeWidth="2.5" />
//                 </svg>
//                 {value}
//             </span>
//         </div>
//     );
// };


// const Report_Chart: React.FC<Report_ChartProps> = ({ data, selectedMetric }) => {
//   const config = METRIC_CONFIG[selectedMetric];

//   const chartData = data.map(model => ({
//     name: model.name,
//     value: model[config.key as keyof ModelMetrics],
//   }));

//   const isPassRate = selectedMetric === 'Pass Rate';
//   const yAxisTicks = isPassRate ? [0, 25, 50, 75, 100] : undefined;

//   const yTickFormatter = (value: any) => {
//       if (isPassRate) return `${value}%`;
//       return value;
//   }

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart
//         data={chartData}
//         margin={{
//           top: 20,
//           right: 30,
//           left: 0,
//           bottom: 20,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={true} horizontal={true} />
//         <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} dy={10} />
//         <YAxis 
//             stroke="#6b7280" 
//             fontSize={12} 
//             tickLine={false} 
//             axisLine={false} 
//             unit={isPassRate ? '' : config.unit} 
//             domain={config.domain as [number, any]} 
//             tickFormatter={yTickFormatter} 
//             ticks={yAxisTicks}
//         />
//         <Tooltip
//           cursor={{ stroke: 'rgba(79, 70, 229, 0.2)', strokeWidth: 2, strokeDasharray: '3 3' }}
//           contentStyle={{
//             backgroundColor: '#ffffff',
//             borderColor: '#e5e7eb',
//             borderRadius: '0.5rem',
//             boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
//           }}
//           labelStyle={{ color: '#374151', fontWeight: '600', fontSize: 12 }}
//           formatter={(value: number) => [`${value}${config.unit}`, '']}
//           itemStyle={{ fontWeight: '500' }}
//         />
//         <Legend content={<CustomLegend />} />
//         <Line 
//             name={selectedMetric} 
//             type="linear" 
//             dataKey="value" 
//             stroke={config.color} 
//             strokeWidth={2.5} 
//             activeDot={{ r: 6, fill: config.color }} 
//             dot={<CustomizedDot />}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default Report_Chart;