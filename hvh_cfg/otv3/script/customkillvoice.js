UI.AddLabel("==Custom Kill Voice==");
UI.AddCheckbox("Enable Custom Kill Voice");
UI.AddCheckbox("Loopback");
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
    Global.ExecuteCommand("voice_inputfromfile 1");
    if (GetScriptOption("Loopback"))
    {
        Global.ExecuteCommand("voice_loopback 1");
    }
    Global.ExecuteCommand("-voicerecord");
    Global.ExecuteCommand("+voicerecord");
}

function Reset()
{
    if (playing && Math.abs(started + GetScriptOption("Sound Length") - Global.Realtime()) < 0.05)
    {
        playing = false;
        Global.ExecuteCommand("-voicerecord");
        Global.ExecuteCommand("voice_inputfromfile 0");
        Global.ExecuteCommand("voice_loopback 0");
    }
}

Global.RegisterCallback("player_death", "PlayVoice");
Global.RegisterCallback("FrameStageNotify", "Reset");