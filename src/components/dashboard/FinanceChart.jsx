import {
    ResponsiveContainer, ComposedChart,
    Bar, Line, CartesianGrid,
    XAxis, YAxis,
    Tooltip, Legend,
} from "recharts";

const FinanceChart = ({ finance }) => {
    const data = finance.map((item) => ({
        mois: item.libelle || item.periode || item.mois,
        ca: item.chiffre_affaires ?? item.total ?? 0,
        commandes: item.nb_commandes ?? 0,
    }));

    if (!data.length) return <p className="normalText text-grey">Aucune donnée financière.</p>;

    return (
        <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="ca" fill="#D8C2A4" name="CA (€)" />
                <Line yAxisId="right" type="monotone" dataKey="commandes" stroke="#b86748" strokeWidth={2} name="Commandes" />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default FinanceChart;