import { useRef } from "react";
import { AudioContextOrNull } from "../theory";

export function getAudioContext(): AudioContextOrNull {
  return window.AudioContext || window.webkitAudioContext || null;
}

export function useAudioContext(): AudioContextOrNull {
  const AudioCtx = useRef(getAudioContext());
  return AudioCtx.current;
}
