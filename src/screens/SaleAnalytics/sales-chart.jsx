'use client'

import dynamic from 'next/dynamic';
import 'chart.js/auto';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function SalesChart({ data = [] }) {
  const chartData = data.length === 12 ? data : Array(12).fill(0);
  const hasData   = chartData.some((v) => v > 0);

  const chartOptions = {
    resizeDelay: 2,
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 3.5,
    plugins: {
      filler:   { propagate: false },
      title:    { display: false },
      legend:   { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#111',
        bodyColor: '#555',
        borderColor: '#f0f0f0',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => ` ₦${Number(ctx.raw).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid:   { display: false },
        border: { display: false },
        ticks:  { color: '#bbb', font: { size: 11 } },
      },
      y: {
        grid:   { color: 'rgba(0,0,0,0.04)' },
        border: { display: false },
        ticks: {
          color: '#bbb',
          font: { size: 11 },
          callback: (v) => v >= 1000 ? `₦${(v / 1000).toFixed(0)}k` : `₦${v}`,
        },
      },
    },
    interaction: { mode: 'index', intersect: false },
    elements: {
      point: {
        radius: hasData ? 3 : 0,
        hoverRadius: hasData ? 5 : 0,
        backgroundColor: 'var(--oosriPrimary)',
      },
      line: { borderWidth: 2, tension: 0.35 },
    },
  };

  return (
    <Line
      options={chartOptions}
      data={{
        labels: MONTHS,
        datasets: [
          {
            label: 'Revenue',
            fill: 'start',
            borderColor: 'var(--oosriPrimary)',
            backgroundColor: 'rgba(252, 83, 83, 0.06)',
            borderJoinStyle: 'round',
            data: chartData,
          },
        ],
      }}
    />
  );
}
