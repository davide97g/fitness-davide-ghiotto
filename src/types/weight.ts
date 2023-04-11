export type WorkoutBodyPart = "Chest" | "Back" | "Legs" | "Arms" | "Shoulders";

export interface WeightType {
  key: string;
  date: string;
  weight: number;
  workoutTags: WorkoutBodyPart[];
}
