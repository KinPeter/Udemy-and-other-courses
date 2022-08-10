using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyDamage : MonoBehaviour {
    [SerializeField] int hitPoints = 10;
    [SerializeField] ParticleSystem hitParticlePrefab;
    [SerializeField] ParticleSystem explosionFx;
    [SerializeField] AudioClip hitSFX;
    [SerializeField] AudioClip deathSFX;
    
    private Transform explosionParent;
    private ScoreBoard scoreBoard;
    private AudioSource audioSource;

    void Start() {
        explosionParent = FindObjectOfType<EnemySpawner>().transform;
        scoreBoard = FindObjectOfType<ScoreBoard>();
        audioSource = GetComponent<AudioSource>();
    }

    private void OnParticleCollision(GameObject other) {
        ProcessHit();
        if (hitPoints <= 0) {
            KillEnemy();
        }
    }

    private void ProcessHit() {
        hitPoints--;
        hitParticlePrefab.Play();
        audioSource.PlayOneShot(hitSFX);
    }
    private void KillEnemy() {
        scoreBoard.IncreaseScore();
        var explosion = Instantiate(explosionFx, transform.position, Quaternion.identity);
        explosion.transform.SetParent(explosionParent);
        Destroy(explosion.gameObject, explosion.main.duration);
        AudioSource.PlayClipAtPoint(deathSFX, Camera.main.transform.position, .4f);
        Destroy(gameObject);
    }

}
