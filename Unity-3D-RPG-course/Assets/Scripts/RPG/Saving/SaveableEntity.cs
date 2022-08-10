using System;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace RPG.Saving
{
    [ExecuteAlways]
    public class SaveableEntity : MonoBehaviour
    {
        [SerializeField] private string guid = "";

        public static Dictionary<string, SaveableEntity> GlobalLookup = new Dictionary<string, SaveableEntity>();
        
        public string GetUuid()
        {
            return guid;
        }

        public object CaptureState()
        {
            Dictionary<string, object> state = new Dictionary<string, object>();

            foreach (ISaveable saveable in GetComponents<ISaveable>())
            {
                state[saveable.GetType().ToString()] = saveable.CaptureState();
            }

            return state;
        }
        
        public void RestoreState(object state)
        {
            Dictionary<string, object> stateDict = (Dictionary<string, object>)state;

            foreach (ISaveable saveable in GetComponents<ISaveable>())
            {
                string typeString = saveable.GetType().ToString();

                if (!stateDict.ContainsKey(typeString)) continue;
                
                saveable.RestoreState(stateDict[typeString]);
            }
        }

#if UNITY_EDITOR
        /* UnityEditor namespace and thus SerializedObject and SerializedProperty are
         not available in a built project, so with this #if block we tell the compiler
         to exclude this code upon build.
         */
        private void Update()
        {
            if (
                Application.IsPlaying(gameObject) ||        // we are in play mode
                string.IsNullOrEmpty(gameObject.scene.path) // we are in a prefab
            ) return;

            SerializedObject obj = new SerializedObject(this);
            SerializedProperty property = obj.FindProperty("guid");

            if (
                !string.IsNullOrEmpty(property.stringValue) && 
                IsUnique(property.stringValue)
            ) return;

            property.stringValue = Guid.NewGuid().ToString();
            obj.ApplyModifiedProperties();

            GlobalLookup[property.stringValue] = this;
        }
#endif

        private bool IsUnique(string candidate)
        {
            if (!GlobalLookup.ContainsKey(candidate)) return true;
            if (GlobalLookup[candidate] == this) return true;
            if (GlobalLookup[candidate] == null || GlobalLookup[candidate].GetUuid() != candidate)
            {
                GlobalLookup.Remove(candidate);
                return true;
            }
            return false;
        }
    }
}