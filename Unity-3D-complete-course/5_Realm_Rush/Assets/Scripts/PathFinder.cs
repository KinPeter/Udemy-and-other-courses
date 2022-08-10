using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PathFinder : MonoBehaviour {

    [SerializeField] Waypoint startWaypoint, endWaypoint;

    Dictionary<Vector2Int, Waypoint> grid = new Dictionary<Vector2Int, Waypoint>();
    Queue<Waypoint> queue = new Queue<Waypoint>();
    Waypoint searchCenter;
    bool isRunning = true;
    List<Waypoint> path = new List<Waypoint>();

    Vector2Int[] directions = {
        Vector2Int.up,
        Vector2Int.right,
        Vector2Int.down,
        Vector2Int.left
    };

    public List<Waypoint> GetPath() {
        if (path.Count == 0) {
            CalculatePath();
        }
        return path;
    }

    private void CalculatePath() {
        LoadBlocks();
        BreadthFirstSearch();
        CreatePath();
    }

    private void CreatePath() {
        SetAsPath(endWaypoint);
        
        Waypoint previous = endWaypoint.exploredFrom;
        while (previous != startWaypoint) {
            SetAsPath(previous);
            previous = previous.exploredFrom;
        }
        SetAsPath(startWaypoint);
        path.Reverse();
    }

    private void SetAsPath(Waypoint waypoint) {
        path.Add(waypoint);
        waypoint.isPlaceable = false; // prevent placing tower
    }

    private void BreadthFirstSearch() {
        queue.Enqueue(startWaypoint);
        while (queue.Count > 0 && isRunning) {
            searchCenter = queue.Dequeue();
            HaltIfEndFound();
            ExploreNeighbors();
            searchCenter.isExplored = true;
        }
    }

    private void HaltIfEndFound() {
        if (searchCenter == endWaypoint) {
            isRunning = false;
        }
    }

    private void LoadBlocks() {
        var waypoints = FindObjectsOfType<Waypoint>();
        foreach (Waypoint waypoint in waypoints) {
            Vector2Int gridPos = waypoint.GetGridPos();

            if (grid.ContainsKey(gridPos)) {
                Debug.LogWarning("Overlapping block " + waypoint);
            } else {
                grid.Add(gridPos, waypoint);
            }
        }
    }

    private void ExploreNeighbors() {
        if (!isRunning) { return; }
        foreach (Vector2Int direction in directions) {
            Vector2Int explorationCoordinates = searchCenter.GetGridPos() + direction;
            if (grid.ContainsKey(explorationCoordinates)) {
                QueueNewNeighbors(explorationCoordinates);
            }
        }
    }

    private void QueueNewNeighbors(Vector2Int explorationCoordinates) {
        Waypoint neighbor = grid[explorationCoordinates];
        if (!neighbor.isExplored && !queue.Contains(neighbor)) {
            neighbor.exploredFrom = searchCenter;
            queue.Enqueue(neighbor);
        }
    }
}
