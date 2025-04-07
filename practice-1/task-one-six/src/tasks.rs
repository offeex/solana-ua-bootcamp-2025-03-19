use dotenvy::dotenv;
use solana_client::rpc_client::RpcClient;
use solana_sdk::commitment_config::CommitmentConfig;
use solana_sdk::native_token::LAMPORTS_PER_SOL;
use solana_sdk::{pubkey, signature::Keypair, signer::Signer};

pub fn generate_keypair() {
    println!("\nTask: generate keypair");
    
    let keypair = Keypair::new();
    println!("Public key: {}", keypair.pubkey());
    println!("Private key: {:#?}", keypair.secret());
}

pub fn load_keypair() {
    println!("\nTask: load keypair");
    
    dotenv().ok();

    let pk_string = std::env::var("PK").expect("PUBLIC_KEY must be set");
    let pk_vec: Vec<u8> = serde_json::from_str(&pk_string).expect("invalid JSON");
    let keypair = Keypair::from_bytes(&pk_vec).unwrap();

    println!("Public key: {}", keypair.pubkey());
}

pub fn check_balance() {
    println!("\nTask: check balance");
    
    let client = RpcClient::new_with_commitment(
        "https://api.devnet.solana.com",
        CommitmentConfig::confirmed(),
    );

    let address = pubkey!("Dfp4uCAVAPe3iTAaAEzLazijkkouBY9ZaqLwUMRHMN4P");
    let balance_in_lamports = client.get_balance(&address).unwrap();
    let balance_in_sol = balance_in_lamports as f64 / LAMPORTS_PER_SOL as f64;

    println!("Balance in SOL: {}", balance_in_sol);
}
