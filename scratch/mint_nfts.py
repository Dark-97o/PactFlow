# PactFlow NFT Batch Minting Script (v2.0 Marketplace) - v2

import os
import subprocess
import json
import sys

CONTRACT_ID = "CCHZEMKRQ7MJ6XZBUR5XTCF6X2G2A56ZSMKQZPTKXDPPH5CXETAPK444"
SOURCE = "subh"
NETWORK = "testnet"

def xlm_to_stroops(xlm):
    return int(xlm * 10_000_000)

nfts = [
    {"name": "Titan Core", "rarity": "LEGENDARY", "price": 100000},
    {"name": "Neural Nexus", "rarity": "LEGENDARY", "price": 90000},
    {"name": "Quantum Sentinel", "rarity": "LEGENDARY", "price": 85000},
    {"name": "Cybernetic Aegis", "rarity": "RARE", "price": 75000},
    {"name": "Orbital Relay", "rarity": "RARE", "price": 70000},
    {"name": "Data Monolith", "rarity": "RARE", "price": 65000},
    {"name": "Plasma Overdrive", "rarity": "RARE", "price": 60000},
    {"name": "Void Singularity", "rarity": "RARE", "price": 55000},
    {"name": "Neon Catalyst", "rarity": "RARE", "price": 50000},
    {"name": "System Override", "rarity": "RARE", "price": 45000},
    {"name": "Protocol Ghost", "rarity": "UNCOMMON", "price": 40000},
    {"name": "Encryption Key Alpha", "rarity": "UNCOMMON", "price": 35000},
    {"name": "Nano-Swarm", "rarity": "UNCOMMON", "price": 30000},
    {"name": "Holo-Map", "rarity": "UNCOMMON", "price": 25000},
    {"name": "Pulse Cannon", "rarity": "UNCOMMON", "price": 20000},
    {"name": "Binary Sword", "rarity": "UNCOMMON", "price": 18000},
    {"name": "Vector Shield", "rarity": "COMMON", "price": 15000},
    {"name": "Static Pulse", "rarity": "COMMON", "price": 12000},
    {"name": "Copper Link", "rarity": "COMMON", "price": 8000},
    {"name": "Basic Uplink", "rarity": "COMMON", "price": 5000},
    {"name": "Scrap Drone", "rarity": "COMMON", "price": 2500},
    {"name": "Rusty Cipher", "rarity": "COMMON", "price": 1000},
    {"name": "Patch-Work Shield", "rarity": "COMMON", "price": 500},
]

results = []

print(f"--- Starting Batch Minting for 23 NFTs ---")
sys.stdout.flush()

for i, nft in enumerate(nfts, 1):
    stroops = xlm_to_stroops(nft["price"])
    print(f"[{i}/23] Minting {nft['name']} ({nft['price']} XLM)... ", end="")
    sys.stdout.flush()
    
    cmd = [
        "stellar", "contract", "invoke",
        "--id", CONTRACT_ID,
        "--source", SOURCE,
        "--network", NETWORK,
        "--", "mint",
        "--name", nft["name"],
        "--rarity", nft["rarity"],
        "--price", str(stroops)
    ]
    
    try:
        # Use run instead of check_output for more control
        res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
        if res.returncode == 0:
            results.append({"id": i, "name": nft["name"], "status": "SUCCESS", "output": res.stdout.strip()})
            print("OK")
        else:
            results.append({"id": i, "name": nft["name"], "status": "FAILED", "error": res.stderr.strip()})
            print("FAILED")
    except Exception as e:
        results.append({"id": i, "name": nft["name"], "status": "ERROR", "error": str(e)})
        print(f"ERROR: {e}")
    
    sys.stdout.flush()

with open("mint_results.json", "w") as f:
    json.dump(results, f, indent=2)

print("\n--- Batch Minting Complete ---")
sys.stdout.flush()
