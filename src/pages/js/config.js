// This file handles the key mappings

export const configString = () => {
  const keyMappings = defaultKeyMappings();
  let configString = "";

  const eepData = null;
  const sraData = null;
  const flaData = null;

  //gamepad
  configString += keyMappings.Joy_Mapping_Up +
    "\r\n";
  configString += keyMappings.Joy_Mapping_Down +
    "\r\n";
  configString += keyMappings.Joy_Mapping_Left +
    "\r\n";
  configString += keyMappings.Joy_Mapping_Right +
    "\r\n";
  configString += keyMappings.Joy_Mapping_Action_A +
    "\r\n";
  configString += keyMappings.Joy_Mapping_Action_B +
    "\r\n";
  configString += keyMappings
    .Joy_Mapping_Action_Start + "\r\n";
  configString += keyMappings.Joy_Mapping_Action_Z +
    "\r\n";
  configString += keyMappings.Joy_Mapping_Action_L +
    "\r\n";
  configString += keyMappings.Joy_Mapping_Action_R +
    "\r\n";
  configString += keyMappings.Joy_Mapping_Menu +
    "\r\n";
  configString += keyMappings
    .Joy_Mapping_Action_CLEFT + "\r\n";
  configString += keyMappings
    .Joy_Mapping_Action_CRIGHT + "\r\n";
  configString += keyMappings.Joy_Mapping_Action_CUP +
    "\r\n";
  configString += keyMappings
    .Joy_Mapping_Action_CDOWN + "\r\n";

  //keyboard
  configString += keyMappings.Mapping_Left +
    "\r\n";
  configString += keyMappings.Mapping_Right +
    "\r\n";
  configString += keyMappings.Mapping_Up +
    "\r\n";
  configString += keyMappings.Mapping_Down +
    "\r\n";
  configString += keyMappings.Mapping_Action_Start +
    "\r\n";
  configString += keyMappings.Mapping_Action_CUP +
    "\r\n";
  configString += keyMappings.Mapping_Action_CDOWN +
    "\r\n";
  configString += keyMappings.Mapping_Action_CLEFT +
    "\r\n";
  configString += keyMappings.Mapping_Action_CRIGHT +
    "\r\n";
  configString += keyMappings.Mapping_Action_Z +
    "\r\n";
  configString += keyMappings.Mapping_Action_L +
    "\r\n";
  configString += keyMappings.Mapping_Action_R +
    "\r\n";
  configString += keyMappings.Mapping_Action_B +
    "\r\n";
  configString += keyMappings.Mapping_Action_A +
    "\r\n";
  configString += keyMappings.Mapping_Menu +
    "\r\n";
  configString += keyMappings
    .Mapping_Action_Analog_Up + "\r\n";
  configString += keyMappings
    .Mapping_Action_Analog_Down + "\r\n";
  configString += keyMappings
    .Mapping_Action_Analog_Left + "\r\n";
  configString += keyMappings
    .Mapping_Action_Analog_Right + "\r\n";

  //load save files
  if (eepData == null) configString += "0" + "\r\n";
  else configString += "1" + "\r\n";
  if (sraData == null) configString += "0" + "\r\n";
  else configString += "1" + "\r\n";
  if (flaData == null) configString += "0" + "\r\n";
  else configString += "1" + "\r\n";

  //show FPS
  if (true) configString += "1" + "\r\n";
  else configString += "0" + "\r\n";

  //swap sticks
  if (false) configString += "1" + "\r\n";
  else configString += "0" + "\r\n";

  //disable audio sync
  if (true) configString += "1" + "\r\n";
  else configString += "0" + "\r\n";

  //invert player Y axis
  if (false) configString += "1" + "\r\n";
  else configString += "0" + "\r\n";
  if (false) configString += "1" + "\r\n";
  else configString += "0" + "\r\n";
  if (false) configString += "1" + "\r\n";
  else configString += "0" + "\r\n";

  //mobile mode
  if (false) configString += "1" + "\r\n";
  else configString += "0" + "\r\n";

  //angrylion software renderer
  if (false) configString += "1" + "\r\n";
  else configString += "0" + "\r\n";

  //mouse mode
  if (false) configString += "1" + "\r\n";
  else configString += "0" + "\r\n";

  //use vbo (ios mode)
  if (false) configString += "1" + "\r\n";
  else configString += "0" + "\r\n";

  return configString;
};

function defaultKeyMappings() {
  return {
    Mapping_Left: "b",
    Mapping_Right: "n",
    Mapping_Up: "y",
    Mapping_Down: "h",
    Mapping_Action_A: "d",
    Mapping_Action_B: "s",
    Mapping_Action_Start: "Enter",
    Mapping_Action_CUP: "i",
    Mapping_Action_CDOWN: "k",
    Mapping_Action_CLEFT: "j",
    Mapping_Action_CRIGHT: "l",
    Mapping_Action_Analog_Up: "ArrowUp",
    Mapping_Action_Analog_Down: "ArrowDown",
    Mapping_Action_Analog_Left: "ArrowLeft",
    Mapping_Action_Analog_Right: "ArrowRight",
    Mapping_Action_Z: "a",
    Mapping_Action_L: "q",
    Mapping_Action_R: "e",
    Mapping_Menu: "`",
    Joy_Mapping_Left: 14,
    Joy_Mapping_Right: 15,
    Joy_Mapping_Down: 13,
    Joy_Mapping_Up: 12,
    Joy_Mapping_Action_A: 0,
    Joy_Mapping_Action_B: 2,
    Joy_Mapping_Action_Start: 9,
    Joy_Mapping_Action_Z: 4,
    Joy_Mapping_Action_L: 6,
    Joy_Mapping_Action_R: 5,
    Joy_Mapping_Menu: 11,
    Joy_Mapping_Action_CLEFT: -1,
    Joy_Mapping_Action_CRIGHT: -1,
    Joy_Mapping_Action_CUP: -1,
    Joy_Mapping_Action_CDOWN: -1,
  };
}
