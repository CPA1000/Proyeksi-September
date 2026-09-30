// components/Dashboard.jsx
import React, { useState } from 'react';

// Data Rangkuman dari File Excel Proyeksi September
const dataRangkuman = [
  { segmen: "AUTO LOAN", badeAug: 1315.37, proyeksiSep: 1305.14, target: 2357.45, kol2: 33.81, npl: 18.17 },
  { segmen: "KPR KKP", badeAug: 3600.96, proyeksiSep: 3603.05, target: 4034.19, kol2: 203.84, npl: 121.56 },
  { segmen: "KSM", badeAug: 8358.18, proyeksiSep: 8378.14, target: 9062.74, kol2: 215.95, npl: 469.91 },
  { segmen: "CREDIT CARD", badeAug: 1350.85, proyeksiSep: 1354.77, target: 1388.62, kol2: 41.66, npl: 43.72 },
  { segmen: "KUM", badeAug: 4880.38, proyeksiSep: 4908.26, target: 5047.00, kol2: 244.48, npl: 91.64 },
];

export default function Dashboard() {
  const [search, setSearch] = useState('');

  const filteredData = dataRangkuman.filter(item => 
    item.segmen.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Proyeksi September</h1>
      <p className="text-sm text-gray-500 mb-6">Laporan Pemantauan Bade, Target, KOL 2, dan NPL</p>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Cari segmen kredit..." 
        className="mb-6 p-2 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabel Data */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Segmen</th>
              <th className="p-3">Bade Aug</th>
              <th className="p-3">Proyeksi Sep</th>
              <th className="p-3">Target</th>
              <th className="p-3">% Pencapaian</th>
              <th className="p-3">KOL 2</th>
              <th className="p-3">NPL</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => {
              const capai = ((row.proyeksiSep / row.target) * 100).toFixed(1);
              return (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{row.segmen}</td>
                  <td className="p-3">{row.badeAug.toLocaleString()}</td>
                  <td className="p-3">{row.proyeksiSep.toLocaleString()}</td>
                  <td className="p-3">{row.target.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs text-white ${capai >= 90 ? 'bg-green-500' : 'bg-amber-500'}`}>
                      {capai}%
                    </span>
                  </td>
                  <td className="p-3">{row.kol2.toLocaleString()}</td>
                  <td className="p-3">{row.npl.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}