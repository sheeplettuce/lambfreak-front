# ✦ lambfreak · frontend
## Encontrarás el backend en [github.com/sheeplettuce/lambfreak-solana-blockchain](https://github.com/sheeplettuce/lambfreak-solana-blockchain)

### Interfaz web para referencias bíblicas on-chain

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Anchor](https://img.shields.io/badge/Anchor-0.30-FF6B35?style=for-the-badge)](https://www.anchor-lang.com)
[![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://explorer.solana.com/?cluster=devnet)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

> Frontend en Next.js que se conecta al programa Anchor [`lambfreak`](../lambfreak-program) en Solana Devnet.  
> Permite conectar tu wallet, guardar referencias bíblicas on-chain y consultarlas en tiempo real.

---

## Requisitos

- Node.js 18+
- Wallet de Solana (Phantom o Solflare) configurada en **Devnet**
- SOL de prueba — consigue en [faucet.solana.com](https://faucet.solana.com)

---

## Correr en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Stack

| Tecnología | Uso |
|---|---|
| Next.js 16 (App Router) | Framework frontend |
| `@coral-xyz/anchor` | Cliente TypeScript para el programa Anchor |
| `@solana/wallet-adapter-react` | Conexión con wallets (Phantom, Solflare) |
| `@solana/web3.js` | Comunicación con la red Solana |

---

## Programa on-chain

Este frontend interactúa con el programa Anchor desplegado en Devnet:

```
Program ID: 4BeDBHgAHvdMTKduhJQ1jZKVx6qnSD2qi1uQgznBX3tX
```

El IDL del programa vive en `src/idl/lambfreak.json`.

---

## Configurar wallet en Devnet

1. Abre Phantom → Configuración → Red → **Devnet**
2. Consigue SOL de prueba en [faucet.solana.com](https://faucet.solana.com)
3. Conecta tu wallet en la app y empieza a guardar referencias

---

también me desvelé con este, no solo con el back, pero bueno, aguante la [Solana Developer Certification](https://waylearn.gitbook.io/solana-developer-certification) · WayLearn

nada nos separará del amor de Cristo.