import { useState } from "react";

const configs = {
  montante: {
    title: "Calcular Montante (M)",
    formula: "M = C × (1 + i)^t",
    explanation:
      "O montante é o valor final obtido após aplicar os juros compostos sobre o capital inicial pelo período determinado.",
    fields: [
      { label: "Capital (C)", placeholder: "Ex: 10000", suffix: "R$" },
      { label: "Taxa de Juros (i)", placeholder: "Ex: 3", suffix: "%" },
      { label: "Tempo (t)", placeholder: "Ex: 11", suffix: "meses" },
    ],
    calculate: (c, i, t) => c * Math.pow(1 + i / 100, t),
    resultLabel: "Montante (M)",
    resultSuffix: "R$",
    example: ["10000", "3", "11"],
  },

  capital: {
    title: "Calcular Capital (C)",
    formula: "C = M ÷ (1 + i)^t",
    explanation:
      "O capital inicial é o valor presente necessário para atingir o montante desejado, dado uma taxa e um período.",
    fields: [
      { label: "Montante (M)", placeholder: "Ex: 20500", suffix: "R$" },
      { label: "Taxa de Juros (i)", placeholder: "Ex: 12", suffix: "%" },
      { label: "Tempo (t)", placeholder: "Ex: 4", suffix: "anos" },
    ],
    calculate: (m, i, t) => m / Math.pow(1 + i / 100, t),
    resultLabel: "Capital (C)",
    resultSuffix: "R$",
    example: ["20500", "12", "4"],
  },

  taxa: {
    title: "Calcular Taxa (i)",
    formula: "i = ((M ÷ C)^(1/t)) − 1",
    explanation:
      "A taxa de juros é obtida a partir do montante, do capital e do tempo de aplicação.",
    fields: [
      { label: "Montante (M)", placeholder: "Ex: 15500", suffix: "R$" },
      { label: "Capital (C)", placeholder: "Ex: 10500", suffix: "R$" },
      { label: "Tempo (t)", placeholder: "Ex: 10", suffix: "meses" },
    ],
    calculate: (m, c, t) => (Math.pow(m / c, 1 / t) - 1) * 100,
    resultLabel: "Taxa (i)",
    resultSuffix: "%",
    example: ["15500", "10500", "10"],
  },

  tempo: {
    title: "Calcular Tempo (t)",
    formula: "t = log(M ÷ C) ÷ log(1 + i)",
    explanation:
      "O tempo necessário para que o capital inicial se transforme no montante desejado à taxa informada.",
    fields: [
      { label: "Montante (M)", placeholder: "Ex: 50000", suffix: "R$" },
      { label: "Capital (C)", placeholder: "Ex: 30000", suffix: "R$" },
      { label: "Taxa de Juros (i)", placeholder: "Ex: 3.5", suffix: "%" },
    ],
    calculate: (m, c, i) => Math.log(m / c) / Math.log(1 + i / 100),
    resultLabel: "Tempo (t)",
    resultSuffix: "meses",
    example: ["50000", "30000", "3.5"],
  },

  nominal: {
    title: "Taxa Nominal e Taxa Efetiva",
    formula: "ik = i ÷ k  |  I = (1 + ik)^t − 1",
    explanation:
      "Converte uma taxa nominal em taxa por subperíodo (ik) e em taxa efetiva (I) para o período total.",
    fields: [
      { label: "Taxa Nominal (i)", placeholder: "Ex: 24", suffix: "%" },
      { label: "Número de Subperíodos (k)", placeholder: "Ex: 6", suffix: "subperíodos" },
      { label: "Períodos (t)", placeholder: "Ex: 6", suffix: "períodos" },
    ],
    calculateDual: (i, k, t) => {
      const ik = (i / 100) / k;
      const iEffective = (Math.pow(1 + ik, t) - 1) * 100;
      return { ik: ik * 100, iEffective };
    },
    example: ["24", "6", "6"],
  },
};

export default function CompoundCalculatorForm({ type }) {
  const config = configs[type];
  const isDual = !!config.calculateDual;

  const [values, setValues] = useState(["", "", ""]);
  const [errors, setErrors] = useState(["", "", ""]);
  const [result, setResult] = useState(null);
  const [dualResult, setDualResult] = useState(null);

  function clearResults() {
    setResult(null);
    setDualResult(null);
  }

  function handleChange(index, value) {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    const newErrors = [...errors];
    if (value !== "" && Number(value) < 0) {
      newErrors[index] = "Valor não pode ser negativo";
    } else {
      newErrors[index] = "";
    }
    setErrors(newErrors);
    clearResults();
  }

  function handleCalculate() {
    const newErrors = values.map((value) => {
      if (value.trim() === "") return "Campo obrigatório";
      if (Number(value) < 0) return "Valor não pode ser negativo";
      return "";
    });

    if (type === "taxa" || type === "tempo") {
      const [mVal, cVal] = values.map(Number);
      if (newErrors[1] === "" && cVal <= 0) {
        newErrors[1] = "Capital deve ser maior que zero";
      } else if (newErrors[0] === "" && newErrors[1] === "" && mVal <= cVal) {
        newErrors[0] = "Montante deve ser maior que o Capital";
      }
    }

    if (type === "taxa") {
      const tVal = Number(values[2]);
      if (newErrors[2] === "" && tVal <= 0) {
        newErrors[2] = "Tempo deve ser maior que zero";
      }
    }

    if (type === "tempo") {
      const iVal = Number(values[2]);
      if (newErrors[2] === "" && iVal <= 0) {
        newErrors[2] = "Taxa deve ser maior que zero";
      }
    }

    if (type === "nominal") {
      if (newErrors[1] === "" && Number(values[1]) < 1) {
        newErrors[1] = "Subperíodos deve ser pelo menos 1";
      }
      if (newErrors[2] === "" && Number(values[2]) < 1) {
        newErrors[2] = "Períodos deve ser pelo menos 1";
      }
    }

    setErrors(newErrors);
    if (newErrors.some((e) => e !== "")) return;

    const numbers = values.map(Number);

    if (isDual) {
      setDualResult(config.calculateDual(...numbers));
    } else {
      setResult(config.calculate(...numbers));
    }
  }

  function handleClear() {
    setValues(["", "", ""]);
    setErrors(["", "", ""]);
    clearResults();
  }

  function handleExample() {
    setValues(config.example);
    setErrors(["", "", ""]);
    const numbers = config.example.map(Number);
    if (isDual) {
      setDualResult(config.calculateDual(...numbers));
    } else {
      setResult(config.calculate(...numbers));
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-gray-100 p-4 text-center">
        <p className="text-sm font-medium text-gray-600 mb-1">Fórmula utilizada</p>
        <p className="text-xl font-mono font-bold text-gray-900">{config.formula}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">{config.title}</h2>
        <p className="text-sm text-gray-600">{config.explanation}</p>
      </div>

      <div className="space-y-4">
        {config.fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              {field.label}
            </label>

            <div className="relative">
              <input
                type="number"
                min="0"
                step="any"
                value={values[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {field.suffix && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  {field.suffix}
                </span>
              )}
            </div>

            {errors[index] && (
              <p className="mt-1 text-sm text-red-600">{errors[index]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCalculate}
          className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Calcular
        </button>

        <button
          onClick={handleClear}
          className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 hover:bg-gray-50"
        >
          Limpar
        </button>

        <button
          onClick={handleExample}
          className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-900 hover:bg-gray-300"
        >
          Exemplo
        </button>
      </div>

      {result !== null && (
        <div className="rounded-lg bg-green-600 p-6 text-center">
          <p className="text-sm font-medium text-green-100 mb-1">
            {config.resultLabel}
          </p>
          <p className="text-3xl font-bold text-white">
            {config.resultSuffix === "R$" && "R$ "}
            {result.toFixed(2)}
            {config.resultSuffix && config.resultSuffix !== "R$"
              ? ` ${config.resultSuffix}`
              : ""}
          </p>
          <p className="mt-3 text-sm text-green-100">{config.explanation}</p>
        </div>
      )}

      {dualResult !== null && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-600 p-4 text-center">
              <p className="text-xs font-medium text-green-100 mb-1">Taxa por Subperíodo (ik)</p>
              <p className="text-2xl font-bold text-white">{dualResult.ik.toFixed(2)} %</p>
            </div>
            <div className="rounded-lg bg-green-700 p-4 text-center">
              <p className="text-xs font-medium text-green-100 mb-1">Taxa Efetiva (I)</p>
              <p className="text-2xl font-bold text-white">{dualResult.iEffective.toFixed(2)} %</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">{config.explanation}</p>
        </div>
      )}
    </div>
  );
}
