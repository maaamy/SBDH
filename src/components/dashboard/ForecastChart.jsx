import {
    ResponsiveContainer, LineChart,
    Line, CartesianGrid,
    XAxis, YAxis,
    Tooltip, Legend,
} from "recharts";
import { useMemo, useState, useRef } from "react";
import { Info } from "lucide-react";

const InfoTooltip = ({ text }) => {
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const ref = useRef(null);

    const handleMouseEnter = () => {
        const rect = ref.current.getBoundingClientRect();
        setPos({ top: rect.bottom + 4, left: rect.left });
        setShow(true);
    };

    return (
        <div className="inline-block" ref={ref}>
            <Info
                size={14}
                className="text-grey cursor-pointer hover:text-color-button transition-colors"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setShow(false)}
            />
            {show && (
                <div
                    style={{ top: pos.top, left: pos.left }}
                    className="fixed w-56 bg-black/80 text-white normalText rounded-xl p-2 z-[9999]"
                >
                    {text}
                </div>
            )}
        </div>
    );
};

const StatCard = ({ label, value, colorClass, info, subtitle }) => (
    <div className="bg-white rounded-xl p-3 shadow">
        <div className="flex items-center gap-1 mb-1">
            <p className="normalText">{label}</p>
            <InfoTooltip text={info} />
        </div>
        <p className={`secondaryTitleText font-bold ${colorClass ?? "text-color-button"}`}>
            {value}
        </p>
        {subtitle && <p className="normalText">{subtitle}</p>}
    </div>
);

const ForecastChart = ({ forecast }) => {

    const data = useMemo(() => {
        return (forecast || []).map((item) => ({
            date: item.ds?.slice(0, 10),
            y: item.y ?? null,
            yhat: item.yhat != null ? parseFloat(item.yhat.toFixed(2)) : null,
        }));
    }, [forecast]);

    const stats = useMemo(() => {
        if (!data.length) return null;

        const withY = data.filter((d) => d.y != null && d.y > 0);
        if (!withY.length) return null;

        const meilleurJour = [...withY].sort((a, b) => b.y - a.y)[0];

        const mid = Math.floor(withY.length / 2);
        const premiereMoitie = withY.slice(0, mid);
        const deuxiemeMoitie = withY.slice(mid);

        const moyPremiere = premiereMoitie.reduce((acc, d) => acc + d.y, 0) / (premiereMoitie.length || 1);
        const moyDeuxieme = deuxiemeMoitie.reduce((acc, d) => acc + d.y, 0) / (deuxiemeMoitie.length || 1);
        const tendance = moyDeuxieme > moyPremiere ? "hausse" : "baisse";

        const moyYhat = data.filter((d) => d.yhat != null).reduce((acc, d) => acc + d.yhat, 0) / (data.length || 1);
        const joursSansVentes = data.filter((d) => d.y === 0 || d.y == null).length;
        const nbJoursRecent = deuxiemeMoitie.length;

        return {
            meilleurJour,
            tendance,
            moyRecente: moyDeuxieme.toFixed(2),
            moyYhat: moyYhat.toFixed(2),
            joursSansVentes,
            nbJoursRecent,
        };
    }, [data]);

    if (!data.length) return <p className="normalText text-button-hover">Aucune donnée.</p>;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const reel = payload.find((p) => p.dataKey === "y")?.value;
            const prevu = payload.find((p) => p.dataKey === "yhat")?.value;
            return (
                <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1">
                    <p className="secondaryTitleText text-black">{label}</p>
                    {reel != null && <p className="normalText text-color-button">CA réel : {reel} €</p>}
                    {prevu != null && <p className="normalText text-blue-500">CA prédit : {prevu} €</p>}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col gap-4">

            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <StatCard
                        label="Tendance"
                        value={stats.tendance === "hausse" ? "↑ En hausse" : "↓ En baisse"}
                        colorClass={stats.tendance === "hausse" ? "text-green-600" : "text-red-500"}
                        info="Compare la moyenne de la 1ère moitié vs la 2ème moitié de la période. Si la 2ème est plus haute, les ventes sont en hausse."
                    />
                    <StatCard
                        label="CA moyen récent"
                        value={`${stats.moyRecente} €`}
                        subtitle={`Sur les ${stats.nbJoursRecent} derniers jours`}
                        info={`Moyenne du CA réel sur les ${stats.nbJoursRecent} derniers jours de la période analysée.`}
                    />
                    <StatCard
                        label="Pic de ventes"
                        value={stats.meilleurJour?.date}
                        colorClass="text-green-600"
                        info={`Jour avec le CA le plus élevé : ${stats.meilleurJour?.y} €. Identifie les pics d'activité.`}
                    />
                    <StatCard
                        label="CA estimé / jour"
                        value={`${stats.moyYhat} €`}
                        colorClass="text-blue-500"
                        info="CA moyen estimé par Prophet sur toute la période. Représente ce que le modèle considère comme un CA normal par jour."
                    />
                    <StatCard
                        label="Jours sans ventes"
                        value={stats.joursSansVentes}
                        colorClass={stats.joursSansVentes > 5 ? "text-red-500" : "text-green-600"}
                        info="Nombre de jours où le CA réel est nul ou absent. Un nombre élevé peut indiquer des problèmes de stock ou d'activité."
                    />
                </div>
            )}

            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10 }}
                        interval="preserveStartEnd"
                        label={{ value: "Date", position: "insideBottom", offset: -15, fontSize: 12, fill: "#6b7280" }}
                    />
                    <YAxis
                        yAxisId="left"
                        label={{ value: "CA réel (€)", angle: -90, position: "insideLeft", offset: 10, fontSize: 12, fill: "#b86748" }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{ value: "CA prédit (€)", angle: 90, position: "insideRight", offset: 10, fontSize: 12, fill: "#2563eb" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="y"
                        stroke="#b86748"
                        strokeWidth={2}
                        dot={false}
                        name="CA réel (€)"
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="yhat"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="5 5"
                        name="CA prédit (€)"
                    />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
};

export default ForecastChart;