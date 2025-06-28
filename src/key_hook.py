import socketio
import time
from pynput import keyboard
import json

sio = socketio.Client()

@sio.event
def connect():
    print("Connected to the Electron-Server")

@sio.event
def disconnect():
    print("Connection to Electron-Server cut")

KEY_MAP = {
    keyboard.Key.alt: "Alt",
    keyboard.Key.alt_l: "Alt",
    keyboard.Key.alt_r: "AltGraph",
    keyboard.Key.alt_gr: "AltGraph",
    keyboard.Key.backspace: "Backspace",
    keyboard.Key.caps_lock: "CapsLock",
    keyboard.Key.cmd: "Meta",
    keyboard.Key.cmd_l: "Meta",
    keyboard.Key.cmd_r: "Meta",
    keyboard.Key.ctrl: "Control",
    keyboard.Key.ctrl_l: "Control",
    keyboard.Key.ctrl_r: "Control",
    keyboard.Key.delete: "Delete",
    keyboard.Key.down: "ArrowDown",
    keyboard.Key.end: "End",
    keyboard.Key.enter: "Enter",
    keyboard.Key.esc: "Escape",
    keyboard.Key.f1: "F1",
    keyboard.Key.f2: "F2",
    keyboard.Key.f3: "F3",
    keyboard.Key.f4: "F4",
    keyboard.Key.f5: "F5",
    keyboard.Key.f6: "F6",
    keyboard.Key.f7: "F7",
    keyboard.Key.f8: "F8",
    keyboard.Key.f9: "F9",
    keyboard.Key.f10: "F10",
    keyboard.Key.f11: "F11",
    keyboard.Key.f12: "F12",
    keyboard.Key.home: "Home",
    keyboard.Key.left: "ArrowLeft",
    keyboard.Key.menu: "ContextMenu",
    keyboard.Key.page_down: "PageDown",
    keyboard.Key.page_up: "PageUp",
    keyboard.Key.right: "ArrowRight",
    keyboard.Key.shift: "Shift",
    keyboard.Key.shift_l: "Shift",
    keyboard.Key.shift_r: "Shift",
    keyboard.Key.space: "Space",
    keyboard.Key.tab: "Tab",
    keyboard.Key.up: "ArrowUp"
}

CODE_MAP = {
    keyboard.Key.alt: "AltLeft",
    keyboard.Key.alt_l: "AltLeft",
    keyboard.Key.alt_r: "AltRight",
    keyboard.Key.alt_gr: "AltRight",
    keyboard.Key.backspace: "Backspace",
    keyboard.Key.caps_lock: "CapsLock",
    keyboard.Key.cmd: "MetaLeft",
    keyboard.Key.cmd_l: "MetaLeft",
    keyboard.Key.cmd_r: "MetaRight",
    keyboard.Key.ctrl: "ControlLeft",
    keyboard.Key.ctrl_l: "ControlLeft",
    keyboard.Key.ctrl_r: "ControlRight",
    keyboard.Key.delete: "Delete",
    keyboard.Key.down: "ArrowDown",
    keyboard.Key.end: "End",
    keyboard.Key.enter: "Enter",
    keyboard.Key.esc: "Escape",
    keyboard.Key.f1: "F1",
    keyboard.Key.f2: "F2",
    keyboard.Key.f3: "F3",
    keyboard.Key.f4: "F4",
    keyboard.Key.f5: "F5",
    keyboard.Key.f6: "F6",
    keyboard.Key.f7: "F7",
    keyboard.Key.f8: "F8",
    keyboard.Key.f9: "F9",
    keyboard.Key.f10: "F10",
    keyboard.Key.f11: "F11",
    keyboard.Key.f12: "F12",
    keyboard.Key.home: "Home",
    keyboard.Key.left: "ArrowLeft",
    keyboard.Key.menu: "ContextMenu",
    keyboard.Key.page_down: "PageDown",
    keyboard.Key.page_up: "PageUp",
    keyboard.Key.right: "ArrowRight",
    keyboard.Key.shift: "Shift",
    keyboard.Key.shift_l: "ShiftLeft",
    keyboard.Key.shift_r: "ShiftRight",
    keyboard.Key.space: "Space",
    keyboard.Key.tab: "Tab",
    keyboard.Key.up: "ArrowUp"
}

def get_key_data(key):
    try:
        char = key.char
        key_name = char
        
        if char.isalpha():
            code = f"Key{char.upper()}"
        elif char.isdigit():
            code = f"Digit{char}"
        else:
            special_chars = {
                '^': 'Backquote',
                '#': 'Backslash',
                '+': 'BracketRight',
                'ü': 'BracketLeft',
                'ö': 'Semicolon',
                'ä': 'Quote',
                ',': 'Comma',
                '.': 'Period',
                '-': 'Slash',
                '<': 'IntlBackslash',
                'ß': 'Minus',
                '´': 'Equal'
            }
            code = special_chars.get(char, f"Key{char.upper()}" if char.isalpha() else "Unidentified")
    
    except AttributeError:
        key_name = KEY_MAP.get(key, str(key))
        code = CODE_MAP.get(key, "Unidentified")
    
    return {
        "key": key_name,
        "code": code
    }

def on_press(key):
    try:
        key_data = get_key_data(key)
        sio.emit('keydown', key_data)
    except Exception as e:
        print(f"Error while sending keydown-Events: {e}")

def on_release(key):
    try:
        key_data = get_key_data(key)
        sio.emit('keyup', key_data)
    except Exception as e:
        print(f"Error while sending keyup-Events: {e}")



def main():
    try:
        sio.connect('http://localhost:8734')
        
        print("Keyboard-Hook started.")
        
        with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
            listener.join()
            
    except Exception as e:
        print(f"Fehler: {e}")
    finally:
        if sio.connected:
            sio.disconnect()

if __name__ == "__main__":
    main()
