using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class GameEndHandler : MonoBehaviour {
    [SerializeField] private Canvas gameOverCanvas;
    [SerializeField] private TextMeshProUGUI survivedText;

    private void Start() {
        gameOverCanvas.enabled = false;
        survivedText.enabled = false;
    }

    private void OnTriggerEnter(Collider other) {
        gameOverCanvas.enabled = true;
        survivedText.enabled = true;
        // "stop time"
        Time.timeScale = 0;
        // disable weapon switcher
        FindObjectOfType<WeaponSwitcher>().enabled = false;
        // unlock the cursor from the FPS controller and make it visible
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }
}