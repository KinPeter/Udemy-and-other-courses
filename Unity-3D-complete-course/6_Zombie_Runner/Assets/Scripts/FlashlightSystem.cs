using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class FlashlightSystem : MonoBehaviour {
    [SerializeField] private float defaultIntensity = 8f;
    [SerializeField] private float defaultAngle = 60f;
    [SerializeField] private float minimumAngle = 20f;
    [SerializeField] private float lightDecay = 1f;
    [SerializeField] private float angleDecay = 1f;
    [SerializeField] private TextMeshProUGUI flashLightText;
    
    private Light myLight;
    private bool isOn = false;
    private float lastIntensity;
    private float lastAngle;

    private void Start() {
        myLight = GetComponent<Light>();
        myLight.intensity = isOn ? defaultIntensity : 0;
        lastIntensity = defaultIntensity;
        lastAngle = defaultAngle;
    }

    private void Update() {
        DisplayBattery();
        if (Input.GetKeyDown(KeyCode.F)) {
            ToggleFlashLight();
        }
        if (!isOn) return;
        DecreaseLightAngle();
        DecreaseLightIntensity();
    }

    private void DisplayBattery() {
        float batteryPct = isOn 
            ? myLight.intensity / defaultIntensity * 100
            : lastIntensity / defaultIntensity * 100;
        flashLightText.text = Math.Round(batteryPct) + "%";
    }

    private void ToggleFlashLight() {
        isOn = !isOn;
        if (!isOn) {
            lastIntensity = myLight.intensity;
            lastAngle = myLight.spotAngle;
            myLight.intensity = 0;
        }
        else {
            myLight.intensity = lastIntensity;
            myLight.spotAngle = lastAngle;
        }
    }

    private void DecreaseLightAngle() {
        if (myLight.spotAngle <= minimumAngle) return;
        myLight.spotAngle -= angleDecay * Time.deltaTime;
    }

    private void DecreaseLightIntensity() {
        if (myLight.intensity <= 0) return;
        myLight.intensity -= lightDecay * Time.deltaTime;
    }

    public void RechargeBattery() {
        if (isOn) {
            myLight.intensity = defaultIntensity;
            myLight.spotAngle = defaultAngle;
        }
        else {
            lastAngle = defaultAngle;
            lastIntensity = defaultIntensity;
        }
    }
}
