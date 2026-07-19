// Room layout and camera positions
export const ROOMS = {
  stage: { name: "Show Stage", x: 50, y: 15 },
  diningArea: { name: "Dining Area", x: 50, y: 35 },
  pirateCove: { name: "Pirate Cove", x: 20, y: 30 },
  backstage: { name: "Backstage", x: 80, y: 20 },
  kitchen: { name: "Kitchen", x: 80, y: 45 },
  westHall: { name: "West Hall", x: 25, y: 55 },
  eastHall: { name: "East Hall", x: 75, y: 55 },
  westCorner: { name: "West Hall Corner", x: 25, y: 75 },
  eastCorner: { name: "East Hall Corner", x: 75, y: 75 },
  office: { name: "Office", x: 50, y: 90 },
};

// Animatronic images
export const ANIMATRONIC_IMAGES = {
  freddy: "https://media.base44.com/images/public/6a53e7b75bdbba7e4ad96770/a9e4e0edc_generated_image.png",
  bonnie: "https://media.base44.com/images/public/6a53e7b75bdbba7e4ad96770/3e58e7d19_generated_image.png",
  chica: "https://media.base44.com/images/public/6a53e7b75bdbba7e4ad96770/3d34e64d2_generated_image.png",
  foxy: "https://media.base44.com/images/public/6a53e7b75bdbba7e4ad96770/65a04a348_generated_image.png",
};

export const OFFICE_IMAGE = "https://media.base44.com/images/public/6a53e7b75bdbba7e4ad96770/1f647085c_generated_image.png";

// Movement paths for each animatronic
export const MOVEMENT_PATHS = {
  freddy: ["stage", "diningArea", "backstage", "kitchen", "eastHall", "eastCorner", "office"],
  bonnie: ["stage", "diningArea", "backstage", "westHall", "westCorner", "office"],
  chica: ["stage", "diningArea", "kitchen", "eastHall", "eastCorner", "office"],
  foxy: ["pirateCove", "westHall", "westCorner", "office"],
};

// AI difficulty per night (0-20 scale)
export const NIGHT_DIFFICULTY = {
  1: { freddy: 0, bonnie: 3, chica: 3, foxy: 1 },
  2: { freddy: 1, bonnie: 5, chica: 5, foxy: 2 },
  3: { freddy: 3, bonnie: 7, chica: 7, foxy: 4 },
  4: { freddy: 5, bonnie: 10, chica: 10, foxy: 6 },
  5: { freddy: 10, bonnie: 12, chica: 12, foxy: 8 },
};

// Power drain rates
export const POWER_DRAIN = {
  base: 0.1,         // per second, always on
  camera: 0.15,      // additional when camera is open
  leftDoor: 0.15,    // additional per closed door
  rightDoor: 0.15,
  leftLight: 0.1,    // additional per light
  rightLight: 0.1,
};

// Time settings
export const HOUR_DURATION = 60; // seconds per in-game hour
export const TOTAL_HOURS = 6; // 12AM to 6AM
