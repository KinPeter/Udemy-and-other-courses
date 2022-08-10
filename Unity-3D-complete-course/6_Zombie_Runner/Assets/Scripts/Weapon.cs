using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class Weapon : MonoBehaviour {
    [SerializeField] private Camera fpCamera;
    [SerializeField] private float range = 100f;
    [SerializeField] private float damage = 30f;
    [SerializeField] private ParticleSystem muzzleFlash;
    [SerializeField] private GameObject hitEffect;
    [SerializeField] private Ammo ammoSlot;
    [SerializeField] private AmmoType ammoType;
    [SerializeField] private float timeBetweenShots = .5f;
    [SerializeField] private TextMeshProUGUI ammoText;
    
    private AudioSource shotSfxSource;

    private bool canShoot = true;

    private void Start() {
        shotSfxSource = GetComponent<AudioSource>();
    }

    private void OnEnable() {
        canShoot = true;
    }

    private void Update() {
        DisplayAmmo();
        if (Input.GetButtonDown("Fire1") && canShoot && ammoSlot.GetCurrentAmmo(ammoType) > 0) {
            StartCoroutine(Shoot());
        }
    }

    private void DisplayAmmo() {
        ammoText.text = ammoSlot.GetCurrentAmmo(ammoType).ToString();
    }

    private IEnumerator Shoot() {
        canShoot = false;
        
        PlaySfx();
        PlayMuzzleFlash();
        ProcessRaycast();
        ammoSlot.ReduceCurrentAmmo(ammoType);
        
        yield return new WaitForSeconds(timeBetweenShots);
        canShoot = true;
    }

    private void PlayMuzzleFlash() {
        muzzleFlash.Play();
    }

    private void PlaySfx() {
        shotSfxSource.Play();
    }

    private void ProcessRaycast() {
        Transform cameraTransform = fpCamera.transform;
        var hitSomething = Physics.Raycast(
            cameraTransform.position,
            cameraTransform.forward,
            out RaycastHit hit, // OUT parameter ~~returned
            range
        );
        if (!hitSomething) return;
        CreateHitImpact(hit);
        if (hit.transform.gameObject.CompareTag("EnemyHead")) {
            hit.transform.GetComponent<EnemyHead>().TakeHeadShot(damage);
            return;
        }
        EnemyHealth target = hit.transform.GetComponent<EnemyHealth>();
        if (!target) return;
        target.TakeDamage(damage);
    }

    private void CreateHitImpact(RaycastHit hit) {
        GameObject impact = Instantiate(hitEffect, hit.point, Quaternion.LookRotation(hit.normal));
        Destroy(impact, .1f);
    }
}