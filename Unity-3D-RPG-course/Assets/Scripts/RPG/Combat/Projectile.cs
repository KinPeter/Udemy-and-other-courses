using System;
using RPG.Core;
using UnityEngine;

namespace RPG.Combat
{
    public class Projectile : MonoBehaviour
    {
        [SerializeField] private float speed = 1f;
        [SerializeField] private bool isHoming = false;
        [SerializeField] private GameObject impactEffect;
        [SerializeField] private float maxLifeTime = 10f;
        [SerializeField] private GameObject[] destroyOnHit;
        [SerializeField] private float lifeAfterImpact = .3f;
        
        private Health target;
        private float damage;

        private CapsuleCollider targetCapsule;

        private void Start()
        {
            targetCapsule = target.GetComponent<CapsuleCollider>();
            transform.LookAt(GetAimLocation());
        }

        private void Update()
        {
            if (target == null) return;
            
            if (isHoming && !target.IsDead) transform.LookAt(GetAimLocation());

            transform.Translate(Vector3.forward * (speed * Time.deltaTime));
        }

        public void SetTarget(Health target, float damage)
        {
            this.target = target;
            this.damage = damage;
            
            Destroy(gameObject, maxLifeTime);
        }

        private Vector3 GetAimLocation()
        {
            if (targetCapsule == null) return target.transform.position;
            return target.transform.position + (Vector3.up * targetCapsule.height / 2);
        }

        private void OnTriggerEnter(Collider other)
        {
            if (other.GetComponent<Health>() != target || target.IsDead) return;
            target.TakeDamage(damage);

            speed = 0;

            if (impactEffect != null)
            {
                Instantiate(impactEffect, GetAimLocation(), transform.rotation);
            }

            foreach (GameObject toDestroy in destroyOnHit)
            {
                Destroy(toDestroy);
            }
            
            Destroy(gameObject, lifeAfterImpact);
        }
    }
}