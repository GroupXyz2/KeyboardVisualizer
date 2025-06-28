Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

strCurrentDir = objFSO.GetParentFolderName(WScript.ScriptFullName)

objShell.CurrentDirectory = strCurrentDir
objShell.Run "npm start", 0, False

WScript.Quit
