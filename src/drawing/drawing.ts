export function generatePolygon(
  n: number
): { vertices: number[]; indices: number[] } {
  let indices = [];
  let vertices = [0, 0, 0];

  let step = (2 * Math.PI) / n;
  for (let i = 0; i <= n; i++) {
    const x = Math.cos(step * i) / 2;
    const y = Math.sin(step * i) / 2;

    vertices.push(...[x, y, 0]);

    // if (i < n - 2) indices.push(...[0, i + 1, i + 2]);
    if (i < n) indices.push(...[0, i + 1, i + 2]);
  }

  return { vertices, indices };
}
