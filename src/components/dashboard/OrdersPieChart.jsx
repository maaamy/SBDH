import {
    PieChart, Pie, Cell, Legend,
    Tooltip,ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#f43f5e", 
    "#6366f1", 
    "#f59e0b", 
    "#A6754C", 
    "#10b981", 
]

const OrdersPieChart = ({ ordersStatus }) => {
    const aggregated = ordersStatus.reduce((acc, item) => {
        const statut = item.statut_commande;
        const total = item.nb_commandes ?? 0;
        acc[statut] = (acc[statut] || 0) + total;
        return acc;
    }, {});

    const data = Object.entries(aggregated).map(([name, value]) => ({
        name,
        value,
    }));

    if (!data.length) return <p className="normalText text-grey">Aucune donnée.</p>;

    return (
        <ResponsiveContainer width="100%" height={320}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default OrdersPieChart;