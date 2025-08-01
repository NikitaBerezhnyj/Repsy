import { create } from "zustand";

type Program = {
  id: number;
  name: string;
  created_at: string;
};

type Exercise = {
  id: number;
  name: string;
  category: string;
  description?: string;
};

type Session = {
  id: number;
  program_id: number;
  start_time: string;
  end_time?: string;
  feeling?: "Погано" | "Нормально" | "Круто";
  comment?: string;
  completed: boolean;
};

type AppState = {
  programs: Program[];
  exercises: Exercise[];
  sessions: Session[];

  setPrograms: (programs: Program[]) => void;
  addProgram: (program: Program) => void;

  setExercises: (exercises: Exercise[]) => void;
  addExercise: (exercise: Exercise) => void;

  setSessions: (sessions: Session[]) => void;
  addSession: (session: Session) => void;
};

export const useAppStore = create<AppState>((set) => ({
  programs: [],
  exercises: [],
  sessions: [],

  setPrograms: (programs: Program[]) => set({ programs }),
  addProgram: (program: Program) =>
    set((state: AppState) => ({ programs: [...state.programs, program] })),

  setExercises: (exercises: Exercise[]) => set({ exercises }),
  addExercise: (exercise: Exercise) =>
    set((state: AppState) => ({ exercises: [...state.exercises, exercise] })),

  setSessions: (sessions: Session[]) => set({ sessions }),
  addSession: (session: Session) =>
    set((state: AppState) => ({ sessions: [...state.sessions, session] }))
}));
