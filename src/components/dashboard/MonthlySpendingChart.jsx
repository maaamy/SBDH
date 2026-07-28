import {
    ResponsiveContainer, LineChart,
    Line, CartesianGrid,
    XAxis, YAxis,
    Tooltip, Legend,
} from "recharts";
import { useMemo } from "react";

const MonthlySpendingChart = ({ history }) => {
    const data = useMemo(() => {
        if (!history?.length) return [];
        const map = {};
        history.forEach((h) => {
            const mois = h.date_commande?.slice(0, 7);
            if (!mois) return;
            if (!map[mois]) map[mois] = { mois, montant: 0, commandes: new Set() };
            map[mois].montant += h.montant_commande ?? 0;
            map[mois].commandes.add(h.commande_id);
        });
        return Object.values(map)
            .sort((a, b) => a.mois.localeCompare(b.mois))
            .map((item) => ({
                mois: item.mois,
                montant: parseFloat(item.montant.toFixed(2)),
                commandes: item.commandes.size,
            }));
    }, [history]);

    if (!data.length) return <p className="normalText text-grey">Aucune donnée.</p>;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const moisData = data.find((d) => d.mois === label);
            return (
                <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1">
                    <p className="secondaryTitleText text-black">{label}</p>
                    <p className="normalText text-color-button">Montant : {payload[0].value} €</p>
                    <p className="normalText text-grey">Nb commandes : {moisData?.commandes ?? "-"}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="mois"
                    label={{ value: "Mois", position: "insideBottom", offset: -15, fontSize: 12, fill: "#b86748" }}
                />
                <YAxis
                    label={{ value: "Montant (€)", angle: -90, position: "insideLeft", offset: -5, fontSize: 12, fill: "#b86748" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" />
                <Line
                    type="monotone"
                    dataKey="montant"
                    stroke="#b86748"
                    strokeWidth={2}
                    dot
                    name="Montant (€)"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default MonthlySpendingChart;