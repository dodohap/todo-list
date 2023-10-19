type alertType =
  | { type: "succes" | "off"; message: string }
  | { type: "error"; message: string }
  | { type: "off"; message: string };
