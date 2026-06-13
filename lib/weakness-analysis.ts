type Topic = {
    tagName: string;
    tagSlug?: string;
    problemsSolved: number;
  };
  
  type WeaknessAnalysis = {
    strongTopics: Topic[];
    weakTopics: Topic[];
    recommendedTopics: Topic[];
  };
  
  const TOPIC_IMPORTANCE: Record<string, number> = {
    Array: 8,
    "Hash Table": 8,
    String: 7,
    "Two Pointers": 7,
  
    Tree: 9,
    "Binary Tree": 9,
    BST: 9,
  
    Graph: 10,
    "Depth-First Search": 9,
    "Breadth-First Search": 9,
  
    Heap: 8,
    Queue: 6,
    Stack: 6,
  
    Greedy: 8,
    Backtracking: 8,
  
    "Dynamic Programming": 10,
  
    Trie: 8,
    "Binary Search": 8,
  
    UnionFind: 8,
  };
  
  export function analyzeWeaknesses(
    topics: {
      fundamental: Topic[];
      intermediate: Topic[];
      advanced: Topic[];
    }
  ): WeaknessAnalysis {
    const allTopics = [
      ...topics.fundamental,
      ...topics.intermediate,
      ...topics.advanced,
    ];
  
    const sortedBySolved = [...allTopics].sort(
      (a, b) => b.problemsSolved - a.problemsSolved
    );
  
    const strongTopics = sortedBySolved.slice(0, 3);
  
    const weakTopics = [...allTopics]
  .filter(
    (topic) =>
      (TOPIC_IMPORTANCE[topic.tagName] ?? 0) >= 8 &&
      topic.problemsSolved <= 5
  )
  .sort((a, b) => a.problemsSolved - b.problemsSolved)
  .slice(0, 5);
  
  const recommendedTopics = [...allTopics]
  .filter(
    (topic) =>
      (TOPIC_IMPORTANCE[topic.tagName] ?? 0) >= 8
  )
  .map((topic) => {
    const importance =
      TOPIC_IMPORTANCE[topic.tagName] ?? 5;

    return {
      ...topic,
      score:
        importance /
        (topic.problemsSolved + 1),
    };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);
  
    return {
      strongTopics,
      weakTopics,
      recommendedTopics,
    };
  }