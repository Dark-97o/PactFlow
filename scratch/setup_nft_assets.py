import os
import shutil

# Source directory (brain directory)
src_dir = r"C:\Users\subhr\.gemini\antigravity\brain\46dd5a7b-746e-4a5d-b7eb-c51f248ee48a"
# Destination directory
dest_dir = r"c:\Users\subhr\OneDrive\Documents\Programs\GitHub\PactFlow\public\assets\nfts"

# Ensure destination exists
os.makedirs(dest_dir, exist_ok=True)

# Mapping: Collection Name -> Brain Filename
mapping = {
    "titan_core": "titan_core_nft_1777464289904.png",
    "neural_nexus": "neural_uplink_1777457360188.png",
    "quantum_sentinel": "protocol_drone_elite_1777457316762.png",
    "cybernetic_aegis": "genesis_artifact_01_1777460763071.png",
    "orbital_relay": "orbit_sync_1777457497432.png",
    "data_monolith": "data_silo_core_1777457334794.png",
    "plasma_overdrive": "plasma_conduit_1777457421896.png",
    "void_singularity": "void_shard_1777457440955.png",
    "neon_catalyst": "neo_catalyst_1777457480998.png",
    "system_override": "ghost_logic_1777457514410.png",
    "protocol_ghost": "ghost_logic_1777457514410.png",
    "encryption_key_alpha": "overseer_key_v2_1777457298204.png",
    "nano_swarm": "data_fragment_04_1777460824333.png",
    "holo_map": "holo_relic_1777457399126.png",
    "pulse_cannon": "titan_processor_1777457459601.png",
    "binary_sword": "quantum_cipher_1777457378109.png",
    "vector_shield": "trust_badge_03_1777460803653.png",
    "static_pulse": "data_fragment_04_1777460824333.png",
    "copper_link": "enforcement_drone_02_1777460782666.png",
    "basic_uplink": "orbit_sync_1777457497432.png",
    "scrap_drone": "enforcement_drone_02_1777460782666.png",
    "rusty_cipher": "quantum_cipher_1777457378109.png",
    "patchwork_shield": "trust_badge_03_1777460803653.png",
}

print(f"--- Copying {len(mapping)} images to assets/nfts ---")

for new_name, old_name in mapping.items():
    src_path = os.path.join(src_dir, old_name)
    dest_path = os.path.join(dest_dir, f"{new_name}.png")
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {old_name} -> {new_name}.png")
    else:
        print(f"WARNING: Source not found: {old_name}")

print("--- Done ---")
