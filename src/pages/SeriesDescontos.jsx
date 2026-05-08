import { useState } from "react";
import { Link } from "react-router-dom";
import SeriesDiscountCalculatorForm from "../components/SeriesDiscountCalculatorForm";

const tabs = [
  { id: "antecipada", label: "Antecipada" },
  { id: "postecipada", label: "Postecipada" },
  { id: "desconto", label: "Desconto" },
  { id: "valorNominal", label: "Valor Nominal" },
  { id: "taxa", label: "Taxa" },
  { id: "periodo", label: "Período" },
];

export default function SeriesDescontos() {
  const [activeTab, setActiveTab] = useState("antecipada");

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-lg">
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center justify-start gap-x-4 gap-y-2">
            <Link
              to="/juros-compostos"
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
              Juros Compostos
            </Link>
          </div>

          <div className="text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Calculadora Financeira
            </h1>
            <p className="text-lg text-gray-600">
              Séries Uniformes e Desconto Racional Simples
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-gray-200 p-1 sm:grid-cols-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-2 py-2.5 text-xs font-medium transition-all ${
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
          <SeriesDiscountCalculatorForm key={activeTab} type={activeTab} />
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            O que são Séries Uniformes e Descontos?
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Séries uniformes calculam prestações iguais ao longo do tempo,
            podendo ser antecipadas ou postecipadas. O desconto racional
            simples calcula a redução de um valor nominal quando ele é quitado
            antes do vencimento, usando juros simples.
          </p>
        </div>
      </div>
    </div>
  );
}
