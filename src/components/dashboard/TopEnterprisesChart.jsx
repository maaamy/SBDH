import {
    ResponsiveContainer, BarChart, Bar, CartesianGrid,
    XAxis, YAxis, Tooltip, Legend, LabelList
} from "recharts";
import { useMemo } from "react";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1">
                <p className="secondaryTitleText text-product">{label}</p>
                <p className="normalText text-color-button">
                    Montant : <span className="font-bold">{payload[0].value?.toLocaleString()} €</span>
                </p>
            </div>
        );
    }
    return null;
};

const TopEnterprisesChart = ({ history }) => {
    const data = useMemo(() => {
        if (!history?.length) return [];
        const map = {};
        history.forEach((h) => {
            if (!h.entreprise) return;
            if (!map[h.entreprise]) map[h.entreprise] = { name: h.entreprise, montant: 0 };
            map[h.entreprise].montant += h.montant_commande ?? 0;
        });
        return Object.values(map)
            .sort((a, b) => b.montant - a.montant)
            .slice(0, 5)
            .map((item) => ({ ...item, montant: parseFloat(item.montant.toFixed(2)) }));
    }, [history]);

    if (!data.length) return <p className="normalText text-grey">Aucune donnée.</p>;

    return (
        <ResponsiveContainer width="100%" height={240}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 10, right: 60, left: 10, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                    type="number"
                    label={{ value: "Montant dépensé (€)", position: "insideBottom", offset: -10, fontSize: 12, fill: "#b86748" }}
                />
                <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    label={{ value: "Entreprises", angle: -90, position: "insideLeft", offset: -5, fontSize: 12, fill: "#b86748" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" />
                <Bar dataKey="montant" fill="#b86748" name="Montant (€)" radius={[0, 6, 6, 0]}>
                    <LabelList
                        dataKey="montant"
                        position="right"
                        style={{ fontSize: 12, fill: "#6b7280", fontWeight: "bold" }}
                        formatter={(v) => `${v?.toLocaleString()} €`}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default TopEnterprisesChart;