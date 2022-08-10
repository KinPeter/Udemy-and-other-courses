using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyMovement : MonoBehaviour {

    [SerializeField] float movementPeriod = 2f;
    [SerializeField] ParticleSystem goalExplosionFx;

    private Transform explosionParent;

    void Start() {
        explosionParent = FindObjectOfType<EnemySpawner>().transform;
        PathFinder pathFinder = FindObjectOfType<PathFinder>();
        List<Waypoint> path = pathFinder.GetPath();
        StartCoroutine(FollowPath(path));
    }

    private IEnumerator FollowPath(List<Waypoint> path) {
        foreach (Waypoint waypoint in path) {
            transform.position = waypoint.transform.position;
            yield return new WaitForSeconds(movementPeriod);
        }
        SelfDestruct();
    }
    private void SelfDestruct() {
        var explosion = Instantiate(goalExplosionFx, transform.position, Quaternion.identity);
        explosion.transform.SetParent(explosionParent);
        Destroy(explosion.gameObject, explosion.main.duration);
        Destroy(gameObject);
    }
}
