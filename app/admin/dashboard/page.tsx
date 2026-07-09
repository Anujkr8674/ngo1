export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#DCCFF8] to-[#CFE8FF] rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-[#444444]">Dashboard Overview</h1>
        <p className="text-[#444444] mt-2 font-medium">Welcome back to your premium admin portal.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stat Card 1 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Users</h3>
            <div className="w-8 h-8 rounded-full bg-[#DCCFF8]/30 flex items-center justify-center text-[#DCCFF8] group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-[#444444]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#444444]">0</span>
            <span className="text-sm text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+0%</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Sessions</h3>
            <div className="w-8 h-8 rounded-full bg-[#CFE8FF]/50 flex items-center justify-center text-[#CFE8FF] group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-[#444444]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#444444]">1</span>
            <span className="text-sm text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+100%</span>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">System Status</h3>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-500">Healthy</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-12 border border-slate-100 shadow-sm flex items-center justify-center min-h-[400px]">
        <p className="text-slate-400 text-sm font-medium">More premium widgets and charts can be added here.</p>
      </div>
    </div>
  )
}
