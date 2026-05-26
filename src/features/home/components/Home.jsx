import {
    Users,
    ShieldCheck,
    Activity,
    BarChart3,
    ArrowUpRight,
    ArrowDownLeft,
    AlertTriangle,
    Globe,
    Briefcase,
    TrendingUp
} from "lucide-react";

export const Home = () => {
    const stats = [
        { label: "Usuarios Totales", value: "—", grow: "Activo", icon: Users, color: "text-blue-400" },
        { label: "Liquidez Global", value: "—", grow: "Activo", icon: Briefcase, color: "text-emerald-400" },
        { label: "Transacciones Hoy", value: "—", grow: "Activo", icon: Activity, color: "text-amber-400" },
        { label: "Alertas de Riesgo", value: "0", grow: "Estable", icon: ShieldCheck, color: "text-rose-400" },
    ];

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Panel de Control <span className="text-emerald-400">Sistema Bancario</span></h1>
                        <p className="text-slate-400 mt-1 text-sm uppercase tracking-widest font-semibold">Consola de Administración Central</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 rounded-3xl hover:border-emerald-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl bg-slate-700/50 ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    {stat.grow}
                                </span>
                            </div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-tight">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <BarChart3 className="text-emerald-500 w-6 h-6" />
                                <h3 className="text-xl font-bold">Flujo de Capital</h3>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                    <ArrowDownLeft className="w-4 h-4" /> Entradas
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                                    <ArrowUpRight className="w-4 h-4" /> Salidas
                                </div>
                            </div>
                        </div>

                        <div className="h-48 flex items-end justify-between gap-2 px-4">
                            {[40, 70, 45, 90, 65, 80, 95, 60, 50, 85].map((h, i) => (
                                <div key={i} className="flex-1 bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg transition-all hover:scale-110 cursor-pointer" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 px-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            <span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span>
                        </div>
                    </div>

                    <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 flex flex-col justify-between">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Globe className="text-emerald-500 w-6 h-6" /> Volumen por Divisa
                        </h3>
                        <div className="space-y-6">
                            {[
                                { coin: "USD", vol: "—", perc: "65%", icon: ArrowUpRight, color: "text-emerald-400" },
                                { coin: "EUR", vol: "—", perc: "25%", icon: ArrowUpRight, color: "text-emerald-400" },
                                { coin: "LOCAL", vol: "—", perc: "10%", icon: ArrowDownLeft, color: "text-rose-400" },
                            ].map((d, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-slate-300 flex items-center gap-2">
                                            <d.icon className={`w-3 h-3 ${d.color}`} />
                                            {d.coin}
                                        </span>
                                        <span className="text-white">{d.vol}</span>
                                    </div>
                                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: d.perc }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            <p className="text-[10px] text-slate-400 leading-tight">
                                Sistema Bancario <span className="text-emerald-400 font-bold">activo</span> y funcionando.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className="text-rose-500 w-6 h-6" />
                        <h3 className="text-xl font-bold">Alertas de Seguridad</h3>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-slate-700/50">
                        <table className="w-full text-left">
                            <thead className="bg-slate-700/30 text-[10px] uppercase font-bold text-slate-400">
                                <tr>
                                    <th className="px-6 py-4">Evento</th>
                                    <th className="px-6 py-4">ID Usuario</th>
                                    <th className="px-6 py-4 text-right">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50 text-sm">
                                <tr>
                                    <td className="px-6 py-4 text-slate-500 italic" colSpan={3}>
                                        No hay alertas de seguridad en este momento.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
