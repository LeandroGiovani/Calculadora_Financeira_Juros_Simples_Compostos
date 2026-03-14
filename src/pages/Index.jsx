import { useState } from "react";
import CalculatorForm from "../components/CalculatorForm";

const tabs = [
  { id: "interest", label: "Juros (J)" },
  { id: "capital", label: "Capital (C)" },
  { id: "rate", label: "Taxa (I)" },
  { id: "time", label: "Tempo (T)" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("interest");

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="mx-auto max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Calculadora Financeira
          </h1>
          <p className="text-lg text-gray-600">Juros Simples</p>
        </div>

        <div className="grid grid-cols-4 gap-1 rounded-xl bg-gray-200 p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-2 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <CalculatorForm key={activeTab} type={activeTab} />
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            O que são Juros Simples?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Juros simples é um regime de capitalização onde os juros são
            calculados sempre sobre o{" "}
            <strong className="text-gray-900">capital inicial</strong>. Diferente
            dos juros compostos, não há incidência de juros sobre juros. A fórmula
            fundamental é{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-gray-900">
              J = C × I × T ÷ 100
            </code>
            , onde <strong className="text-gray-900">J</strong> são os juros,{" "}
            <strong className="text-gray-900">C</strong> é o capital,{" "}
            <strong className="text-gray-900">I</strong> é a taxa e{" "}
            <strong className="text-gray-900">T</strong> é o tempo.
          </p>
        </div>
      </div>
    </div>
  );
}