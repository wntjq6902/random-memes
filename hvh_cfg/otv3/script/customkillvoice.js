UI.AddLabel("==Custom Kill Voice==");
UI.AddCheckbox("Enable Custom Kill Voice");
UI.AddCheckbox("Loopback");
UI.AddTextbox("Sound Name");
UI.AddSliderFloat("Sound Length", 0.0, 10.0);
UI.AddLabel("====================");

var playing = false;
var started = 0.0

function GetScriptOption(Name)
{
    var Value = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", Name);
    return Value;
}

function PlayVoice()
{
    if (!GetScriptOption("Enable Custom Kill Voice")) return;
    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) !== Entity.GetLocalPlayer()) return;
    if (Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer()) return;

    started = Global.Realtime();
    playing = true;
    if (GetScriptOption("Loopback"))
    {
        Global.ExecuteCommand("voice_loopback 1");
    }
    Sound.PlayMicrophone('C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\' + UI.GetString("Misc", "JAVASCRIPT", "Script Items", "Sound Name"));
}

function Reset()
{
    if (playing && Math.abs(started + GetScriptOption("Sound Length") - Global.Realtime()) < 0.05)
    {
        playing = false;
        Sound.StopMicrophone();
        Global.ExecuteCommand("voice_loopback 0");
    }
}

Global.RegisterCallback("player_death", "PlayVoice");
Global.RegisterCallback("FrameStageNotify", "Reset");