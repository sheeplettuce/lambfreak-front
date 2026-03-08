"use client";

import { useState } from "react";
import { ReferenciaConPDA } from "@/hooks/useProgram";
import { useProgram } from "@/hooks/useProgram";

type Props = {
  item: ReferenciaConPDA;
  onRefresh: () => void;
};

export function CardReferencia({ item, onRefresh }: Props) {
  const { actualizarNota, eliminarReferencia } = useProgram();
  const { cuenta } = item;

  const [editando, setEditando] = useState(false);
  const [nuevaNota, setNuevaNota] = useState(cuenta.nota);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleActualizar() {
    setError("");
    try {
      setLoading(true);
      await actualizarNota(cuenta.libro, cuenta.capitulo, cuenta.versiculo, nuevaNota);
      setEditando(false);
      onRefresh();
    } catch (e: any) {
      setError(e?.message ?? "Error al actualizar");
    } finally {
      setLoading(false);
    }
  }

  async function handleEliminar() {
    if (!confirm("¿Eliminar esta referencia?")) return;
    setError("");
    try {
      setLoading(true);
      await eliminarReferencia(cuenta.libro, cuenta.capitulo, cuenta.versiculo);
      onRefresh();
    } catch (e: any) {
      setError(e?.message ?? "Error al eliminar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ref-card">
      <div className="ref-header">
        <span className="ref-titulo">
          {cuenta.libro} {cuenta.capitulo}:{cuenta.versiculo}
        </span>
        <div className="ref-actions">
          <button
            className="btn-ghost"
            onClick={() => { setEditando(!editando); setNuevaNota(cuenta.nota); }}
            disabled={loading}
          >
            {editando ? "Cancelar" : "Editar"}
          </button>
          <button className="btn-ghost btn-danger" onClick={handleEliminar} disabled={loading}>
            Eliminar
          </button>
        </div>
      </div>

      {editando ? (
        <div className="edit-area">
          <textarea
            className="input textarea"
            value={nuevaNota}
            maxLength={200}
            onChange={(e) => setNuevaNota(e.target.value)}
          />
          <div className="form-footer">
            <span className="char-count">{nuevaNota.length}/200</span>
            {error && <span className="error-msg">{error}</span>}
            <button className="btn" onClick={handleActualizar} disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      ) : (
        <p className="ref-nota">{cuenta.nota}</p>
      )}
    </div>
  );
}
