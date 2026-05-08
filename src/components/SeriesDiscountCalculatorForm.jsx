import { useState } from "react";

const configs = {
  antecipada: {
    title: "Série Uniforme Antecipada",
    formula: "P = V × [i(1 + i)^n] ÷ {[(1 + i)^n − 1] × (1 + i)}",
    explanation:
      "Calcula o valor de parcelas iguais quando a primeira parcela é paga no ato da compra.",
    fields: [
      { label: "Valor sem Juros (V)", placeholder: "Ex: 1200", suffix: "R$" },
      { label: "Taxa de Juros (i)", placeholder: "Ex: 10", suffix: "%" },
      { label: "Número de Parcelas (n)", placeholder: "Ex: 6", suffix: "parcelas" },
    ],
    calculate: (v, i, n) => {
      const rate = i / 100;
      if (rate === 0) return v / n;
      const factor = Math.pow(1 + rate, n);
      return (v * rate * factor) / ((factor - 1) * (1 + rate));
    },
    resultLabel: "Valor da Parcela (P)",
    resultSuffix: "R$",
    example: ["1200", "10", "6"],
  },

  postecipada: {
    title: "Série Uniforme Postecipada",
    formula: "P = V × [i(1 + i)^n] ÷ [(1 + i)^n − 1]",
    explanation:
      "Calcula o valor de parcelas iguais quando a primeira parcela é paga um período após a compra.",
    fields: [
      { label: "Valor sem Juros (V)", placeholder: "Ex: 1000", suffix: "R$" },
      { label: "Taxa de Juros (i)", placeholder: "Ex: 6", suffix: "%" },
      { label: "Número de Parcelas (n)", placeholder: "Ex: 3", suffix: "parcelas" },
    ],
    calculate: (v, i, n) => {
      const rate = i / 100;
      if (rate === 0) return v / n;
      const factor = Math.pow(1 + rate, n);
      return (v * rate * factor) / (factor - 1);
    },
    resultLabel: "Valor da Parcela (P)",
    resultSuffix: "R$",
    example: ["1000", "6", "3"],
  },

  desconto: {
    title: "Calcular Desconto Racional (D)",
    formula: "D = (V × i × n) ÷ (1 + i × n)",
    explanation:
      "Calcula o desconto racional simples a partir do valor nominal, da taxa e do período de antecipação.",
    fields: [
      { label: "Valor Nominal (V)", placeholder: "Ex: 29800", suffix: "R$" },
      { label: "Taxa de Juros (i)", placeholder: "Ex: 1.5", suffix: "%" },
      { label: "Período de Antecipação (n)", placeholder: "Ex: 9", suffix: "meses" },
    ],
    calculate: (v, i, n) => {
      const rate = i / 100;
      return (v * rate * n) / (1 + rate * n);
    },
    resultLabel: "Desconto Racional (D)",
    resultSuffix: "R$",
    example: ["29800", "1.5", "9"],
  },

  valorNominal: {
    title: "Calcular Valor Nominal (V)",
    formula: "V = [D × (1 + i × n)] ÷ (i × n)",
    explanation:
      "Calcula o valor nominal de uma aplicação a partir do desconto racional, da taxa e do período.",
    fields: [
      { label: "Desconto Racional (D)", placeholder: "Ex: 900", suffix: "R$" },
      { label: "Taxa de Juros (i)", placeholder: "Ex: 2", suffix: "%" },
      { label: "Período de Antecipação (n)", placeholder: "Ex: 10", suffix: "meses" },
    ],
    calculate: (d, i, n) => {
      const rate = i / 100;
      return (d * (1 + rate * n)) / (rate * n);
    },
    resultLabel: "Valor Nominal (V)",
    resultSuffix: "R$",
    example: ["900", "2", "10"],
  },

  taxa: {
    title: "Calcular Taxa de Juros (i)",
    formula: "i = D ÷ [n × (V − D)]",
    explanation:
      "Calcula a taxa de juros do desconto racional simples a partir do desconto, do valor nominal e do período.",
    fields: [
      { label: "Desconto Racional (D)", placeholder: "Ex: 1000", suffix: "R$" },
      { label: "Valor Nominal (V)", placeholder: "Ex: 4500", suffix: "R$" },
      { label: "Período de Antecipação (n)", placeholder: "Ex: 6", suffix: "meses" },
    ],
    calculate: (d, v, n) => (d / (n * (v - d))) * 100,
    resultLabel: "Taxa de Juros (i)",
    resultSuffix: "%",
    example: ["1000", "4500", "6"],
  },

  periodo: {
    title: "Calcular Período de Antecipação (n)",
    formula: "n = D ÷ [i × (V − D)]",
    explanation:
      "Calcula o período de antecipação de uma aplicação com desconto racional simples.",
    fields: [
      { label: "Desconto Racional (D)", placeholder: "Ex: 2500", suffix: "R$" },
      { label: "Valor Nominal (V)", placeholder: "Ex: 6500", suffix: "R$" },
      { label: "Taxa de Juros (i)", placeholder: "Ex: 2.5", suffix: "%" },
    ],
    calculate: (d, v, i) => {
      const rate = i / 100;
      return d / (rate * (v - d));
    },
    resultLabel: "Período de Antecipação (n)",
    resultSuffix: "meses",
    example: ["2500", "6500", "2.5"],
  },
};

export default function SeriesDiscountCalculatorForm({ type }) {
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

  function validate() {
    const newErrors = values.map((value) => {
      if (value.trim() === "") return "Campo obrigatório";
      if (Number(value) < 0) return "Valor não pode ser negativo";
      return "";
    });

    const numbers = values.map(Number);

    if (type === "antecipada" || type === "postecipada") {
      if (newErrors[0] === "" && numbers[0] <= 0) {
        newErrors[0] = "Valor deve ser maior que zero";
      }
      if (newErrors[2] === "" && numbers[2] <= 0) {
        newErrors[2] = "Número de parcelas deve ser maior que zero";
      }
    }

    if (type === "desconto") {
      if (newErrors[0] === "" && numbers[0] <= 0) {
        newErrors[0] = "Valor nominal deve ser maior que zero";
      }
      if (newErrors[2] === "" && numbers[2] <= 0) {
        newErrors[2] = "Período deve ser maior que zero";
      }
    }

    if (type === "valorNominal") {
      if (newErrors[1] === "" && numbers[1] <= 0) {
        newErrors[1] = "Taxa deve ser maior que zero";
      }
      if (newErrors[2] === "" && numbers[2] <= 0) {
        newErrors[2] = "Período deve ser maior que zero";
      }
    }

    if (type === "taxa") {
      if (newErrors[2] === "" && numbers[2] <= 0) {
        newErrors[2] = "Período deve ser maior que zero";
      }
      if (newErrors[0] === "" && newErrors[1] === "" && numbers[1] <= numbers[0]) {
        newErrors[1] = "Valor nominal deve ser maior que o desconto";
      }
    }

    if (type === "periodo") {
      if (newErrors[2] === "" && numbers[2] <= 0) {
        newErrors[2] = "Taxa deve ser maior que zero";
      }
      if (newErrors[0] === "" && newErrors[1] === "" && numbers[1] <= numbers[0]) {
        newErrors[1] = "Valor nominal deve ser maior que o desconto";
      }
    }

    return newErrors;
  }

  function handleCalculate() {
    const newErrors = validate();
    setErrors(newErrors);

    if (newErrors.some((error) => error !== "")) return;

    const numbers = values.map(Number);
    setResult(config.calculate(...numbers));
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
    setResult(config.calculate(...numbers));
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-gray-100 p-4 text-center">
        <p className="mb-1 text-sm font-medium text-gray-600">Fórmula utilizada</p>
        <p className="text-lg font-mono font-bold text-gray-900">{config.formula}</p>
      </div>

      <div>
        <h2 className="mb-1 text-lg font-semibold text-gray-900">{config.title}</h2>
        <p className="text-sm text-gray-600">{config.explanation}</p>
      </div>

      <div className="space-y-4">
        {config.fields.map((field, index) => (
          <div key={field.label}>
            <label className="mb-1.5 block text-sm font-medium text-gray-900">
              {field.label}
            </label>

            <div className="relative">
              <input
                type="number"
                min="0"
                step="any"
                value={values[index]}
                onChange={(event) => handleChange(index, event.target.value)}
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
          <p className="mb-1 text-sm font-medium text-green-100">
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
