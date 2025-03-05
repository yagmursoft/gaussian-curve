import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardBody, Input, Button } from "@heroui/react";
import { useState } from "react";

const gaussian = (x, mean, stdDev) => {
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2));
};

const generateGaussianData = (mean, stdDev, points = 100) => {
  const data = [];
  for (let i = -3 * stdDev; i <= 3 * stdDev; i += (6 * stdDev) / points) {
    data.push({ x: i.toFixed(2), y: gaussian(i, mean, stdDev).toFixed(4) });
  }
  return data;
};

const Home = () => {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const [data, setData] = useState(null);

  const handleGenerate = () => {
    setData(generateGaussianData(parseFloat(mean), parseFloat(stdDev)));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl bg-white p-6">
        <CardBody>
          <h2 className="text-xl pr text-center mb-4">Normal Dağılım Grafiği</h2>
          <div className="flex flex-col gap-4 mb-4">
            <span className="mon">Ortalama</span>
            <Input type="number" placeholder="Ortalama (Mean)" value={mean} onChange={(e) => setMean(e.target.value)} />
            <span className="mon">Standart Sapma</span>
            <Input type="number" placeholder="Standart Sapma (Std Dev)" value={stdDev} onChange={(e) => setStdDev(e.target.value)} />
            <Button onClick={handleGenerate} className="bg-blue-500 text-white">Grafiği Göster</Button>
          </div>
          {data && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" label={{ value: "Değer", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Olasılık Yoğunluğu", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#6366F1" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
