"use client";

import { useState } from "react";
import { useProgram } from "@/hooks/useProgram";

type Props = {
  onSuccess: () => void;
};

export function FormCrear({ onSuccess }: Props) {
  const { crearReferencia } = useProgram();
  const [libro, setLibro] = useState("");
  const [capitulo, setCapitulo] = useState("");
  const [versiculo, setVersiculo] = useState("");
  const [nota, setNota] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    if (!libro || !capitulo || !versiculo || !nota) {
      setError("Todos los campos son requeridos");
      return;
    }
    try {
      setLoading(true);
      await crearReferencia(libro.trim().toLowerCase(), Number(capitulo), Number(versiculo), nota.trim());
      setLibro(""); setCapitulo(""); setVersiculo(""); setNota("");
      onSuccess();
    } catch (e: any) {
      setError(e?.message ?? "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Nueva referencia</h2>
      <div className="form-row">
        <input
          className="input"
          placeholder="Libro (ej. juan)"
          value={libro}
          onChange={(e) => setLibro(e.target.value)}
          maxLength={32}
        />
        <input
          className="input input-sm"
          placeholder="Cap."
          type="number"
          min={1}
          value={capitulo}
          onChange={(e) => setCapitulo(e.target.value)}
        />
        <input
          className="input input-sm"
          placeholder="Vers."
          type="number"
          min={1}
          value={versiculo}
          onChange={(e) => setVersiculo(e.target.value)}
        />
      </div>
      <textarea
        className="input textarea"
        placeholder="Nota personal (máx. 200 caracteres)"
        value={nota}
        maxLength={200}
        onChange={(e) => setNota(e.target.value)}
      />
      <div className="form-footer">
        <span className="char-count">{nota.length}/200</span>
        {error && <span className="error-msg">{error}</span>}
        <button className="btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </div>
  );
}
