using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DisplayDamage : MonoBehaviour {
    [SerializeField] private Canvas impactCanvas;
    [SerializeField] private float impactTime = 0.3f;
    [SerializeField] private AudioClip impactSfx;

    private AudioSource impactSfxSource;

    private void Start() {
        impactCanvas.enabled = false;
        impactSfxSource = GetComponent<AudioSource>();
    }

    public void ShowDamageImpact() {
        impactSfxSource.PlayOneShot(impactSfx);
        StartCoroutine(ShowSplatter());
    }

    private IEnumerator ShowSplatter() {
        impactCanvas.enabled = true;
        yield return new WaitForSeconds(impactTime);
        impactCanvas.enabled = false;
    }
}