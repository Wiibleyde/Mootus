import { atom } from "jotai";
import { GameState } from "./types";

export const atomWord = atom<string>('');
export const atomAttempts = atom<Array<string>>([]);
export const atomResults = atom<string[]>([]);
export const atomGameState = atom<GameState>(GameState.Playing);