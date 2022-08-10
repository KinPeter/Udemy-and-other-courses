using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BatteryPickup : MonoBehaviour
{
    private void OnTriggerEnter(Collider other) {
        if (other.gameObject.CompareTag("Player")) {
            other.GetComponentInChildren<FlashlightSystem>().RechargeBattery();
            Destroy(gameObject);
        }
    }
}
