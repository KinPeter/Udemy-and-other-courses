﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WeaponSwitcher : MonoBehaviour {
    [SerializeField] private int currentWeapon = 0;

    public void Start() {
        SetWeaponActive();
    }

    private void SetWeaponActive() {
        int weaponIndex = 0;
        foreach (Transform weapon in transform) {
            weapon.gameObject.SetActive(weaponIndex == currentWeapon);
            weaponIndex++;
        }
    }

    private void Update() {
        int previousWeapon = currentWeapon;

        ProcessKeyInput();
        ProcessScrollWheel();

        if (previousWeapon != currentWeapon) {
            SetWeaponActive();
        }
    }

    private void ProcessScrollWheel() {
        if (Input.GetAxis("Mouse ScrollWheel") < 0) {
            if (currentWeapon >= transform.childCount - 1) {
                currentWeapon = 0;
            }
            else {
                currentWeapon++;
            }
        }
        else if (Input.GetAxis("Mouse ScrollWheel") > 0) {
            if (currentWeapon <= 0) {
                currentWeapon = transform.childCount - 1;
            }
            else {
                currentWeapon--;
            }
        }
    }

    private void ProcessKeyInput() {
        if (Input.GetKeyDown(KeyCode.Alpha1)) {
            currentWeapon = 0;
        }
        else if (Input.GetKeyDown(KeyCode.Alpha2)) {
            currentWeapon = 1;
        }
        else if (Input.GetKeyDown(KeyCode.Alpha3)) {
            currentWeapon = 2;
        }
    }
}