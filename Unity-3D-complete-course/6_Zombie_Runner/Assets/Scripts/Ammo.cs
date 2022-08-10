using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class Ammo : MonoBehaviour {
    [SerializeField] private AmmoSlot[] ammoSlots;
    
    [System.Serializable] private class AmmoSlot {
        public AmmoType ammoType;
        public int ammoAmount;
    }

    public int GetCurrentAmmo(AmmoType ammoType) {
        return GetAmmoSlot(ammoType).ammoAmount;
    }

    public void ReduceCurrentAmmo(AmmoType ammoType) {
        GetAmmoSlot(ammoType).ammoAmount--;
    }

    public void IncreaseCurrentAmmo(AmmoType ammoType, int amount) {
        GetAmmoSlot(ammoType).ammoAmount += amount;
    }

    private AmmoSlot GetAmmoSlot(AmmoType ammoType) {
        return ammoSlots.FirstOrDefault(slot => slot.ammoType == ammoType);
    }
}