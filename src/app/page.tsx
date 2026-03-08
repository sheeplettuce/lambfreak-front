"use client";

import dynamic from "next/dynamic";
const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((m) => ({ default: m.WalletMultiButton })),
  { ssr: false }
);
import { useWallet } from "@solana/wallet-adapter-react";
import { FormCrear } from "@/components/FormCrear";
import { ListaReferencias } from "@/components/ListaReferencias";
import { useRef } from "react";

export default function Home() {
  const { publicKey } = useWallet();
  const listaRef = useRef<{ cargar: () => void }>(null);

  return (
    <main className="main">
      <header className="header">
        <div className="header-left">
          <span className="logo">✦ lambfreak</span>
          <span className="subtitle">referencias bíblicas on-chain, locos por Cristo en la red.</span>
        </div>
        <WalletMultiButton />
      </header>

      <div className="content">
        {!publicKey ? (
          <div className="hero">
            <h1 className="hero-title">Guarda lo que resuena, mantén lo importante.</h1>
            <p className="hero-desc">
              Conecta tu wallet para guardar referencias bíblicas<br />
              de forma permanente en Solana devnet.
            </p>
          </div>
        ) : (
          <>
            <FormCrear onSuccess={() => window.dispatchEvent(new Event("refresh-refs"))} />
            <ListaReferencias />
          </>
        )}
      </div>

      <footer className="footer">
        <span>devnet · Solana · Anchor || </span>
        <span>by lambfreak</span>
      </footer>
    </main>
  );
}
