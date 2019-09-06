const basicMats = ["wood", "metal", "stone", "energy"];
export const matTypes = [1, 2, 3, 4].map(lvl => basicMats.map(t => t + lvl));

export type Point = {
  x: number;
  y: number;
  z: number;
};

function parse(s: string): Point {
  const regex = /^(\d{1,3}) (\d{1,4})\((\d{1,2})\)/;

  const res = s.match(regex);
  if (!res) {
    throw new Error("Invalid point " + s);
  }
  const [, x, y, z] = res;
  return { x: Number(x), y: Number(y), z: Number(z) };
}
function show(p: Point): string {
  return `${Math.round(p.x)} ${Math.round(p.y)}`;
}

export const Point = { parse, show };
