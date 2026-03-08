import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, BN, IdlAccounts } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useMemo } from "react";
import idl from "@/idl/lambfreak.json";

const PROGRAM_ID = new PublicKey("4BeDBHgAHvdMTKduhJQ1jZKVx6qnSD2qi1uQgznBX3tX");

export type Referencia = {
  autor: PublicKey;
  libro: string;
  capitulo: number;
  versiculo: number;
  nota: string;
  bump: number;
};

export type ReferenciaConPDA = {
  pda: PublicKey;
  cuenta: Referencia;
};

function getPDA(
  wallet: PublicKey,
  libro: string,
  capitulo: number,
  versiculo: number
): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("ref"),
      wallet.toBuffer(),
      Buffer.from(libro),
      new BN(capitulo).toArrayLike(Buffer, "le", 2),
      new BN(versiculo).toArrayLike(Buffer, "le", 2),
    ],
    PROGRAM_ID
  );
  return pda;
}

export function useProgram() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const program = useMemo(() => {
    if (!wallet.publicKey) return null;
    const provider = new AnchorProvider(connection, wallet as any, {
      commitment: "confirmed",
    });
    return new Program(idl as any, provider);
  }, [connection, wallet]);

  async function crearReferencia(
    libro: string,
    capitulo: number,
    versiculo: number,
    nota: string
  ) {
    if (!program || !wallet.publicKey) throw new Error("Wallet no conectada");
    const pda = getPDA(wallet.publicKey, libro, capitulo, versiculo);
    const tx = await program.methods
      .crearReferencia(libro, capitulo, versiculo, nota)
      .accounts({
        referencia: pda,
        autor: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    await program.provider.connection.confirmTransaction(tx, "confirmed");
    return pda;
  }

  async function actualizarNota(
    libro: string,
    capitulo: number,
    versiculo: number,
    nuevaNota: string
  ) {
    if (!program || !wallet.publicKey) throw new Error("Wallet no conectada");
    const pda = getPDA(wallet.publicKey, libro, capitulo, versiculo);
    const tx = await program.methods
      .actualizarNota(nuevaNota)
      .accounts({
        referencia: pda,
        autor: wallet.publicKey,
      })
      .rpc();
    await program.provider.connection.confirmTransaction(tx, "confirmed");
  }

  async function eliminarReferencia(
    libro: string,
    capitulo: number,
    versiculo: number
  ) {
    if (!program || !wallet.publicKey) throw new Error("Wallet no conectada");
    const pda = getPDA(wallet.publicKey, libro, capitulo, versiculo);
    const tx = await program.methods
      .eliminarReferencia()
      .accounts({
        referencia: pda,
        autor: wallet.publicKey,
      })
      .rpc();
    await program.provider.connection.confirmTransaction(tx, "confirmed");
  }

  async function listarReferencias(): Promise<ReferenciaConPDA[]> {
    if (!program || !wallet.publicKey) return [];

    // Filtra por autor directo en el nodo — evita traer todas las cuentas
    const cuentas = await (program.account as any).referencia.all([
      {
        memcmp: {
          offset: 8, // 8 bytes del discriminador de Anchor
          bytes: wallet.publicKey.toBase58(),
        },
      },
    ]);

    return cuentas.map((c: any) => ({
      pda: c.publicKey,
      cuenta: c.account as unknown as Referencia,
    }));
  }

  return {
    program,
    crearReferencia,
    actualizarNota,
    eliminarReferencia,
    listarReferencias,
  };
}