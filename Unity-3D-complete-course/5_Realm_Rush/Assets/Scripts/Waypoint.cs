using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Waypoint : MonoBehaviour {

    const int gridSize = 10;

    public Waypoint exploredFrom;
    public bool isExplored = false;
    public bool isPlaceable = true;

    TowerFactory towerFactory;

    private Material topCylinderMaterial;

    private void Start() {
        towerFactory = FindObjectOfType<TowerFactory>();

        var cylinder = transform.Find("Block friendly/Cylinder");
        if (cylinder) {
            topCylinderMaterial = cylinder.GetComponent<Renderer>().material;
        }
    }

    public int GetGridSize() {
        return gridSize;
    }

    public Vector2Int GetGridPos() {
        return new Vector2Int(
            Mathf.RoundToInt(transform.position.x / gridSize),
            Mathf.RoundToInt(transform.position.z / gridSize)
        );
    }

    private void OnMouseEnter() {
        if (topCylinderMaterial) {
            topCylinderMaterial.color = isPlaceable ? new Color(0f, 0.73f, 0.13f) : new Color(0.7f, 0.23f, 0.23f);
        }
    }

    private void OnMouseExit() {
        if (topCylinderMaterial) {
            topCylinderMaterial.color = new Color(0.34f, 0.34f, 0.34f);
        }
    }

    private void OnMouseOver() {
        if (Input.GetMouseButtonDown(0) && isPlaceable) {
           towerFactory.AddTower(this);
        }
    }
}
