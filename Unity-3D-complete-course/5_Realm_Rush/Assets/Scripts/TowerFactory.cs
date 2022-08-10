using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TowerFactory : MonoBehaviour {

    [SerializeField] Tower towerPrefab;
    [SerializeField] int towerLimit = 5;

    private Transform towersParent;

    private Queue<Tower> towers = new Queue<Tower>();

    // Start is called before the first frame update
    void Start() {
        towersParent = FindObjectOfType<TowersParent>().transform;
    }

    public void AddTower(Waypoint waypoint) {
        if (towers.Count < towerLimit) {
            InstantiateNewTower(waypoint);
        } else {
            MoveExistingTower(waypoint);
        }
    }

    private void InstantiateNewTower(Waypoint waypoint) {
        var newTower = Instantiate(towerPrefab, waypoint.transform.position, Quaternion.identity);
        newTower.waypoint = waypoint;
        newTower.transform.SetParent(towersParent);
        waypoint.isPlaceable = false;
        towers.Enqueue(newTower);
    }

    private void MoveExistingTower(Waypoint newWaypoint) {
        var towerToMove = towers.Dequeue();
        towerToMove.waypoint.isPlaceable = true;

        towerToMove.transform.position = newWaypoint.transform.position;
        towerToMove.waypoint = newWaypoint;
        newWaypoint.isPlaceable = false;

        towers.Enqueue(towerToMove);
    }

}
