import React, { useState, useEffect } from 'react';

type OilPoint = {
  date: string;
  value: number;
};

const API_KEY = import.meta.env.PUBLIC_ALPHA_VANTAGE_KEY || 'demo';
const API_ENDPOINT = `https://www.alphavantage.co/query?function=WTI&interval=daily&apikey=${API_KEY}`;


const formatCurrency = (value: number) => {
  return `$${value.toFixed(2)}`;
};

const createSvgPath = (points: OilPoint[], width: number, height: number, padding = 16): string => {
  if (!points.length) return '';

  const min = Math.min(...points.map(p => p.value));
  const max = Math.max(...points.map(p => p.value));
  const valueRange = max - min || 1;

  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  const stepX = innerWidth / Math.max(points.length - 1, 1);

  const xy = points.map((point, i) => {
    const x = padding + i * stepX;
    const y = padding + innerHeight - ((point.value - min) / valueRange) * innerHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return `M${xy.join(' L')}`;
};

const OilPriceChart: React.FC = () => {
  const [points, setPoints] = useState<OilPoint[]>([]);
  const [latest, setLatest] = useState<OilPoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);

  const loadPrices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = (await response.json()) as any;

      if (json?.Note || json?.Information || json?.['Error Message']) {
        const message = json.Note || json.Information || json['Error Message'];
        throw new Error(message);
      }

      const maybeData = Array.isArray(json?.data) ? json.data : null;
      let rawPoints: OilPoint[] = [];

      if (maybeData && maybeData.length > 0) {
        rawPoints = maybeData
          .map((item: any) => ({ date: item.date, value: Number(item.value) }))
          .filter(item => !!item.date && Number.isFinite(item.value));
      } else if (json && typeof json === 'object') {
        // Support other time series formats (e.g., Alpha Vantage generic time series fields)
        const candidateKey = Object.keys(json).find(k => /time series/i.test(k) || /series/i.test(k));
        if (candidateKey && json[candidateKey] && typeof json[candidateKey] === 'object') {
          rawPoints = Object.entries(json[candidateKey]).map(([date, value]: [string, any]) => {
            let v = parseFloat(value?.['4. close'] ?? value?.close ?? value?.value ?? value);
            return { date, value: Number(v) };
          }).filter(item => !!item.date && Number.isFinite(item.value));
        }
      }

      const sorted: OilPoint[] = rawPoints
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      if (sorted.length === 0) {
        throw new Error('Missing or invalid data from oil price API');
      }

      if (sorted.length === 0) {
        throw new Error('No valid price points found');
      }

      const last = sorted[sorted.length - 1];
      setPoints(sorted.slice(-14));
      setLatest(last);
      setFetchedAt(new Date());
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(`Unable to load oil price: ${message}`);
      setPoints([]);
      setLatest(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, []);

  const isChartVisible = !loading && !error && points.length > 0;
  const width = 680;
  const height = 220;
  const path = createSvgPath(points, width, height);

  return (
    <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Current WTI Crude Oil Price</h1>
          <p className="text-sm text-gray-600">Fetched from Alpha Vantage</p>
          {latest && (
            <p className="text-3xl font-semibold text-green-600 mt-2">{formatCurrency(latest.value)}</p>
          )}
          {fetchedAt && (
            <p className="text-xs text-gray-500">Last updated: {fetchedAt.toLocaleString()}</p>
          )}
        </div>

        <button
          onClick={loadPrices}
          className="inline-flex items-center justify-center rounded-md border border-blue-500 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading oil prices…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {isChartVisible && (
        <div className="overflow-x-auto">
          <svg width={width} height={height} role="img" aria-label="Oil price line chart" className="block">
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
            <rect x={0} y={0} width={width} height={height} fill="#f8fafc" rx={12} />
            <path d={path} fill="none" stroke="url(#lineGradient)" strokeWidth={3} strokeLinecap="round" />
            {points.map((point, i) => {
              const x = 16 + (i * (width - 32)) / Math.max(points.length - 1, 1);
              const min = Math.min(...points.map(p => p.value));
              const max = Math.max(...points.map(p => p.value));
              const y = 16 + (height - 32) - ((point.value - min) / (Math.max(max - min, 1))) * (height - 32);
              return (
                <circle key={point.date} cx={x} cy={y} r={3.5} fill="#0284c7" />
              );
            })}
            <text x={12} y={20} fontSize={12} fill="#475569">{points[0].date}</text>
            <text x={width - 80} y={20} fontSize={12} fill="#475569">{points[points.length - 1].date}</text>
          </svg>
        </div>
      )}

      {isChartVisible && (
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold">High:</span>{' '}
            {formatCurrency(Math.max(...points.map(p => p.value)))}
          </div>
          <div>
            <span className="font-semibold">Low:</span>{' '}
            {formatCurrency(Math.min(...points.map(p => p.value)))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OilPriceChart;
