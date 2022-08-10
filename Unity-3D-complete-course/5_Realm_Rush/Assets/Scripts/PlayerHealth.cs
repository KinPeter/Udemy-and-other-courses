using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class PlayerHealth : MonoBehaviour {

    [SerializeField] int health = 10;
    [SerializeField] int healthDecrease = 1;
    [SerializeField] Text healthText;
    [SerializeField] AudioClip enemyReachedSFX;

    private void Start() {
        healthText.text = health.ToString();
    }

    private void OnTriggerEnter(Collider other) {
        health -= healthDecrease;
        healthText.text = health.ToString();
        GetComponent<AudioSource>().PlayOneShot(enemyReachedSFX);
        if (health <= 0) {
            SceneManager.LoadScene(1);
        }
    }
}
