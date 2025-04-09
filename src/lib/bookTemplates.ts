
// Book templates for different categories
export interface BookTemplate {
  id: string;
  title: string;
  type: string;
  category: string; 
  description: string;
  structure: {
    title: string;
    description: string;
  }[];
  coverSuggestion?: string;
}

// Children's Story Templates
export const childrensBookTemplates: BookTemplate[] = [
  {
    id: "template_childrens_adventure",
    title: "Children's Adventure Journey",
    type: "Children's Story",
    category: "Adventure",
    description: "A template for children's adventure stories where a young protagonist embarks on an exciting journey filled with challenges and discoveries.",
    structure: [
      { title: "Introduction", description: "Introduce the main character and their ordinary world" },
      { title: "The Call to Adventure", description: "Something happens that pushes the protagonist into an adventure" },
      { title: "Meeting Friends", description: "The protagonist meets helpful companions along the way" },
      { title: "First Challenge", description: "The first obstacle the protagonist must overcome" },
      { title: "Learning a Lesson", description: "The protagonist learns something important" },
      { title: "Big Challenge", description: "The main challenge or conflict of the story" },
      { title: "Resolution", description: "How the protagonist solves the problem" },
      { title: "Return Home", description: "The protagonist returns home changed from the adventure" },
      { title: "Happy Ending", description: "A satisfying conclusion with the lesson learned" }
    ],
    coverSuggestion: "A colorful illustration of the protagonist standing at the beginning of a path with adventure elements visible in the distance"
  },
  {
    id: "template_childrens_bedtime",
    title: "Magical Bedtime Story",
    type: "Children's Story",
    category: "Bedtime Stories",
    description: "A gentle, magical story perfect for bedtime reading with soothing themes and a calming conclusion.",
    structure: [
      { title: "Evening Setting", description: "Establish a peaceful evening setting" },
      { title: "Main Character", description: "Introduce a child or animal character preparing for bedtime" },
      { title: "Magical Element", description: "Something magical enters the story (dream, creature, etc.)" },
      { title: "Gentle Adventure", description: "A small, calm adventure unfolds" },
      { title: "Friendly Characters", description: "Meeting kind and helpful characters" },
      { title: "Small Problem", description: "A minor problem that needs solving" },
      { title: "Peaceful Resolution", description: "The problem is gently resolved" },
      { title: "Return to Bed", description: "Characters return to rest" },
      { title: "Goodnight", description: "A soothing goodnight conclusion" }
    ],
    coverSuggestion: "A starry night scene with a sleepy character in bed with a gentle glow of magic nearby"
  },
  {
    id: "template_childrens_educational",
    title: "Learn with Fun",
    type: "Children's Story",
    category: "Educational",
    description: "An educational story that teaches children important concepts or facts in an entertaining and engaging way.",
    structure: [
      { title: "Curious Character", description: "Introduce a character who is curious about something" },
      { title: "Question Posed", description: "The character wonders about a concept or fact" },
      { title: "Meet the Guide", description: "Introduction of a character who can explain things" },
      { title: "First Lesson", description: "Beginning to learn about the topic" },
      { title: "Fun Example", description: "An entertaining example of the concept" },
      { title: "Interactive Challenge", description: "A problem to solve using the new knowledge" },
      { title: "Solution and Reward", description: "Successfully applying the knowledge" },
      { title: "Review and Celebrate", description: "Reviewing what was learned" },
      { title: "Future Curiosity", description: "Setting up curiosity for more learning" }
    ],
    coverSuggestion: "A bright, colorful cover with the main character and educational elements related to the topic"
  }
];

// Novel Templates
export const novelTemplates: BookTemplate[] = [
  {
    id: "template_novel_contemporary",
    title: "Modern Life Journey",
    type: "Novel",
    category: "Contemporary",
    description: "A contemporary novel exploring modern life challenges, relationships, and personal growth in today's society.",
    structure: [
      { title: "Ordinary World", description: "Establish the protagonist's normal life and routine" },
      { title: "Inciting Incident", description: "An event that disrupts the protagonist's normal life" },
      { title: "Reaction", description: "How the protagonist initially reacts to the change" },
      { title: "New Direction", description: "The protagonist decides to take action" },
      { title: "Relationships", description: "Development of key relationships in the story" },
      { title: "Midpoint Shift", description: "A significant change in perspective or goals" },
      { title: "Complications", description: "Things get more difficult for the protagonist" },
      { title: "Darkest Moment", description: "The lowest point for the protagonist" },
      { title: "Resolution Attempt", description: "The protagonist tries to resolve the main conflict" },
      { title: "Climax", description: "The final confrontation or decision" },
      { title: "New Normal", description: "The protagonist's life after the events of the story" }
    ]
  },
  {
    id: "template_novel_romance",
    title: "Love's Journey",
    type: "Novel",
    category: "Romance",
    description: "A romance novel template focusing on the development of a romantic relationship, with challenges, personal growth, and emotional connection.",
    structure: [
      { title: "Meet Cute", description: "The first encounter between the main romantic interests" },
      { title: "Attraction", description: "Initial attraction and interest develops" },
      { title: "Getting to Know You", description: "The characters learn more about each other" },
      { title: "First Connection", description: "A meaningful moment of connection" },
      { title: "External Challenge", description: "An external problem affects the relationship" },
      { title: "Internal Doubts", description: "Characters face their own fears and doubts" },
      { title: "Deepening Relationship", description: "The relationship grows despite challenges" },
      { title: "Conflict", description: "A major conflict threatens the relationship" },
      { title: "Separation", description: "The characters are separated physically or emotionally" },
      { title: "Realization", description: "Characters realize what they truly want" },
      { title: "Reconciliation", description: "The path to resolving differences" },
      { title: "Happy Ever After", description: "The romantic resolution" }
    ]
  },
  {
    id: "template_novel_thriller",
    title: "Edge of Your Seat",
    type: "Novel",
    category: "Mystery",
    description: "A thriller template with suspense, danger, and unexpected twists that keep readers engaged and guessing.",
    structure: [
      { title: "Normal Life", description: "Establish the protagonist's life before the thriller begins" },
      { title: "Inciting Incident", description: "The event that launches the thriller plot" },
      { title: "First Clue", description: "Discovery of the first important clue or information" },
      { title: "Increasing Danger", description: "The stakes and danger begin to rise" },
      { title: "Investigation", description: "The protagonist investigates the central mystery" },
      { title: "False Lead", description: "A misleading clue or direction" },
      { title: "Personal Stake", description: "Why this matters personally to the protagonist" },
      { title: "Major Setback", description: "A significant obstacle or reversal" },
      { title: "New Information", description: "Critical new information is discovered" },
      { title: "Preparation", description: "Preparing for the final confrontation" },
      { title: "Climactic Sequence", description: "The final high-tension sequence" },
      { title: "Resolution", description: "Tying up the threads of the thriller" }
    ]
  }
];

// Fantasy Templates
export const fantasyTemplates: BookTemplate[] = [
  {
    id: "template_fantasy_epic",
    title: "Epic Fantasy Quest",
    type: "Fantasy",
    category: "High Fantasy",
    description: "An epic fantasy adventure in a fully realized world with magic, diverse characters, and a quest of great importance.",
    structure: [
      { title: "The Ordinary World", description: "Introduce the protagonist and their normal life" },
      { title: "The Call to Adventure", description: "The event that starts the fantasy quest" },
      { title: "Refusal of the Call", description: "Initial reluctance to accept the quest" },
      { title: "Meeting the Mentor", description: "Encountering someone who provides guidance" },
      { title: "Crossing the Threshold", description: "Leaving the familiar world behind" },
      { title: "Tests, Allies, Enemies", description: "Early challenges and meeting important characters" },
      { title: "Approach to the Inner Cave", description: "Preparing for a major challenge" },
      { title: "The Ordeal", description: "The greatest challenge yet faced" },
      { title: "Reward", description: "Achieving something important after the ordeal" },
      { title: "The Road Back", description: "Beginning the journey home" },
      { title: "Resurrection", description: "The final and most dangerous confrontation" },
      { title: "Return with the Elixir", description: "Returning changed, with something of value" }
    ]
  },
  {
    id: "template_fantasy_urban",
    title: "Magic in the Modern World",
    type: "Fantasy",
    category: "Urban Fantasy",
    description: "Urban fantasy template where magical elements exist within our modern world, often hidden from most people.",
    structure: [
      { title: "Normal Life", description: "The protagonist's ordinary modern life" },
      { title: "Magical Disruption", description: "First encounter with the magical world" },
      { title: "Disbelief", description: "Struggling to accept the reality of magic" },
      { title: "Guide Appears", description: "Someone who explains the magical world" },
      { title: "New Rules", description: "Learning how magic works in this world" },
      { title: "First Magical Challenge", description: "Using new knowledge to face a problem" },
      { title: "Deeper Into Magic", description: "Becoming more involved in the magical community" },
      { title: "Personal Stakes", description: "How the magical situation affects the protagonist personally" },
      { title: "Magical Conflict", description: "A significant conflict involving magical elements" },
      { title: "Balance Disrupted", description: "The balance between magical and normal worlds is threatened" },
      { title: "Final Confrontation", description: "The climactic magical battle or challenge" },
      { title: "New Normal", description: "Living with the knowledge of magic going forward" }
    ]
  }
];

// Science Fiction Templates
export const scienceFictionTemplates: BookTemplate[] = [
  {
    id: "template_scifi_space",
    title: "Space Exploration Adventure",
    type: "Science Fiction",
    category: "Space Opera",
    description: "A science fiction adventure focused on space exploration, discovering new worlds, and encountering alien civilizations.",
    structure: [
      { title: "Earth Departure", description: "Leaving Earth for a space mission" },
      { title: "The Crew", description: "Introducing the crew and their dynamics" },
      { title: "Strange Discovery", description: "Finding something unexpected in space" },
      { title: "First Contact", description: "Encountering an alien civilization or phenomenon" },
      { title: "Communication Challenge", description: "Trying to understand the alien entity" },
      { title: "Ship Crisis", description: "A technical or supply problem threatens the mission" },
      { title: "Deeper Understanding", description: "Learning more about the alien civilization" },
      { title: "Crew Conflict", description: "Internal disagreement about how to proceed" },
      { title: "Dangerous Situation", description: "Facing a life-threatening scenario" },
      { title: "Scientific Solution", description: "Using science to solve a major problem" },
      { title: "Return Journey", description: "The voyage back to Earth" },
      { title: "Changed Perspective", description: "How the journey has changed the characters" }
    ]
  },
  {
    id: "template_scifi_dystopian",
    title: "Dystopian Future",
    type: "Science Fiction",
    category: "Dystopian",
    description: "A science fiction story set in a dystopian future where society has been transformed by technology, disaster, or political change.",
    structure: [
      { title: "Dystopian World", description: "Establish the broken world and its rules" },
      { title: "Protagonist's Place", description: "The main character's role in this society" },
      { title: "Inciting Doubt", description: "Something happens that makes the protagonist question the system" },
      { title: "First Act of Rebellion", description: "The protagonist's first small act against the system" },
      { title: "Consequences", description: "Facing the results of challenging the status quo" },
      { title: "Finding Allies", description: "Meeting others who also question or fight the system" },
      { title: "Learning the Truth", description: "Discovering hidden information about how the world really works" },
      { title: "The Plan", description: "Planning a significant act of rebellion" },
      { title: "Betrayal", description: "Someone close to the protagonist betrays them" },
      { title: "All Is Lost", description: "The darkest moment when it seems the rebellion will fail" },
      { title: "Final Stand", description: "The climactic confrontation with the dystopian power" },
      { title: "New Beginning", description: "The start of a new, hopefully better world" }
    ]
  }
];

// Non-fiction Templates
export const nonFictionTemplates: BookTemplate[] = [
  {
    id: "template_nonfiction_selfhelp",
    title: "Personal Development Guide",
    type: "Self-Help",
    category: "General",
    description: "A self-help book template designed to guide readers through personal growth and development in a specific area of life.",
    structure: [
      { title: "The Problem", description: "Identify the common problem readers face" },
      { title: "The Promise", description: "What readers will gain from the book" },
      { title: "Your Authority", description: "Why readers should trust your guidance" },
      { title: "The System Overview", description: "An overview of your approach or system" },
      { title: "Common Misconceptions", description: "Addressing myths and misconceptions" },
      { title: "Core Principle 1", description: "First major concept or strategy" },
      { title: "Core Principle 2", description: "Second major concept or strategy" },
      { title: "Core Principle 3", description: "Third major concept or strategy" },
      { title: "Implementation Plan", description: "How to put the principles into practice" },
      { title: "Overcoming Obstacles", description: "Addressing common challenges" },
      { title: "Success Stories", description: "Examples of people who have succeeded" },
      { title: "Next Steps", description: "What readers should do after finishing the book" }
    ]
  },
  {
    id: "template_nonfiction_memoir",
    title: "Life Story Memoir",
    type: "Memoir",
    category: "General",
    description: "A template for writing a personal memoir, sharing your life experiences, challenges, and lessons learned.",
    structure: [
      { title: "Early Beginnings", description: "Your early life and formative experiences" },
      { title: "The Setting", description: "The time and place that shaped you" },
      { title: "Key Relationships", description: "Important people in your story" },
      { title: "First Turning Point", description: "A significant event that changed your direction" },
      { title: "Challenge Period", description: "A time of difficulty or struggle" },
      { title: "Personal Growth", description: "How you developed and changed" },
      { title: "Major Achievement", description: "An important accomplishment or milestone" },
      { title: "Low Point", description: "A significant setback or loss" },
      { title: "Recovery and Insight", description: "How you recovered and what you learned" },
      { title: "Life Philosophy", description: "The wisdom and perspective you've gained" },
      { title: "Legacy", description: "What you hope to leave behind or be remembered for" },
      { title: "Reflection", description: "Looking back and forward" }
    ]
  }
];

// Educational Templates
export const educationalTemplates: BookTemplate[] = [
  {
    id: "template_educational_textbook",
    title: "Comprehensive Textbook",
    type: "Educational",
    category: "General",
    description: "A structured educational textbook template with clear learning objectives, content organization, and assessment materials.",
    structure: [
      { title: "Course Introduction", description: "Overview of the subject and learning goals" },
      { title: "Foundational Concepts", description: "Basic principles and terminology" },
      { title: "Historical Context", description: "Background and development of the subject" },
      { title: "Core Theory 1", description: "First major theoretical concept" },
      { title: "Core Theory 2", description: "Second major theoretical concept" },
      { title: "Practical Applications", description: "Real-world applications of the theories" },
      { title: "Case Studies", description: "Detailed examples analyzing the concepts" },
      { title: "Advanced Concepts", description: "More complex ideas building on the basics" },
      { title: "Current Research", description: "Latest developments in the field" },
      { title: "Future Directions", description: "Emerging trends and future possibilities" },
      { title: "Review and Assessment", description: "Summary and evaluation materials" },
      { title: "Additional Resources", description: "Further reading and study materials" }
    ]
  }
];

// Combining all templates
export const allBookTemplates: BookTemplate[] = [
  ...childrensBookTemplates,
  ...novelTemplates,
  ...fantasyTemplates,
  ...scienceFictionTemplates,
  ...nonFictionTemplates,
  ...educationalTemplates
];

// Function to get templates by book type
export const getTemplatesByType = (bookType: string): BookTemplate[] => {
  switch (bookType) {
    case "Children's Story":
      return childrensBookTemplates;
    case "Novel":
      return novelTemplates;
    case "Fantasy":
      return fantasyTemplates;
    case "Science Fiction":
      return scienceFictionTemplates;
    case "Self-Help":
    case "Biography":
    case "Cookbook":
    case "Travel":
    case "Memoir":
      return nonFictionTemplates;
    case "Educational":
      return educationalTemplates;
    default:
      return [];
  }
};
