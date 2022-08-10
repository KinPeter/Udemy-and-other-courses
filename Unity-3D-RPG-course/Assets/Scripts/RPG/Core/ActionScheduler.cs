using UnityEngine;

namespace RPG.Core
{
    public class ActionScheduler : MonoBehaviour
    {
        private IAction currentAction;
        
        public void StartAction(IAction action)
        {
            if (currentAction == action) return;
            currentAction?.Cancel();
            currentAction = action;
        }
        
        public void CancelCurrentAction()
        {
            if (currentAction == null) return;
            currentAction.Cancel();
            currentAction = null;
        }
    }
    
}