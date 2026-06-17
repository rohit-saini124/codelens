type Topic = {
    tagName: string;
    problemsSolved: number;
  };
  
  type Profile = {
    solved: number;
    easy: number;
    medium: number;
    hard: number;
  
    topics: {
      fundamental: Topic[];
      intermediate: Topic[];
      advanced: Topic[];
    };
  
    contest: {
      rating: number;
      attended: number;
      globalRanking: number;
      topPercentage: number;
    } | null;
  };
  
  export type InterviewAssessment = {
    overallScore: number;
  
    problemSolvingScore: number;
    difficultyExposureScore: number;
    coreTopicScore: number;
    advancedExposureScore: number;
    contestScore: number;
  
    strengths: string[];
    weaknesses: string[];
  
    verdict: string;
  };

  const CORE_TOPICS = [
    "Array",
  "String",
  "Hash Table",
  "Binary Search",
  "Tree",
  "Graph",
  "Dynamic Programming",
  "Greedy",
  "Heap",
  "Backtracking",
  ];
  
  export function assessInterviewReadiness(
    profile: Profile
  ): InterviewAssessment {
    const allTopics = [
        ...profile.topics.fundamental,
        ...profile.topics.intermediate,
        ...profile.topics.advanced,
      ];


      const problemSolvingScore = Math.min(
        (profile.solved / 500) * 25,
        25
      );

      const difficultyExposureScore = Math.min(
        (
          (
            profile.medium +
            profile.hard * 3
          ) / 200
        ) * 20,
        20
      );

      const coreTopicRawScore =
  CORE_TOPICS.reduce(
    (score, topicName) => {
      const topic = allTopics.find(
        (t) => t.tagName === topicName
      );

      const solved =
        topic?.problemsSolved ?? 0;

      return score + Math.min(solved, 20);
    },
    0
  );

const coreTopicScore =
  (coreTopicRawScore / 200) * 25;

        const advancedExposureScore = Math.min(
            (profile.topics.advanced.length / 10) * 15,
            15
          );


          const contestScore = profile.contest
          ? Math.min(
              (profile.contest.rating / 2000) * 5,
              5
            )
          : 0;

          const overallScore = Math.round(
            problemSolvingScore +
              difficultyExposureScore +
              coreTopicScore +
              advancedExposureScore +
              contestScore
          );


          const strengths: string[] = [];


          if (profile.solved >= 300) {
            strengths.push(
              "Strong problem-solving volume"
            );
          }
        
          if (coreTopicScore >= 18) {
            strengths.push(
              "Good coverage of interview-critical topics"
            );
          }
        
          if (profile.hard >= 25) {
            strengths.push(
              "Meaningful hard-problem exposure"
            );
          }
        
          if (profile.contest?.rating &&
              profile.contest.rating >= 1600) {
            strengths.push(
              "Competitive problem-solving ability"
            );
          }

          const weaknesses: string[] = [];
          

          const graphTopic = allTopics.find(
            (t) => t.tagName === "Graph"
          );
          
          const dpTopic = allTopics.find(
            (t) => t.tagName === "Dynamic Programming"
          );
          
          if ((graphTopic?.problemsSolved ?? 0) < 5) {
            weaknesses.push(
              "Graph exposure remains below expected interview-preparation levels."
            );
          }
          
          if ((dpTopic?.problemsSolved ?? 0) < 5) {
            weaknesses.push(
              "Dynamic Programming coverage is currently limited."
            );
          }
          
          if (
            profile.hard > 0 &&
            profile.hard / profile.solved < 0.05
          ) {
            weaknesses.push(
              "Hard-problem exposure is relatively low compared to overall solving volume."
            );
          }

          let verdict =
          "Early-stage interview preparation profile.";
          if (overallScore >= 40) {
            verdict =
              "Developing interview readiness with a growing DSA foundation.";
          }
        
          if (overallScore >= 60) {
            verdict =
              "Strong DSA foundation with meaningful interview preparation progress.";
          }
        
          if (overallScore >= 80) {
            verdict =
              "Broad interview readiness across core DSA domains.";
          }
        
          if (overallScore >= 95) {
            verdict =
              "Elite profile demonstrating extensive DSA mastery.";
          }

          if (weaknesses.length === 0) {
            weaknesses.push(
              "No significant weaknesses detected from available profile data."
            );
          }

          if (strengths.length === 0) {
            const sortedTopics = [...allTopics].sort(
              (a, b) => b.problemsSolved - a.problemsSolved
            );
          
            if (sortedTopics[0]) {
              strengths.push(
                `${sortedTopics[0].tagName} is currently your strongest topic area.`
              );
            }
          
            if (sortedTopics[1]) {
              strengths.push(
                `${sortedTopics[1].tagName} shows meaningful problem-solving exposure.`
              );
            }
          
            if (profile.medium > profile.easy * 0.3) {
              strengths.push(
                "Medium-level problem exposure indicates progression beyond basic practice."
              );
            }
          }

          return {
            overallScore,
        
            problemSolvingScore:
              Math.round(problemSolvingScore),
        
              difficultyExposureScore:
              Math.round(difficultyExposureScore),
        
            coreTopicScore:
              Math.round(coreTopicScore),
        
            advancedExposureScore:
              Math.round(advancedExposureScore),
        
            contestScore:
              Math.round(contestScore),
        
            strengths,
            weaknesses,
        
            verdict,

          
          };
        }