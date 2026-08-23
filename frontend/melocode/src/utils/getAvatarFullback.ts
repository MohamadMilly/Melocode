export function getAvatarFullBack(name: string): string {
  return name
    .split(" ")
    .map((a) => a.at(0))
    .join("")
    .toUpperCase();
}
