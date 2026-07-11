#![cfg(test)]
use super::*;
use soroban_sdk::testutils::Address as _;
use soroban_sdk::{Env, Address};

#[test]
fn test_rpt_and_tier() {
    let env = Env::default();
    let contract_id = env.register_contract(None, ProofWork);
    let client = ProofWorkClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let user = Address::generate(&env);

    client.initialize(&admin);

    // Initial RPT and Tier
    assert_eq!(client.get_rpt(&user), 0);
    assert_eq!(client.get_tier(&user), 0);

    // Grant 2 RPT -> Tier 1
    env.mock_all_auths();
    client.grant_rpt(&user, &2);
    assert_eq!(client.get_rpt(&user), 2);
    assert_eq!(client.get_tier(&user), 1);

    // Grant 2 more RPT (Total 4) -> Tier 2
    client.grant_rpt(&user, &2);
    assert_eq!(client.get_rpt(&user), 4);
    assert_eq!(client.get_tier(&user), 2);

    // Grant enough to reach Tier 10 (1024)
    client.grant_rpt(&user, &1020);
    assert_eq!(client.get_rpt(&user), 1024);
    assert_eq!(client.get_tier(&user), 10);
}
