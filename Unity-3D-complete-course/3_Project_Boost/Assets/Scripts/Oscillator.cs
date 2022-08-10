using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[DisallowMultipleComponent] // allows only one of this script on a game object
public class Oscillator : MonoBehaviour {

    [SerializeField] Vector3 movementVector = new Vector3(10f, 10f, 10f);
    [SerializeField] float period = 2f; // time in sec we want for 1 movement cycle

    float movementFactor; // 0 for not moved, 1 for fully moved
    Vector3 startingPos;

    // Start is called before the first frame update
    void Start() {
        startingPos = transform.position;
    }

    // Update is called once per frame
    void Update() {
        if (period <= Mathf.Epsilon) { return; } // protect against dividing by zero

        float cycles = Time.time / period; // grows continually from 0
        const float TAU = Mathf.PI * 2;
        float rawSinWave = Mathf.Sin(cycles * TAU); // goes from -1 to +1
        movementFactor = rawSinWave / 2 + 0.5f;

        Vector3 offset = movementVector * movementFactor;
        transform.position = startingPos + offset;
    }
}
