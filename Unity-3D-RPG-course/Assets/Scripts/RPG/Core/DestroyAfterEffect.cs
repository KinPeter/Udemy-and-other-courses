using UnityEngine;

namespace RPG.Core
{
    public class DestroyAfterEffect : MonoBehaviour
    {
        private ParticleSystem ps;
    
        private void Start()
        {
            ps = GetComponent<ParticleSystem>();
        }

        private void Update()
        {
            if (!ps.IsAlive())
            {
                Destroy(gameObject);
            }
        }
    }
}
