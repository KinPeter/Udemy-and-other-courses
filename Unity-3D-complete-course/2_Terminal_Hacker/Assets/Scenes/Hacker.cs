using UnityEngine;

enum Screen { MainMenu, Password, Win }

public class Hacker : MonoBehaviour {

    // Game config data
    string[] level1Passwords = { "books", "aisle", "shelf", "password", "font", "borrow" };
    string[] level2Passwords = { "prisoner", "handcuffs", "holster", "uniform", "arrest" };
    string[] level3Passwords = { "spaceship", "astronauts", "rocketfuel", "aerodynamics", "shuttleprogram" };

    // Game state
    private int level;
    private Screen currentScreen;
    private string password;

    // Start is called before the first frame update
    void Start() {
        ShowMainMenu();        
    }

    // Update is called once per frame
    void Update() {
        
    }

    void OnUserInput(string input) {
        if (input == "menu") {
            ShowMainMenu();
        } else if (input == "quit" || input == "close" || input == "exit") {
            Terminal.WriteLine("If you play on web, just close the tab to quit.");
            Application.Quit();
        } else if (currentScreen == Screen.MainMenu) {
            RunMainMenu(input);
        } else if (currentScreen == Screen.Password) {
            CheckPassword(input);
        }         
    }

    void ShowMainMenu() {
        currentScreen = Screen.MainMenu;
        Terminal.ClearScreen();
        Terminal.WriteLine("What would you like to hack into?\n");
        Terminal.WriteLine("Press 1 for local library");
        Terminal.WriteLine("Press 2 for police station");
        Terminal.WriteLine("Press 3 for NASA\n");
        Terminal.WriteLine("You may type 'menu' at any time to get back here.\n");
        Terminal.WriteLine("Enter your selection:");
    }

    void RunMainMenu(string input) {
        bool isValidLevelNumber = (input == "1" || input == "2" || input == "3");
        if (isValidLevelNumber) {
            level = int.Parse(input);
            AskForPassword();
        } else if (input == "007") {
            Terminal.WriteLine("Please use a valid level, Mr Bond");
        } else {
            Terminal.WriteLine("Please select a valid level");
        }
    }

    void AskForPassword() {
        currentScreen = Screen.Password;
        SetPassword();
        Terminal.ClearScreen();
        Terminal.WriteLine("Enter your password, hint: " + password.Anagram());
    }

    void SetPassword() {
        switch (level) {
            case 1:
                password = level1Passwords[Random.Range(0, level1Passwords.Length)];
                break;
            case 2:
                password = level2Passwords[Random.Range(0, level2Passwords.Length)];
                break;
            case 3:
                password = level3Passwords[Random.Range(0, level3Passwords.Length)];
                break;
            default:
                Debug.LogError("Invalid level number");
                break;
        }
    }

    void CheckPassword(string input) {
        if (input == password) {
            DisplayWinScreen();
        } else {
            AskForPassword();
        }
    }

    void DisplayWinScreen() {
        currentScreen = Screen.Win;
        Terminal.ClearScreen();
        ShowLevelReward();
    }

    void ShowLevelReward() {
        switch (level) {
            case 1:
                Terminal.WriteLine("Have a book...");
                Terminal.WriteLine(@"
    _______
   /      /,
  /      //
 /______//
(______(/
                ");
                break;
            case 2:
                Terminal.WriteLine("Don't get arrested...");
                Terminal.WriteLine(@"
     __  _.-'` `'-.
    /||\'._ __{}_(
    ||||  | '--.__\
    | L.(^_\^
    \ .-' |   _ |
    | |   )\___ /
    |  \-'`:._]
    \__ /;
                ");
                break;
            case 3:
                Terminal.WriteLine(@"
     |     | | Space is the limit!
    / \    | |
   |--o|===|-|
   |---|   |N|
  /U    \  |A|
 | S     | |S|
 | A     |=|A|
 |_______| |_|
  |@| |@|  | |
___________|_|_
                ");
                break;
            default:
                Debug.LogError("Invalid level number");
                break;
        }
    }
}
