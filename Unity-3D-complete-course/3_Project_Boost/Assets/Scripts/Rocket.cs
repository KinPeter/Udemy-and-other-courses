using UnityEngine;
using UnityEngine.SceneManagement;

public class Rocket : MonoBehaviour {

    [SerializeField] bool collisionDetection = true;
    [SerializeField] float rcsThrust = 250f;
    [SerializeField] float mainThrust = 1300f;
    [SerializeField] float levelLoadDelay = 3f;
    [SerializeField] AudioClip mainEngine;
    [SerializeField] AudioClip deathExplosion;
    [SerializeField] AudioClip successJingleChime;

    [SerializeField] ParticleSystem mainEngineParticles;
    [SerializeField] ParticleSystem deathParticles;
    [SerializeField] ParticleSystem successParticles;

    Rigidbody rigidBody;
    AudioSource audioSource;

    int currentSceneIndex;
    enum State { Alive, Dying, Transcending };
    State state = State.Alive;

    // Start is called before the first frame update
    void Start() {
        rigidBody = GetComponent<Rigidbody>();
        audioSource = GetComponent<AudioSource>();
        currentSceneIndex = SceneManager.GetActiveScene().buildIndex;
    }

    // Update is called once per frame
    void Update() {
        if (currentSceneIndex == 0 && Input.anyKeyDown) {
            LoadFirstLevel();
        }
        if (state == State.Alive) {
            RespondToThrustInput();
            RespondToRotateInput();
        }
        if (Debug.isDebugBuild) {
            RespondToDebugKeys();
        }
    }

    void OnCollisionEnter(Collision collision) {
        if (state != State.Alive) { return; } // ignore collisions when dead

        switch (collision.gameObject.tag) {
            case "Friendly":
                // do nothing
                break;
            case "Finish":
                StartSuccessSequence();
                break;
            default:
                if (collisionDetection) {
                    StartDeathSequence();
                }
                break;
        }
    }

    private void StartDeathSequence() {
        state = State.Dying;
        audioSource.Stop();
        audioSource.PlayOneShot(deathExplosion);
        deathParticles.Play();
        Invoke("RestartLevel", levelLoadDelay);
    }

    private void StartSuccessSequence() {
        state = State.Transcending;
        audioSource.Stop();
        audioSource.PlayOneShot(successJingleChime);
        successParticles.Play();
        Invoke("LoadNextLevel", levelLoadDelay);
    }

    private void LoadFirstLevel() {
        SceneManager.LoadScene(1);
    }

    private void RestartLevel() {
        SceneManager.LoadScene(currentSceneIndex);
    }

    private void LoadNextLevel() {
        int nextSceneIndex = currentSceneIndex + 1;
        if (nextSceneIndex == SceneManager.sceneCountInBuildSettings) {
            nextSceneIndex = 0;
        }
        SceneManager.LoadScene(nextSceneIndex);
    }

    private void RespondToThrustInput() {
        if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.UpArrow)) {
            float multiplierForFrame = Time.deltaTime * mainThrust;
            rigidBody.AddRelativeForce(Vector3.up * multiplierForFrame);
        }

        if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow)) {
            audioSource.PlayOneShot(mainEngine);
            mainEngineParticles.Play();
        }
        if (Input.GetKeyUp(KeyCode.W) || Input.GetKeyUp(KeyCode.UpArrow)) {
            audioSource.Stop();
            mainEngineParticles.Stop();
        }
    }

    private void RespondToRotateInput() {
        rigidBody.angularVelocity = Vector3.zero; // remove due to physics

        float rotationThisFrame = Time.deltaTime * rcsThrust;

        if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow)) {
            transform.Rotate(Vector3.forward * rotationThisFrame);
        } else if (Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow)) {
            transform.Rotate(-Vector3.forward * rotationThisFrame);
        }
    }

    private void RespondToDebugKeys() {
        if (Input.GetKeyDown(KeyCode.C)) {
            collisionDetection = !collisionDetection;
        }
        if (Input.GetKeyDown(KeyCode.L)) {
            LoadNextLevel();
        }
    }
}
