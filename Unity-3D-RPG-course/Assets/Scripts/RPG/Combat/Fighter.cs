using System;
using RPG.Core;
using RPG.Movement;
using RPG.Saving;
using UnityEngine;

namespace RPG.Combat
{
    public class Fighter : MonoBehaviour, IAction, ISaveable
    {
        [SerializeField] private Transform rightHandTransform = null;
        [SerializeField] private Transform leftHandTransform = null;
        [SerializeField] private Weapon defaultWeapon = null;

        private Health target;
        private Mover mover;
        private ActionScheduler scheduler;
        private Animator animator;
        private Weapon currentWeapon = null;

        private float timeSinceLastAttack = Mathf.Infinity;

        private void OnEnable()
        {
            mover = GetComponent<Mover>();
            scheduler = GetComponent<ActionScheduler>();
            animator = GetComponent<Animator>();

        }

        private void Start()
        {
            if (currentWeapon == null)
            {
                EquipWeapon(defaultWeapon);
            }
        }

        private void Update()
        {
            timeSinceLastAttack += Time.deltaTime;

            if (target == null || target.IsDead) return;
            bool isInRange = Vector3.Distance(
                transform.position,
                target.transform.position
            ) < currentWeapon.GetRange();
            if (!isInRange)
            {
                mover.MoveTo(target.transform.position, 1f);
            }
            else
            {
                AttackBehavior();
                mover.Cancel();
            }
        }

        public void EquipWeapon(Weapon weapon)
        {
            currentWeapon = weapon;
            weapon.Spawn(rightHandTransform, leftHandTransform, animator);
        }

        private void AttackBehavior()
        {
            transform.LookAt(target.transform);
            if (timeSinceLastAttack < currentWeapon.GetTimeBetweenAttacks()) return;
            animator.ResetTrigger("stopAttack");
            // This will trigger the Hit() event.
            animator.SetTrigger("attack");
            timeSinceLastAttack = 0;
        }

        // Animation event handler
        private void Hit()
        {
            if (target == null) return;
            
            if (currentWeapon.HasProjectile())
            {
                currentWeapon.LaunchProjectile(rightHandTransform, leftHandTransform, target);
            }
            else
            {
                target.TakeDamage(currentWeapon.GetDamage());
            }
            
        }

        // Animation event handler
        private void Shoot()
        {
            Hit();
        }

        public bool CanAttack(GameObject combatTarget)
        {
            if (combatTarget == null) return false;
            Health targetToTest = combatTarget.GetComponent<Health>();
            return !targetToTest.IsDead;
        }

        public void Attack(GameObject combatTarget)
        {
            scheduler.StartAction(this);
            target = combatTarget.GetComponent<Health>();
        }

        public void Cancel()
        {
            target = null;
            mover.Cancel();
            animator.ResetTrigger("attack");
            animator.SetTrigger("stopAttack");
        }

        public object CaptureState()
        {
            return currentWeapon.name;
        }

        public void RestoreState(object state)
        {
            var weaponName = (string)state;
            Weapon weapon = Resources.Load<Weapon>(weaponName);
            EquipWeapon(weapon);
        }
    }
}