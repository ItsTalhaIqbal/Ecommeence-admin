import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Import ArcElement for Pie chart
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Register ArcElement for Pie chart
  Title,
  Tooltip,
  Legend
);

const Charts = () => {

  // Data for the profit chart
  const profitData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Profit',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: 'rgba(85, 66, 246, 0.2)', 
        borderColor: '#5542F6',
        borderWidth: 1
      }
    ]
  };

  // Data for the sales chart (example data)
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [35, 55, 60, 45, 80, 50, 95],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: '#4BC0C0',
        borderWidth: 1
      }
    ]
  };

  // Data for the pie chart (example data)
  const pieData = {
    labels: ['Category A', 'Category B', 'Category C'],
    datasets: [
      {
        data: [300, 150, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  // Totals and durations
  const totalProfit = 338; // Sum of profit data
  const totalSales = 470; // Sum of sales data
  const duration = '7 months'; // Duration of the data

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">Total Profit</h3>
            <p>{totalProfit}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Duration</h3>
            <p>{duration}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">Profit</h3>
          <Bar data={profitData} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[400px]">
            <h3 className="text-lg font-bold mb-2">Distribution</h3>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Total Sales</h3>
          <p>{totalSales}</p>
        </div>
      </div>
    </div>
  );
};

export default Charts;
