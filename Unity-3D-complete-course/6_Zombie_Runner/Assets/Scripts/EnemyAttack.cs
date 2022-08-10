using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyAttack : MonoBehaviour {
    [SerializeField] private float damage = 40f;

    private PlayerHealth target;
    private DisplayDamage damageCanvas;

    public void Start() {
        target = FindObjectOfType<PlayerHealth>();
        damageCanvas = target.GetComponent<DisplayDamage>();
    }

    /**
     * This method is called inside the animation by adding
     * animation events to the frames when the zombie is actually
     * hitting us.
     */
    public void AttackHitEvent() {
        if (!target) return;
        target.TakeDamage(damage);
        damageCanvas.ShowDamageImpact();
    }
}