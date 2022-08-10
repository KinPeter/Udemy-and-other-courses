using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MusicPlayer : MonoBehaviour {

    private void Awake() {
        int numberOfMusicplayers = FindObjectsOfType<MusicPlayer>().Length;
        if (numberOfMusicplayers > 1) {
            Destroy(gameObject);
        } else {
            DontDestroyOnLoad(gameObject);
        }
    }

}