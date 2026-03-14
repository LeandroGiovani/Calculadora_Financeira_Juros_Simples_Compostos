import { useState } from "react";

const configs = {
  interest: {
    title: "Calcular Juros (J)",
    formula: "J = (C × I × T) ÷ 100",
    explanation:
      "Os juros simples são calculados multiplicando o capital pela taxa e pelo tempo, dividindo por 100.",
    fields: [
      { label: "Capital (C)", placeholder: "Ex: 10000", suffix: "R$" },
      { label: "Taxa de Juros (I)", placeholder: "Ex: 3", suffix: "%" },
      { label: "Tempo (T)", placeholder: "Ex: 11", suffix: "meses" },
    ],
    calculate: (c, i, t) => (c * i * t) / 100,
    resultLabel: "Juros (J)",
    resultSuffix: "R$",
    example: ["10000", "3", "11"],
  },

  capital: {
    title: "Calcular Capital (C)",
    formula: "C = (J × 100) ÷ (I × T)",
    explanation:
      "O capital é obtido dividindo os juros multiplicados por 100 pelo produto da taxa e do tempo.",
    fields: [
      { label: "Juros (J)", placeholder: "Ex: 1701", suffix: "R$" },
      { label: "Taxa de Juros (I)", placeholder: "Ex: 1.5", suffix: "%" },
      { label: "Tempo (T)", placeholder: "Ex: 36", suffix: "meses" },
    ],
    calculate: (j, i, t) => (j * 100) / (i * t),
    resultLabel: "Capital (C)",
    resultSuffix: "R$",
    example: ["1701", "1.5", "36"],
  },

  rate: {
    title: "Calcular Taxa (I)",
    formula: "I = (J × 100) ÷ (C × T)",
    explanation:
      "A taxa é obtida dividindo os juros multiplicados por 100 pelo produto do capital e do tempo.",
    fields: [
      { label: "Juros (J)", placeholder: "Ex: 2350.10", suffix: "R$" },
      { label: "Capital (C)", placeholder: "Ex: 11750.50", suffix: "R$" },
      { label: "Tempo (T)", placeholder: "Ex: 8.5", suffix: "meses" },
    ],
    calculate: (j, c, t) => (j * 100) / (c * t),
    resultLabel: "Taxa (I)",
    resultSuffix: "%",
    example: ["2350.10", "11750.50", "8.5"],
  },

  time: {
    title: "Calcular Tempo (T)",
    formula: "T = (J × 100) ÷ (C × I)",
    explanation:
      "O tempo é obtido dividindo os juros multiplicados por 100 pelo produto do capital e da taxa.",
    fields: [
      { label: "Juros (J)", placeholder: "Ex: 19575", suffix: "R$" },
      { label: "Capital (C)", placeholder: "Ex: 72500", suffix: "R$" },
      { label: "Taxa de Juros (I)", placeholder: "Ex: 1.5", suffix: "%" },
    ],
    calculate: (j, c, i) => (j * 100) / (c * i),
    resultLabel: "Tempo (T)",
    resultSuffix: "meses",
    example: ["19575", "72500", "1.5"],
  },
};

export default function CalculatorForm({ type }) {
  const config = configs[type];
  const [values, setValues] = useState(["", "", ""]);
  const [errors, setErrors] = useState(["", "", ""]);
  const [result, setResult] = useState(null);

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
    setResult(null);
  }

  function handleCalculate() {
    const newErrors = values.map((value) => {
      if (value.trim() === "") return "Campo obrigatório";
      if (Number(value) < 0) return "Valor não pode ser negativo";
      return "";
    });

    setErrors(newErrors);

    if (newErrors.some((error) => error !== "")) return;

    const numbers = values.map(Number);
    const calcResult = config.calculate(...numbers);
    setResult(calcResult);
  }

  function handleClear() {
    setValues(["", "", ""]);
    setErrors(["", "", ""]);
    setResult(null);
  }

  function handleExample() {
    setValues(config.example);
    setErrors(["", "", ""]);
    const numbers = config.example.map(Number);
    const calcResult = config.calculate(...numbers);
    setResult(calcResult);
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
    </div>
  );
}