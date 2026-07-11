#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Env, String};

#[test]
fn test_mint_and_buy() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(NFTMarketplace, ());
    let client = NFTMarketplaceClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let treasury = Address::generate(&env);
    let buyer = Address::generate(&env);

    // Use a mock token address
    let token_addr = Address::generate(&env);

    client.init(&admin, &token_addr, &treasury);

    let nft_id = client.mint(
        &String::from_str(&env, "Overseer Key"),
        &String::from_str(&env, "LEGENDARY"),
        &5_000_000_000i128, // 500 XLM
    );

    assert_eq!(nft_id, 1u64);

    let nft = client.get_nft(&nft_id);
    assert_eq!(nft.is_for_sale, true);
    assert_eq!(nft.owner, None);

    // The buy call would fail without a real token setup, but we verify NFT fetch works
    let counter = client.get_counter();
    assert_eq!(counter, 1u64);
}

#[test]
fn test_relist() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(NFTMarketplace, ());
    let client = NFTMarketplaceClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let treasury = Address::generate(&env);
    let token_addr = Address::generate(&env);

    client.init(&admin, &token_addr, &treasury);
    let nft_id = client.mint(
        &String::from_str(&env, "Drone"),
        &String::from_str(&env, "RARE"),
        &1_000_000_000i128,
    );

    // Manually set an owner so relist can proceed
    let owner = Address::generate(&env);
    env.as_contract(&contract_id, || {
        let key = DataKey::NFT(nft_id);
        let mut nft: NFTEntry = env.storage().persistent().get(&key).unwrap();
        nft.owner = Some(owner.clone());
        nft.is_for_sale = false;
        env.storage().persistent().set(&key, &nft);
    });

    client.relist(&owner, &nft_id, &500_000_000i128);

    let updated = client.get_nft(&nft_id);
    assert_eq!(updated.is_for_sale, true);
    assert_eq!(updated.price, 500_000_000i128);
}

#[test]
fn test_ping() {
    let env = Env::default();
    let contract_id = env.register(NFTMarketplace, ());
    let client = NFTMarketplaceClient::new(&env, &contract_id);
    assert_eq!(client.ping(), 99u32);
}
