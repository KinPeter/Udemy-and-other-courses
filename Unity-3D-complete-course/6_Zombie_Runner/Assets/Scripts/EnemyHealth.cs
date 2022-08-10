using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class EnemyHealth : MonoBehaviour {
    [SerializeField] private float hitPoints = 100f;
    [SerializeField] private float headshotMultiplier = 4;
    
    private Animator animator;
    private NavMeshAgent navMeshAgent;
    private EnemyAI enemyAI;

    private void Start() {
        animator = GetComponent<Animator>();
        navMeshAgent = GetComponent<NavMeshAgent>();
        enemyAI = GetComponent<EnemyAI>();
    }

    public void TakeDamage(float damage, bool isHeadShot = false) {
        enemyAI.OnDamageTaken();
        float finalDamage = isHeadShot ? damage * headshotMultiplier : damage;
        hitPoints -= finalDamage;
        if (hitPoints <= 0) {
            Die();
        }
    }

    private void Die() {
        enemyAI.TellTargetImDead();
        animator.SetTrigger("die");
        enemyAI.enabled = false;
        navMeshAgent.enabled = false;
    }
}
