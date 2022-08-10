using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace RPG.Saving
{
    public class SavingSystem : MonoBehaviour
    {
        private const string LastSceneBuildIndex = "lastSceneBuildIndex";

        public IEnumerator LoadLastScene(string saveFile)
        {
            Dictionary<string, object> state = LoadFile(saveFile);
            if (state.ContainsKey(LastSceneBuildIndex))
            {
                int buildIndex = (int)state[LastSceneBuildIndex];

                if (buildIndex != SceneManager.GetActiveScene().buildIndex)
                {
                    yield return SceneManager.LoadSceneAsync(buildIndex);
                }
            }

            RestoreState(state);
        }

        public void Save(string saveFile)
        {
            Dictionary<string, object> state = LoadFile(saveFile);
            CaptureState(state);
            SaveFile(saveFile, state);
        }

        public void Load(string saveFile)
        {
            RestoreState(LoadFile(saveFile));
        }

        private void SaveFile(string saveFile, object capturedState)
        {
            string path = GetPathFromSaveFile(saveFile);
            
            using (FileStream stream = File.Open(path, FileMode.Create))
            {
                BinaryFormatter formatter = new BinaryFormatter();
                formatter.Serialize(stream, capturedState);
            }
        }

        private Dictionary<string, object> LoadFile(string saveFile)
        {
            string path = GetPathFromSaveFile(saveFile);

            if (!File.Exists(path))
            {
                return new Dictionary<string, object>();
            }

            using (FileStream stream = File.Open(path, FileMode.Open))
            {
                BinaryFormatter formatter = new BinaryFormatter();
                return (Dictionary<string, object>)formatter.Deserialize(stream);
            }
        }

        private void CaptureState(Dictionary<string, object> state)
        {
            foreach (SaveableEntity saveable in FindObjectsOfType<SaveableEntity>())
            {
                state[saveable.GetUuid()] = saveable.CaptureState();
            }

            state[LastSceneBuildIndex] = SceneManager.GetActiveScene().buildIndex;
        }

        private void RestoreState(Dictionary<string, object> state)
        {
            foreach (SaveableEntity saveable in FindObjectsOfType<SaveableEntity>())
            {
                string uuid = saveable.GetUuid();
                if (!state.ContainsKey(uuid)) continue;
                
                saveable.RestoreState(state[uuid]);
            }
        }

        private string GetPathFromSaveFile(string saveFile)
        {
            return Path.Combine(
                Application.persistentDataPath,
                saveFile + ".sav"
            );
        }

        // manual way of serializing and deserializing a vector3
        
        // public void Save(string saveFile)
        // {
        //     string path = GetPathFromSaveFile(saveFile);
        //
        //     using (FileStream stream = File.Open(path, FileMode.Create))
        //     {
        //         byte[] bytes = SerializeVector(player.transform.position);
        //         stream.Write(bytes, 0, bytes.Length);
        //     }
        // }
        //
        // public void Load(string saveFile)
        // {
        //     string path = GetPathFromSaveFile(saveFile);
        //
        //     using (FileStream stream = File.Open(path, FileMode.Open))
        //     {
        //         byte[] buffer = new byte[stream.Length];
        //         stream.Read(buffer, 0, buffer.Length);
        //         Vector3 savedPosition = DeserializeVector(buffer);
        //         player.transform.position = savedPosition;
        //     }
        // }
        
        // private byte[] SerializeVector(Vector3 vector)
        // {
        //     byte[] vectorBytes = new byte[3 * 4]; // 3 * 4 bytes, 3 float numbers
        //     BitConverter.GetBytes(vector.x).CopyTo(vectorBytes, 0);
        //     BitConverter.GetBytes(vector.y).CopyTo(vectorBytes, 4);
        //     BitConverter.GetBytes(vector.z).CopyTo(vectorBytes, 8);
        //     return vectorBytes;
        // }
        //
        // private Vector3 DeserializeVector(byte[] buffer)
        // {
        //     Vector3 result = new Vector3();
        //     result.x = BitConverter.ToSingle(buffer, 0);
        //     result.y = BitConverter.ToSingle(buffer, 4);
        //     result.z = BitConverter.ToSingle(buffer, 8);
        //     return result;
        // }
    }
}