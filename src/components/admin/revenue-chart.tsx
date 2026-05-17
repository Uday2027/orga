'use client';

interface MonthlyStat {
  _id: { year: number; month: number };
  revenue: number;
  orders: number;
}

interface RevenueChartProps {
  data: MonthlyStat[];
}

const MONTH_NAMES = [
  'জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগ', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে',
];

export function RevenueChart({ data }: RevenueChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500">
        পর্যাপ্ত ডাটা নেই চার্ট দেখানোর জন্য
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-6">মাসিক রেভিনিউ ও অর্ডার</h3>
      <div className="space-y-4">
        {data.map((item, idx) => {
          const monthLabel = `${MONTH_NAMES[item._id.month - 1]} ${item._id.year}`;
          const barWidth = `${(item.revenue / maxRevenue) * 100}%`;

          return (
            <div key={idx}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 w-24">{monthLabel}</span>
                <span className="font-medium text-[#1B5E20]">
                  ৳{item.revenue.toLocaleString('bn-BD')}
                </span>
                <span className="text-gray-400 text-xs">
                  {item.orders} অর্ডার
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1B5E20] rounded-full transition-all duration-500"
                  style={{ width: barWidth }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
