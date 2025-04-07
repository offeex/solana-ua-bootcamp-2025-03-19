import "dotenv/config";
import { Keypair } from "@solana/web3.js";

const pk = process.env.PK;
if (!pk) {
	throw new Error("PK not found");
}

const asBytes = Uint8Array.from(JSON.parse(pk));
const keypair = Keypair.fromSecretKey(asBytes);

console.log("Public key", keypair.publicKey.toBase58());
