import {
    ResponsiveContainer, BarChart, Bar, CartesianGrid,
    XAxis, YAxis, Tooltip, LabelList,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        return (
            <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1">
                <p className="secondaryTitleText text-product">{label}</p>
                <p className="normalText text-black">Ventes : <span className="font-bold">{item.ventes}</span></p>
                <p className="normalText text-color-button">CA : <span className="font-bold">{item.ca?.toLocaleString()} €</span></p>
            </div>
        );
    }
    return null;
};

const TopProductsChart = ({ topProducts }) => {
    const data = [...topProducts]
        .sort((a, b) => b.quantite_vendue - a.quantite_vendue)
        .slice(0, 5)
        .map((item) => ({
            name: item.produit,
            ventes: item.quantite_vendue,
            ca: item.chiffre_affaires ?? 0,
        }));

    if (!data.length) return <p className="normalText text-grey">Aucune donnée.</p>;

    return (
        <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    label={{ value: "Produits", position: "insideBottom", offset: -5, fontSize: 12, fill: "#b86748" }}
                />
                <YAxis
                    label={{ value: "Quantité vendue", angle: -90, position: "insideLeft", offset: 10, fontSize: 12, fill: "#b86748" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="ventes" fill="#8A6A5A" radius={[6, 6, 0, 0]}>
                    <LabelList
                        dataKey="ventes"
                        position="top"
                        style={{ fontSize: 12, fill: "#6b7280", fontWeight: "bold" }}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default TopProductsChart;