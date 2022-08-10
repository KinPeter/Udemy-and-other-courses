using System.Collections;
using RPG.Saving;
using UnityEngine;

namespace RPG.SceneManagement
{
    public class SavingWrapper : MonoBehaviour
    {
        private const string DefaultSaveFile = "save";
        // default path: C:\Users\kinpe\AppData\LocalLow\DefaultCompany\unity-rpg-course

        private SavingSystem savingSystem;

        private IEnumerator Start()
        {
            Fader fader = FindObjectOfType<Fader>();
            fader.FadeOutImmediately();

            savingSystem = GetComponent<SavingSystem>();
            yield return savingSystem.LoadLastScene(DefaultSaveFile);

            yield return fader.FadeIn(1f);
        }

        private void Update()
        {
            if (Input.GetKeyDown(KeyCode.S))
            {
                Save();
            }
            if (Input.GetKeyDown(KeyCode.L))
            {
                Load();
            }
        }

        public void Load()
        {
            savingSystem.Load(DefaultSaveFile);
        }

        public void Save()
        {
            savingSystem.Save(DefaultSaveFile);
        }
    }
}