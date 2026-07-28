import {
    ResponsiveContainer, BarChart, Bar, CartesianGrid,
    XAxis, YAxis, Tooltip, Cell, LabelList
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        return (
            <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1">
                <p className="secondaryTitleText text-product">{label}</p>
                <p className="normalText text-black">Stock : <span className="font-bold">{item.stock}</span></p>
                <p className="normalText font-bold" style={{
                    color: item.rupture ? "#f43f5e" : item.stockFaible ? "#ca8a04" : "#10b981"
                }}>
                    {item.rupture ? "Rupture" : item.stockFaible ? "Stock faible" : "En stock"}
                </p>
            </div>
        );
    }
    return null;
};

const LEGEND = [
    { color: "#10b981", label: "En stock" },
    { color: "#ca8a04", label: "Stock faible" },
    { color: "#f43f5e", label: "Rupture" },
];

const InventoryChart = ({ inventory }) => {
    const data = inventory
        .filter((item) => item.stock_total !== null)
        .sort((a, b) => a.stock_total - b.stock_total)
        .map((item) => ({
            name: item.produit,
            stock: item.stock_total,
            rupture: item.rupture,
            stockFaible: item.stock_faible,
        }));

    if (!data.length) return <p className="normalText text-grey">Aucune donnée.</p>;

    return (
        <div className="flex gap-4">
            <div className="flex-1">
                <ResponsiveContainer width="100%" height={data.length * 45 + 40}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis
                            type="number"
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            label={{ value: "Stock", position: "insideBottom", offset: -5, fontSize: 12, fill: "#b86748" }}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={90}
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="stock" radius={[0, 6, 6, 0]}>
                            <LabelList
                                dataKey="stock"
                                position="right"
                                style={{ fontSize: 12, fill: "#6b7280", fontWeight: "bold" }}
                            />
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        entry.rupture
                                            ? "#f43f5e"
                                            : entry.stockFaible
                                            ? "#ca8a04"
                                            : "#10b981"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-2 justify-center shrink-0">
                {LEGEND.map((l) => (
                    <div key={l.label} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                        <p className="normalText text-grey">{l.label}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default InventoryChart;