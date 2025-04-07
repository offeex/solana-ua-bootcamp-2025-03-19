import {
	clusterApiUrl,
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	PublicKey,
	sendAndConfirmTransaction,
	SystemProgram,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";
import "dotenv/config";

const pk = process.env.PK;
if (!pk) {
	throw new Error("Private key not found");
}

const sender = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(pk)));
const receiver = new PublicKey("HyiK7Ud33RiXm3X4d9j8pPK5fmQ6J6A1z9PuP4YvJYuN");
const connection = new Connection(clusterApiUrl("devnet"));

const transaction = new Transaction()
	.add(
		SystemProgram.transfer({
			fromPubkey: sender.publicKey,
			toPubkey: receiver,
			lamports: 0.01 * LAMPORTS_PER_SOL,
		}),
	)
	.add(
		new TransactionInstruction({
			keys: [{ pubkey: sender.publicKey, isSigner: true, isWritable: true }],
			data: Buffer.from("Nigger", "utf8"),
			programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
		}),
	);
console.log(`Tryin' to send 0.01 SOL to ${receiver.toBase58()}`);

transaction.sign(sender);
const txHash = await connection.sendRawTransaction(transaction.serialize());

const signature = await sendAndConfirmTransaction(connection, transaction, [
	sender,
]);
await connection.sendTransaction(transaction, [sender], {});

console.log(`Transaction signature: ${signature}`);
