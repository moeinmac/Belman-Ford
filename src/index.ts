interface Graph {
  distances: {
    [key: string]: number;
  };
  predecessors: {
    [key: string]: string | null;
  };
  findShortestPath: string[];
}

class Graph {
  #G = new Map();

  constructor() {
    this.distances = {};
    this.predecessors = {};
    this.findShortestPath = [];
  }
  addVertex(v: string) {
    if (!this.#G.has(v)) this.#G.set(v, []);
    else throw new Error(`${v} is in Graph already!`);
  }
  addEdge(u: string, v: string, distance: number, traffic: "none" | "light" | "medium" | "heavy" = "none") {
    if (this.#G.has(u) && this.#G.has(v)) {
      switch (traffic) {
        case "none":
          this.#G.get(u).push(`${v}::${distance / 1}`);
          break;
        case "light":
          this.#G.get(u).push(`${v}::${distance * 2}`);
          break;
        case "medium":
          this.#G.get(u).push(`${v}::${distance * 5}`);
          break;
        case "heavy":
          this.#G.get(u).push(`${v}::${distance * 10}`);
          break;
        default:
          throw new Error(' please use one if these values : "none" | "light" | "medium" | "heavy"');
      }
    } else throw new Error(`there is'nt ${v} or ${u} in the Graph`);
  }
  log() {
    return this.#G;
  }
  #initBF(source: string) {
    for (const vertex of this.#G.keys()) {
      if (vertex == source) this.distances[vertex] = 0;
      else this.distances[vertex] = Infinity;
    }
    for (const vertex of this.#G.keys()) this.predecessors[vertex] = null;
  }
  #relax(u: string, v: string, w: number) {
    if (this.distances[v] > this.distances[u] + w) {
      this.distances[v] = this.distances[u] + w;
      this.predecessors[v] = u;
    }
  }
  BelmanFord(source: string) {
    this.#initBF(source);
    for (const vertex of this.#G.entries()) {
      for (const edge of vertex[1]) {
        const splitEdge: [string, number] = edge.split("::");
        this.#relax(vertex[0], splitEdge[0], +splitEdge[1]);
      }
    }
  }
}

const graph1 = new Graph();

console.log(graph1);
