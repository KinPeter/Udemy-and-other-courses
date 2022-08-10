using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class CollisionHandler : MonoBehaviour {

    [Tooltip("In seconds")][SerializeField] float levelLoadDelay = 2f;
    [Tooltip("FX prefab on player")][SerializeField] GameObject deathFX;

    private void OnTriggerEnter(Collider other) {
        StartDeathSequence();
    }

    private void StartDeathSequence() {
        SendMessage("OnPlayerDeath");
        deathFX.SetActive(true); // activate the explosion game object on the player ship
        Invoke("ReloadScene", levelLoadDelay);
    }

    private void ReloadScene() {
        SceneManager.LoadScene(0);
    }
}
