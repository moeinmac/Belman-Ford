class Graph {
  private readonly G = new Map();
  private readonly trafficVolume: { light: number; medium: number; heavy: number };
  private readonly predecessors: { [key: string]: string | null };
  public readonly distances: { [key: string]: number };

  constructor(trafficVolume: { light: number; medium: number; heavy: number } = { heavy: 5, light: 1.5, medium: 2 }) {
    this.distances = {};
    this.trafficVolume = trafficVolume;
    this.predecessors = {};
  }
  private justAddVertex(v: string) {
    if (!this.G.has(v)) this.G.set(v, []);
    else throw new Error(`${v} is in Graph already!`);
  }
  public addVertex(v: string | string[]) {
    if (typeof v === "string") this.justAddVertex(v);
    else if (Array.isArray(v)) for (const theV of v) this.justAddVertex(theV);
    else throw new Error("Vertex must be string or Array of string.");
  }
  public addEdge(u: string, v: string, distance: number, traffic: "none" | "light" | "medium" | "heavy" = "none") {
    if (this.G.has(u) && this.G.has(v)) {
      switch (traffic) {
        case "none":
          this.G.get(u).push(`${v}::${distance}`);
          break;
        case "light":
          this.G.get(u).push(`${v}::${distance * this.trafficVolume.light}`);
          break;
        case "medium":
          this.G.get(u).push(`${v}::${distance * this.trafficVolume.medium}`);
          break;
        case "heavy":
          this.G.get(u).push(`${v}::${distance * this.trafficVolume.heavy}`);
          break;
        default:
          throw new Error(' please use one if these values : "none" | "light" | "medium" | "heavy"');
      }
    } else throw new Error(`there is'nt ${v} or ${u} in the Graph`);
  }
  public log() {
    return this.G;
  }
  private initBF(source: string) {
    for (const vertex of this.G.keys()) {
      if (vertex == source) this.distances[vertex] = 0;
      else this.distances[vertex] = Infinity;
    }
    for (const vertex of this.G.keys()) this.predecessors[vertex] = null;
  }
  private relax(u: string, v: string, w: number) {
    if (this.distances[v] > this.distances[u] + w) {
      this.distances[v] = this.distances[u] + w;
      this.predecessors[v] = u;
    }
  }
  public BelmanFord(source: string) {
    this.initBF(source);
    for (const vertex of this.G.entries()) {
      for (const edge of vertex[1]) {
        const splitEdge: [string, number] = edge.split("::");
        this.relax(vertex[0], splitEdge[0], +splitEdge[1]);
      }
    }
  }
  private recursiveFindPath(dist: string, seenPath: string[] = []): string[] {
    if (this.predecessors[dist] === null) return seenPath;
    seenPath.unshift(this.predecessors[dist]);
    return this.recursiveFindPath(this.predecessors[dist], seenPath);
  }
  public findShortestPath(source: string, dist: string) {
    if (this.G.has(source) && this.G.has(dist)) {
      this.BelmanFord(source);
      const thePath = this.recursiveFindPath(dist, []);
      if (thePath.length === 0) throw new Error(`could not go from ${source} to ${dist}`);
      else {
        thePath.push(dist);
        return thePath;
      }
    } else throw new Error(`there is'nt ${source} or ${dist} in the Graph`);
  }
}

const graph1 = new Graph();

graph1.addVertex("S");
graph1.addVertex("A");
graph1.addVertex("B");
graph1.addVertex("C");
graph1.addVertex("Q");
graph1.addVertex("H");
graph1.addVertex("M");
graph1.addVertex("N");
graph1.addVertex("T");
graph1.addVertex("E");
graph1.addVertex("R");
graph1.addVertex("F");
graph1.addVertex(["Y", "W", "K", "P"]);

graph1.addEdge("S", "A", 5, "light");
graph1.addEdge("S", "B", 7, "heavy");
graph1.addEdge("S", "C", 10, "none");

graph1.addEdge("B", "Q", 6, "heavy");

graph1.addEdge("C", "Q", 9, "heavy");
graph1.addEdge("C", "K", 7, "medium");

graph1.addEdge("Q", "B", 6, "medium");
graph1.addEdge("Q", "H", 4, "none");
graph1.addEdge("Q", "C", 9, "light");
graph1.addEdge("Q", "E", 6, "heavy");

graph1.addEdge("H", "Q", 4, "heavy");
graph1.addEdge("H", "M", 4, "heavy");

graph1.addEdge("A", "H", 7, "heavy");
graph1.addEdge("A", "N", 30, "none");

graph1.addEdge("N", "A", 30, "none");
graph1.addEdge("N", "M", 5, "medium");

graph1.addEdge("M", "N", 5, "light");
graph1.addEdge("M", "E", 10, "medium");

graph1.addEdge("E", "Q", 6, "heavy");
graph1.addEdge("E", "M", 10, "light");
graph1.addEdge("E", "T", 10, "light");
graph1.addEdge("E", "R", 5, "none");
graph1.addEdge("E", "F", 11, "light");

graph1.addEdge("R", "E", 5, "light");
graph1.addEdge("R", "F", 30, "none");

graph1.addEdge("T", "F", 11, "light");
graph1.addEdge("T", "M", 8, "none");

graph1.addEdge("F", "R", 30, "none");
graph1.addEdge("F", "T", 11, "none");

graph1.addEdge("Y", "B", 8, "heavy");
graph1.addEdge("Y", "R", 3, "heavy");
graph1.addEdge("Y", "W", 8, "medium");

graph1.addEdge("W", "Y", 8, "medium");

graph1.addEdge("K", "W", 6, "light");
graph1.addEdge("K", "P", 6, "none");

graph1.addEdge("P", "S", 10, "none");

console.log(graph1.log());
console.log(graph1.findShortestPath("S", "F"));
