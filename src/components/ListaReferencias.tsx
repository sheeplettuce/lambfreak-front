"use client";

import { useEffect, useState } from "react";
import { useProgram, ReferenciaConPDA } from "@/hooks/useProgram";
import { CardReferencia } from "./CardReferencia";
import { useWallet } from "@solana/wallet-adapter-react";

export function ListaReferencias() {
  const { listarReferencias } = useProgram();
  const { publicKey } = useWallet();
  const [refs, setRefs] = useState<ReferenciaConPDA[]>([]);
  const [loading, setLoading] = useState(false);

  async function cargar() {
    if (!publicKey) return;
    setLoading(true);
    try {
      const data = await listarReferencias();
      // Orden: libro asc, capitulo asc, versiculo asc
      data.sort((a, b) => {
        if (a.cuenta.libro !== b.cuenta.libro) return a.cuenta.libro.localeCompare(b.cuenta.libro);
        if (a.cuenta.capitulo !== b.cuenta.capitulo) return a.cuenta.capitulo - b.cuenta.capitulo;
        return a.cuenta.versiculo - b.cuenta.versiculo;
      });
      setRefs(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargar();
  }, [publicKey]);

  if (!publicKey) return null;

  return (
    <div className="lista-section">
      <div className="lista-header">
        <h2 className="form-title">Mis referencias</h2>
        <button className="btn-ghost" onClick={cargar} disabled={loading}>
          {loading ? "Cargando..." : "Actualizar"}
        </button>
      </div>

      {refs.length === 0 && !loading && (
        <p className="empty-msg">No tienes referencias guardadas aún.</p>
      )}

      <div className="lista-grid">
        {refs.map((r) => (
          <CardReferencia key={r.pda.toBase58()} item={r} onRefresh={cargar} />
        ))}
      </div>
    </div>
  );
}
