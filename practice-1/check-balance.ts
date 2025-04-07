import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com");
console.log("Connected to devnet");

const publicKey = new PublicKey("Dfp4uCAVAPe3iTAaAEzLazijkkouBY9ZaqLwUMRHMN4P");
const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`Balance in SOL: ${balanceInSOL}	`);
