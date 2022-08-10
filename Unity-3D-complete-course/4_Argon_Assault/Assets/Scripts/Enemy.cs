using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour {

    [SerializeField] GameObject deathFX;
    [SerializeField] Transform parent;
    [SerializeField] int scorePerHit = 100;
    [SerializeField] int hits = 10; // max hits the enemy can take

    ScoreBoard scoreBoard;

    int frameCount = 0;

    void Start() {
        AddNonTriggerBoxCollider();
        scoreBoard = FindObjectOfType<ScoreBoard>();
    }

    private void OnParticleCollision(GameObject other) {
        // avoid two hits to double the score by this condition and setting the variable after the first hit
        // if (frameCount != Time.frameCount) {
        //    frameCount = Time.frameCount;
        // }
        ProcessHit();
        if (hits <= 1) {
            KillEnemy();
        }
    }

    private void ProcessHit() {
        scoreBoard.ScoreHit(scorePerHit);
        hits--;
    }

    private void KillEnemy() {
        // pop the game object linked to the deathFX property, to the position of this game object, without any rotation
        GameObject fx = Instantiate(deathFX, transform.position, Quaternion.identity);
        // put this object under the parent object linked to the parent property
        fx.transform.parent = parent;

        Destroy(gameObject);
    }

    private void AddNonTriggerBoxCollider() {
        Collider collider = gameObject.AddComponent<BoxCollider>();
        collider.isTrigger = false;
    }
}
