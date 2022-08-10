using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyHead : MonoBehaviour {
    [SerializeField] private EnemyHealth enemy;

    public void TakeHeadShot(float damage) {
        enemy.TakeDamage(damage, true);
    }
}
