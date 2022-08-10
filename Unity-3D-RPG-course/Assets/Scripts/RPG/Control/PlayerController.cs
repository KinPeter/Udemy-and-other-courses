using RPG.Combat;
using RPG.Core;
using RPG.Movement;
using UnityEngine;

namespace RPG.Control {
    public class PlayerController : MonoBehaviour {
        [SerializeField] private Camera mainCamera;
        
        private Mover mover;
        private Health health;
        private Fighter fighter;
        
        private void Start() {
            mover = GetComponent<Mover>();
            health = GetComponent<Health>();
            fighter = GetComponent<Fighter>();
        }

        private void Update() {
            if (health.IsDead) return;
            if (InteractWithCombat()) return;
            if (InteractWithMovement()) return;
            // nothing to do yet
        }

        private bool InteractWithCombat() {
            var hits = Physics.RaycastAll(GetMouseRay());
            foreach (RaycastHit hit in hits) {
                CombatTarget target = hit.transform.GetComponent<CombatTarget>();

                if (target == null || !fighter.CanAttack(target.gameObject)) continue;
                
                if (Input.GetMouseButton(0)) {
                    fighter.Attack(target.gameObject);
                }
                return true;
            }
            return false;
        }

        private bool InteractWithMovement() {
            bool hasHit = Physics.Raycast(GetMouseRay(), out RaycastHit hit);
            if (!hasHit) return false;
            if (Input.GetMouseButton(0)) {
                mover.StartMoveAction(hit.point, 1f);
            }
            return true;
        }

        private Ray GetMouseRay() {
            return mainCamera.ScreenPointToRay(Input.mousePosition);
        }
    }
}

