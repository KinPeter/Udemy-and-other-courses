using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScoreBoard : MonoBehaviour {
    [SerializeField] Text scoreText;
    int score = 0;

    void Start() {
        scoreText.text = score.ToString();
    }

    public void IncreaseScore() {
        score += 10;
        scoreText.text = score.ToString();
    }
}