# Bellman-Ford Shortest Path with Traffic Consideration

This project implements a modified version of the **Bellman-Ford algorithm** to find the shortest path between two points in a graph, where each edge may include an additional attribute: **traffic level**.

## 🚦 Key Features

- Computes the shortest path using the Bellman-Ford algorithm.
- Takes **traffic conditions** into account for each edge.
- Dynamic edge weights: if an edge has traffic, its weight is **multiplied** by a traffic factor.

## 🛣️ Traffic Levels

Each edge in the graph can be associated with one of the following traffic conditions:

| Traffic Level | Multiplier | Description             |
|---------------|------------|-------------------------|
| None          | 1.0        | No traffic              |
| Light         | 1.5        | Light traffic           |
| Medium        | 2.0        | Moderate traffic        |
| Heavy         | 5.0        | Heavy congestion        |

> For example, if an edge has a base weight of 10 and a traffic level of Medium, the actual weight used in the algorithm will be: `10 × 2 = 20`.

and of course you can change those values.

## 📦 Project Structure


```bash
├── app
│   ├── src
│      ├── index.ts
├── node_modules
├── README.md
├── package.json
├── package-lock.json
├── nodemon.json
├── tsconfig.json
└── .gitignore
```


## 🧠 How It Works

1. The graph is defined with nodes and directed edges.
2. Each edge has:
   - A base weight (distance or time)
   - An optional traffic level
3. Before running the Bellman-Ford algorithm, the weight of each edge is adjusted according to its traffic multiplier.
4. The algorithm finds the shortest path from the source node to the destination node based on adjusted weights.

## 🚀 Getting Started

   ```bash
   git clone [https://github.com/your-username/your-repo-name](https://github.com/moeinmac/Belman-Ford).git
   cd Belamn-Ford
   npm i
   npm run dev
   ```

## 📌 Dependencies
Node v22+

No external libraries required (pure JavaScript implementation)

## 📄 License
This project is open-source and available under the MIT License.

## 🙋‍♂️ Contributions
Feel free to open issues or submit pull requests if you find bugs or want to improve the project!

