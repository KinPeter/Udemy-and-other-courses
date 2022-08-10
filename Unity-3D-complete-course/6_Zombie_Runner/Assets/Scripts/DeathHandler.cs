using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class DeathHandler : MonoBehaviour {
    [SerializeField] private Canvas gameOverCanvas;
    [SerializeField] private TextMeshProUGUI deadText;

    private void Start() {
        gameOverCanvas.enabled = false;
        deadText.enabled = false;
    }

    public void HandleDeath() {
        gameOverCanvas.enabled = true;
        deadText.enabled = true;
        // "stop time"
        Time.timeScale = 0;
        // disable weapon switcher
        FindObjectOfType<WeaponSwitcher>().enabled = false;
        // unlock the cursor from the FPS controller and make it visible
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }
}