import {
    ResponsiveContainer, LineChart, Tooltip,
    Line, CartesianGrid, XAxis, YAxis, Legend
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1">
                <p className="secondaryTitleText text-black">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} className="normalText" style={{ color: p.color }}>
                        {p.name} : <span className="font-bold">{p.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const SalesChart = ({ dailySales }) => {
    const data = dailySales.map((item) => ({
        date: item.ds,
        chiffreAffaires: item.y,
        commandes: item.nb_commandes,
        quantite: item.quantite_vendue,
    }));

    if (!data.length) return <p className="normalText text-grey">Aucune donnée.</p>;

    return (
        <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    label={{ value: "Date", position: "insideBottom", offset: -10, fontSize: 12, fill: "#b86748" }}
                />
                <YAxis
                    label={{ value: "CA (€)", angle: -90, position: "insideLeft", offset: 10, fontSize: 12, fill: "#b86748" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" />
                <Line
                    type="monotone"
                    dataKey="chiffreAffaires"
                    stroke="#b86748"
                    strokeWidth={2}
                    dot={false}
                    name="CA (€)"
                />
                <Line
                    type="monotone"
                    dataKey="commandes"
                    stroke="#10b981"
                    strokeWidth={0}
                    dot={false}
                    name="Commandes"
                    legendType="none"
                />
                <Line
                    type="monotone"
                    dataKey="quantite"
                    stroke="#6366f1"
                    strokeWidth={0}
                    dot={false}
                    name="Quantité vendue"
                    legendType="none"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SalesChart;