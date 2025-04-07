mod tasks;

fn main() {
    tasks::generate_keypair();
    tasks::load_keypair();
    tasks::check_balance();
}
