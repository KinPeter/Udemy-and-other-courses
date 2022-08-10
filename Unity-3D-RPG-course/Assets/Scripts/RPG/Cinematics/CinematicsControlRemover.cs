using RPG.Control;
using RPG.Core;
using UnityEngine;
using UnityEngine.Playables;

namespace RPG.Cinematics
{
    public class CinematicsControlRemover : MonoBehaviour
    {
        private PlayerController playerController;
        private ActionScheduler scheduler;
        
        private void Start()
        {
            PlayableDirector introSequence = GetComponent<PlayableDirector>();
            introSequence.played += DisableControl;
            introSequence.stopped += EnableControl;

            GameObject player = GameObject.FindWithTag("Player");
            playerController = player.GetComponent<PlayerController>();
            scheduler = player.GetComponent<ActionScheduler>();
        }

        private void DisableControl(PlayableDirector pd)
        {
            scheduler.CancelCurrentAction();
            playerController.enabled = false;
        }

        private void EnableControl(PlayableDirector pd)
        {
            playerController.enabled = true;
        }
    }
}