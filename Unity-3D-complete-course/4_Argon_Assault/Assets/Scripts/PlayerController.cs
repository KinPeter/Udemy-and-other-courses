using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityStandardAssets.CrossPlatformInput;

public class PlayerController : MonoBehaviour {

    [Header("General")]
    [Tooltip("In ms^-1")] [SerializeField] float controlSpeed = 15f;
    [Tooltip("In m")] [SerializeField] float xRange = 8f;
    [Tooltip("In m")] [SerializeField] float yRange = 5f;
    [SerializeField] GameObject[] guns;

    [Header("Screen-position based")]
    [SerializeField] float positionPitchFactor = -5f;
    [SerializeField] float positionYawFactor = 4.5f;

    [Header("Control-throw based")]
    [SerializeField] float controlPitchFactor = -20f;
    [SerializeField] float controlRollFactor = -30f;

    float xThrow, yThrow;
    bool controlsEnabled = true;

    // Update is called once per frame
    void Update() {
        if (controlsEnabled) {
            ProcessTranslation();
            ProcessRotation();
            ProcessFiring();
        }
    }

    private void ProcessTranslation() {
        xThrow = CrossPlatformInputManager.GetAxis("Horizontal");
        yThrow = CrossPlatformInputManager.GetAxis("Vertical");
        float xOffset = xThrow * controlSpeed * Time.deltaTime;
        float yOffset = yThrow * controlSpeed * Time.deltaTime;

        // transform.localPosition: position relative to the parent game object
        float newXPos = Mathf.Clamp(transform.localPosition.x + xOffset, -xRange, xRange);
        float newYPos = Mathf.Clamp(transform.localPosition.y + yOffset, -yRange, yRange);

        transform.localPosition = new Vector3(newXPos, newYPos, transform.localPosition.z);
    }
    
    private void ProcessRotation() {
        float pitchDueToPosition = transform.localPosition.y * positionPitchFactor;
        float pitchDueToControlThrow = yThrow * controlPitchFactor;
        float pitch = pitchDueToPosition + pitchDueToControlThrow;

        float yaw = transform.localPosition.x * positionYawFactor;

        float roll = xThrow * controlRollFactor;

        // transform.localRotation: rotation relative to the object itself (not the world)
        // Quaternion.Euler(x, y, z) ==> Quaternion.Euler(pitch, yaw, roll)
        transform.localRotation = Quaternion.Euler(pitch, yaw, roll);
    }

    private void ProcessFiring() {
        if (CrossPlatformInputManager.GetButton("Fire")) {
            SetGunsActive(true);
        } else {
            SetGunsActive(false);
        }
    }

    private void SetGunsActive(bool isActive) {
        foreach (GameObject gun in guns) {
            var emissionModule = gun.GetComponent<ParticleSystem>().emission;
            emissionModule.enabled = isActive;
        }
    }

    private void OnPlayerDeath() {
        controlsEnabled = false;
    }
}
