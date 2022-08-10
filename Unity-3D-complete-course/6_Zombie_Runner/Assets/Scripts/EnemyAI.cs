using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class EnemyAI : MonoBehaviour {
    [SerializeField] private float chaseRange = 5f;
    [SerializeField] private float turnSpeed = 5f;

    private PlayerHealth target;
    private NavMeshAgent navMeshAgent;
    private Animator animator;
    private AudioSource provokedSfxSource;
    private float distanceToTarget = Mathf.Infinity;
    private bool isProvoked = false;

    public void Start() {
        target = FindObjectOfType<PlayerHealth>();
        navMeshAgent = GetComponent<NavMeshAgent>();
        animator = GetComponent<Animator>();
        provokedSfxSource = GetComponent<AudioSource>();
    }

    private void Update() {
        Vector3 targetPosition = target.transform.position;
        distanceToTarget = Vector3.Distance(targetPosition, transform.position);

        if (isProvoked) {
            EngageTarget();
        } else if (distanceToTarget <= chaseRange) {
            GetProvoked();
        }
    }

    private void GetProvoked() {
        isProvoked = true;
        provokedSfxSource.Play();
        target.OnEnemyProvoked();
    }

    public void OnDamageTaken() {
        if (isProvoked) return;
        GetProvoked();
    }

    public void TellTargetImDead() {
        if (!isProvoked) return;
        target.OnEnemyDead();
    }

    private void EngageTarget() {
        FaceTarget();
        if (distanceToTarget > navMeshAgent.stoppingDistance) {
            ChaseTarget();
        } else {
            AttackTarget();
        }
    }

    private void AttackTarget() {
        animator.SetBool("attack", true);
    }

    private void ChaseTarget() {
        animator.SetBool("attack", false);
        animator.SetTrigger("move");
        navMeshAgent.SetDestination(target.transform.position);
    }

    private void FaceTarget() {
        // the direction we wanna look, normalized means without the magnitude
        Vector3 direction = (target.transform.position - transform.position).normalized;
        // the rotation "amount" we need to look there (we don't wanna turn on Y axis, thus it's 0)
        Quaternion lookRotation = Quaternion.LookRotation(new Vector3(direction.x, 0, direction.z));
        // Slerp() will rotate us over time
        transform.rotation = Quaternion.Slerp(transform.rotation, lookRotation, Time.deltaTime * turnSpeed);
    }

    private void OnDrawGizmosSelected() {
        Gizmos.color = Color.cyan;
        Gizmos.DrawWireSphere(transform.position, chaseRange);
    }
}