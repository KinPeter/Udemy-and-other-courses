using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class PlayerHealth : MonoBehaviour {
    [SerializeField] private float hitPoints = 200f;
    [SerializeField] private TextMeshProUGUI hpText;
    [SerializeField] private TextMeshProUGUI attackedText;

    private readonly Queue<bool> attackers = new Queue<bool>();

    private void Update() {
        attackedText.enabled = attackers.Count > 0;
        hpText.text = hitPoints.ToString();
    }

    public void TakeDamage(float damage) {
        hitPoints -= damage;
        if (hitPoints <= 0) {
            DeathHandler deathHandler = GetComponent<DeathHandler>();
            if (!deathHandler) return;
            deathHandler.HandleDeath();
        }
    }

    public void OnEnemyProvoked() {
        attackers.Enqueue(true);
    }

    public void OnEnemyDead() {
        if (attackers.Count == 0) return;
        attackers.Dequeue();
    }
}