import { useState } from "react";
import { Link } from "react-router-dom";
import CompoundCalculatorForm from "../components/CompoundCalculatorForm";

const tabs = [
  { id: "montante", label: "Montante" },
  { id: "capital", label: "Capital" },
  { id: "taxa", label: "Taxa (i)" },
  { id: "tempo", label: "Tempo (t)" },
  { id: "nominal", label: "Nominal" },
];

export default function JurosCompostos() {
  const [activeTab, setActiveTab] = useState("montante");

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="mx-auto max-w-lg">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Juros Simples
            </Link>

            <Link
              to="/series-descontos"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
            >
              Séries e Descontos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Calculadora Financeira
            </h1>
            <p className="text-lg text-gray-600">Juros Compostos</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1 rounded-xl bg-gray-200 p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-1 py-2.5 text-xs font-medium transition-all ${
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
          <CompoundCalculatorForm key={activeTab} type={activeTab} />
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            O que são Juros Compostos?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Juros compostos é um regime de capitalização onde os juros de cada período são
            incorporados ao{" "}
            <strong className="text-gray-900">capital para o período seguinte</strong>, gerando
            juros sobre juros. A fórmula fundamental é{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-gray-900">
              M = C × (1 + i)^t
            </code>
            , onde <strong className="text-gray-900">M</strong> é o montante final,{" "}
            <strong className="text-gray-900">C</strong> é o capital,{" "}
            <strong className="text-gray-900">i</strong> é a taxa e{" "}
            <strong className="text-gray-900">t</strong> é o tempo.
          </p>
        </div>
      </div>
    </div>
  );
}
