using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteInEditMode]
[SelectionBase]
[RequireComponent(typeof(Waypoint))]
public class CubeEditor : MonoBehaviour {
    int gridSize;
    TextMesh textMesh;
    Waypoint waypoint;

    private void Awake() {
        waypoint = GetComponent<Waypoint>();
        gridSize = waypoint.GetGridSize();
        textMesh = GetComponentInChildren<TextMesh>();
    }

    private void Update() {
        SnapToGrid();
        UpdateLabel();
    }

    private void SnapToGrid() {
        transform.position = new Vector3(
            waypoint.GetGridPos().x * gridSize,
            0f,
            waypoint.GetGridPos().y * gridSize // Z in Vector3
        );
    }

    private void UpdateLabel() {
        string labelText = waypoint.GetGridPos().x + "," + waypoint.GetGridPos().y;
        textMesh.text = labelText;
        gameObject.name = labelText;
    }
}
