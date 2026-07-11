// PactFlow NFTMarketplace Smart Contract v1.0
// Tracks NFT ownership on-chain. Purchases route XLM to the Protocol Treasury.
#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env, String};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Admin,
    Treasury,
    TokenID,
    NFT(u64),
    NFTCounter,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct NFTEntry {
    pub id: u64,
    pub name: String,
    pub rarity: String,       // "LEGENDARY", "RARE", "UNCOMMON", "COMMON"
    pub price: i128,          // in stroops (1 XLM = 10_000_000 stroops)
    pub owner: Option<Address>,
    pub seller: Option<Address>, // Tracks the seller for payout
    pub is_for_sale: bool,
}

#[contract]
pub struct NFTMarketplace;

#[contractimpl]
impl NFTMarketplace {
    /// Diagnostic health check
    pub fn ping(_env: Env) -> u32 {
        99
    }

    /// Initialize the marketplace
    pub fn init(env: Env, admin: Address, token: Address, treasury: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::TokenID, &token);
        env.storage().instance().set(&DataKey::Treasury, &treasury);
        env.storage().instance().set(&DataKey::NFTCounter, &0u64);
    }

    /// Admin mints a new NFT to the marketplace (for_sale = true, owner = None)
    pub fn mint(env: Env, name: String, rarity: String, price: i128) -> u64 {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).expect("Not init");
        admin.require_auth();

        let mut counter: u64 = env.storage().instance().get(&DataKey::NFTCounter).unwrap_or(0);
        counter += 1;
        env.storage().instance().set(&DataKey::NFTCounter, &counter);

        let nft = NFTEntry {
            id: counter,
            name,
            rarity,
            price,
            owner: None,
            seller: None,
            is_for_sale: true,
        };

        let key = DataKey::NFT(counter);
        env.storage().persistent().set(&key, &nft);
        env.storage().persistent().extend_ttl(&key, 500000, 500000);

        counter
    }

    /// Buyer purchases an NFT. XLM flows to Treasury.
    pub fn buy(env: Env, buyer: Address, nft_id: u64) {
        buyer.require_auth();

        let key = DataKey::NFT(nft_id);
        let mut nft: NFTEntry = env.storage().persistent().get(&key).expect("NFT not found");

        if !nft.is_for_sale {
            panic!("NFT not for sale");
        }
        if nft.owner.is_some() {
            panic!("NFT already owned");
        }

        let token_id: Address = env.storage().instance().get(&DataKey::TokenID).unwrap();
        let treasury: Address = env.storage().instance().get(&DataKey::Treasury).unwrap();
        let token_client = token::Client::new(&env, &token_id);

        let platform_fee = (nft.price * 10) / 100;
        let seller_payment = nft.price - platform_fee;

        // 10% fee to treasury
        token_client.transfer(&buyer, &treasury, &platform_fee);

        // 90% to seller (or treasury if primary sale)
        if let Some(seller) = nft.seller.clone() {
            token_client.transfer(&buyer, &seller, &seller_payment);
        } else {
            token_client.transfer(&buyer, &treasury, &seller_payment);
        }

        nft.owner = Some(buyer);
        nft.seller = None; // Reset seller after purchase
        nft.is_for_sale = false;
        env.storage().persistent().set(&key, &nft);
        env.storage().persistent().extend_ttl(&key, 500000, 500000);
    }

    /// Owner lists their NFT back for sale at a new price
    pub fn relist(env: Env, owner: Address, nft_id: u64, new_price: i128) {
        owner.require_auth();
        let key = DataKey::NFT(nft_id);
        let mut nft: NFTEntry = env.storage().persistent().get(&key).expect("NFT not found");

        if nft.owner.as_ref() != Some(&owner) {
            panic!("Not the owner");
        }

        nft.price = new_price;
        nft.is_for_sale = true;
        // Owner becomes "None" — contract holds it again until resold
        nft.seller = Some(owner);
        nft.owner = None;
        env.storage().persistent().set(&key, &nft);
    }

    /// Get NFT by ID
    pub fn get_nft(env: Env, nft_id: u64) -> NFTEntry {
        env.storage()
            .persistent()
            .get::<_, NFTEntry>(&DataKey::NFT(nft_id))
            .expect("NFT not found")
    }

    /// Get total number of NFTs minted
    pub fn get_counter(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::NFTCounter).unwrap_or(0)
    }

    /// Admin emergency withdraw
    pub fn withdraw(env: Env, to: Address, amount: i128) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).expect("Not init");
        admin.require_auth();
        let token_id: Address = env.storage().instance().get(&DataKey::TokenID).unwrap();
        let token_client = token::Client::new(&env, &token_id);
        token_client.transfer(&env.current_contract_address(), &to, &amount);
    }
}

mod test;
