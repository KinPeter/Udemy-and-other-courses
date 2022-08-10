using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Tower : MonoBehaviour {

    [SerializeField] Transform objectToPan;
    [SerializeField] float attackRange = 10f;
    [SerializeField] ParticleSystem projectileParticle;

    Transform targetEnemy;

    public Waypoint waypoint;

    // Update is called once per frame
    void Update() {
        SetTargetEnemy();
        if (targetEnemy) {
            objectToPan.LookAt(targetEnemy);
            FireAtEnemy();
        } else {
            Shoot(false);
        }
    }

    private void SetTargetEnemy() {
        var sceneEnemies = FindObjectsOfType<EnemyDamage>();
        if (sceneEnemies.Length == 0) { return; }

        Transform closestEnemy = sceneEnemies[0].transform;
        foreach (EnemyDamage enemy in sceneEnemies) {
            closestEnemy = GetClosest(closestEnemy, enemy.transform);
        }

        targetEnemy = closestEnemy;
    }

    private Transform GetClosest(Transform currentEnemy, Transform nextEnemy) {
        float distanceToCurrent = Vector3.Distance(currentEnemy.position, gameObject.transform.position);
        float distanceToNext = Vector3.Distance(nextEnemy.position, gameObject.transform.position);
        if (distanceToNext < distanceToCurrent) {
            return nextEnemy;
        } else {
            return currentEnemy;
        }
    }

    private void FireAtEnemy() {
        float distanceToEnemy = Vector3.Distance(targetEnemy.transform.position, gameObject.transform.position);
        if (distanceToEnemy <= attackRange) {
            Shoot(true);
        } else {
            Shoot(false);
        }
    }

    private void Shoot(bool isActive) {
        var emissionModule = projectileParticle.emission;
        emissionModule.enabled = isActive;
    }
}
