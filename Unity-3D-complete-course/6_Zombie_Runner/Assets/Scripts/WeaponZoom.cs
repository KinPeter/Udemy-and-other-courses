using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityStandardAssets.Characters.FirstPerson;

public class WeaponZoom : MonoBehaviour {
    [SerializeField] private Camera fpsCamera;
    [SerializeField] private RigidbodyFirstPersonController fpsController;
    [SerializeField] private float zoomedOutFOV = 60f;
    [SerializeField] private float zoomedInFOV = 25f;
    [SerializeField] private float zoomedOutSensitivity = 2f;
    [SerializeField] private float zoomedInSensitivity = 0.3f;

    private bool zoomedIn = false;

    private void OnDisable() {
        fpsCamera.fieldOfView = zoomedOutFOV;
        fpsController.mouseLook.XSensitivity = zoomedOutSensitivity;
        fpsController.mouseLook.YSensitivity = zoomedOutSensitivity;
    }

    private void Update() {
        if (Input.GetMouseButtonDown(1)) {
            zoomedIn = !zoomedIn;
            fpsCamera.fieldOfView = zoomedIn ? zoomedOutFOV : zoomedInFOV;
            fpsController.mouseLook.XSensitivity = zoomedIn ? zoomedOutSensitivity : zoomedInSensitivity;
            fpsController.mouseLook.YSensitivity = zoomedIn ? zoomedOutSensitivity : zoomedInSensitivity;
        }
    }
}
