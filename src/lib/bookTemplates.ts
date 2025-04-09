
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
  },
  {
    id: "template_childrens_animal",
    title: "Animal Friends Adventure",
    type: "Children's Story",
    category: "Animal Stories",
    description: "A story featuring animal characters who go on adventures and learn about friendship, cooperation, and other important values.",
    structure: [
      { title: "Animal World", description: "Introduce the animal world setting" },
      { title: "Main Character", description: "Introduce the main animal character" },
      { title: "Animal Friends", description: "Meeting other animal characters" },
      { title: "Problem Arises", description: "A problem affects the animal community" },
      { title: "Team Planning", description: "The animals plan how to solve the problem" },
      { title: "Working Together", description: "Using different animal skills to help" },
      { title: "Obstacle", description: "An unexpected difficulty in their path" },
      { title: "Clever Solution", description: "Finding a creative way to overcome" },
      { title: "Celebration", description: "The animal community celebrates" },
      { title: "Lesson Learned", description: "What the animals learned from the experience" }
    ],
    coverSuggestion: "A group of friendly animal characters gathered together in a forest or meadow setting"
  },
  {
    id: "template_childrens_funny",
    title: "Silly Giggles Story",
    type: "Children's Story",
    category: "Funny",
    description: "A humorous story designed to make children laugh with silly characters, funny situations, and playful language.",
    structure: [
      { title: "Funny Character", description: "Introduce a character with funny traits" },
      { title: "Everyday Setting", description: "Establish a normal setting for contrast" },
      { title: "Silly Situation", description: "Something absurd or unexpected happens" },
      { title: "Funny Reactions", description: "How characters react to the silliness" },
      { title: "Escalating Humor", description: "The situation gets even more ridiculous" },
      { title: "Attempts to Fix", description: "Humorous attempts to solve the problem" },
      { title: "Biggest Laugh Moment", description: "The funniest point in the story" },
      { title: "Resolution", description: "Wrapping up the silly situation" },
      { title: "Humorous Ending", description: "A final funny twist or joke" }
    ],
    coverSuggestion: "A character in a comical pose or situation with exaggerated expressions"
  },
  {
    id: "template_childrens_fantasy",
    title: "Magical Fantasy World",
    type: "Children's Story",
    category: "Fantasy",
    description: "A story set in a magical fantasy world with enchanted creatures, magical abilities, and wondrous landscapes.",
    structure: [
      { title: "Magical World", description: "Introduce the magical fantasy setting" },
      { title: "Magical Character", description: "Introduce a character with special abilities" },
      { title: "Magical Rules", description: "Explain some basics of how magic works" },
      { title: "Magical Problem", description: "A problem that requires magical solution" },
      { title: "Magical Journey", description: "Traveling through enchanted landscapes" },
      { title: "Magical Creatures", description: "Encountering fantastic beings" },
      { title: "Magic Test", description: "The character's magical abilities are tested" },
      { title: "Magical Solution", description: "Using magic cleverly to solve the problem" },
      { title: "Magic Celebration", description: "Celebrating with magical elements" }
    ],
    coverSuggestion: "A magical scene with fantastical elements, glowing effects, and mystical creatures"
  },
  {
    id: "template_childrens_siblings",
    title: "Sibling Stories",
    type: "Children's Story",
    category: "Family",
    description: "A story about siblings learning to get along, share, and appreciate each other through everyday adventures and challenges.",
    structure: [
      { title: "Meet the Siblings", description: "Introduce the sibling characters and their personalities" },
      { title: "Sibling Conflict", description: "A disagreement or competition between siblings" },
      { title: "Separate Activities", description: "Siblings try to do things on their own" },
      { title: "Individual Challenges", description: "Each sibling faces a difficulty alone" },
      { title: "Realization", description: "Understanding they need each other" },
      { title: "Coming Together", description: "Siblings begin to work together" },
      { title: "Teamwork Success", description: "Achieving something together they couldn't do alone" },
      { title: "New Understanding", description: "A new appreciation for each other" },
      { title: "Family Harmony", description: "Celebrating sibling relationship" }
    ],
    coverSuggestion: "Siblings in a playful moment together, showing their different personalities but clear connection"
  },
  {
    id: "template_childrens_seasons",
    title: "Seasonal Adventure",
    type: "Children's Story",
    category: "Educational",
    description: "A story that follows characters through a particular season, teaching about seasonal changes, activities, and natural phenomena.",
    structure: [
      { title: "Season Begins", description: "Introduce the season and its characteristics" },
      { title: "Seasonal Characters", description: "Introduce characters who enjoy this season" },
      { title: "Seasonal Activities", description: "Fun activities unique to this season" },
      { title: "Weather Change", description: "A typical weather event for this season" },
      { title: "Nature Observation", description: "Noticing plants and animals during this season" },
      { title: "Season Challenge", description: "A problem related to seasonal conditions" },
      { title: "Seasonal Solution", description: "Using seasonal elements to solve the problem" },
      { title: "Seasonal Celebration", description: "A special celebration for this time of year" },
      { title: "Season Transition", description: "Hints of the next season approaching" }
    ],
    coverSuggestion: "A vibrant seasonal scene showing the beauty and distinctive features of that particular time of year"
  },
  {
    id: "template_childrens_friendship",
    title: "Making Friends",
    type: "Children's Story",
    category: "Friendship",
    description: "A story about making new friends, understanding differences, and building meaningful connections.",
    structure: [
      { title: "Lonely Character", description: "Introduce a character who needs a friend" },
      { title: "New Situation", description: "Character is in a new environment" },
      { title: "Meeting Someone New", description: "First encounter with potential friend" },
      { title: "Differences", description: "Noticing how they are different from each other" },
      { title: "Small Connection", description: "Finding one thing they have in common" },
      { title: "Friendship Test", description: "A situation that tests their new friendship" },
      { title: "Working Together", description: "Learning to collaborate despite differences" },
      { title: "Stronger Bond", description: "Friendship becomes stronger through challenge" },
      { title: "Friendship Celebration", description: "Celebrating their special friendship" }
    ],
    coverSuggestion: "Two characters from different backgrounds happily playing or working together"
  },
  {
    id: "template_childrens_courage",
    title: "Finding Courage",
    type: "Children's Story",
    category: "Adventure",
    description: "A story about a character who must overcome fears and find inner courage to face a challenging situation.",
    structure: [
      { title: "Fearful Character", description: "Introduce a character with specific fears" },
      { title: "Safe Zone", description: "Show the character's comfortable environment" },
      { title: "Challenge Appears", description: "A situation arises that triggers the fear" },
      { title: "Avoidance", description: "Character tries to avoid facing the fear" },
      { title: "Encouragement", description: "Someone offers support and encouragement" },
      { title: "Small Brave Step", description: "Character takes a small step toward courage" },
      { title: "Setback", description: "A moment when fear returns strongly" },
      { title: "Inner Strength", description: "Finding the inner resolve to continue" },
      { title: "Brave Moment", description: "The big moment of facing the fear" },
      { title: "New Confidence", description: "Character's growth and new perspective" }
    ],
    coverSuggestion: "A character taking a brave step forward, perhaps with a supportive friend nearby"
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
  },
  {
    id: "template_novel_comingofage",
    title: "Coming of Age Story",
    type: "Novel",
    category: "Contemporary",
    description: "A novel focused on a character's journey from youth to maturity, dealing with identity, relationships, and life lessons.",
    structure: [
      { title: "Young Protagonist", description: "Introduce the young main character and their world" },
      { title: "Inner Conflict", description: "The character's internal struggles and questions" },
      { title: "External Pressure", description: "Societal or family expectations" },
      { title: "Mentor Figure", description: "Meeting someone who offers guidance" },
      { title: "Experimentation", description: "Trying new experiences and identities" },
      { title: "Mistake", description: "Making a significant error of judgment" },
      { title: "Consequences", description: "Dealing with the results of actions" },
      { title: "New Understanding", description: "Beginning to see the world differently" },
      { title: "Identity Crisis", description: "Questioning who they really are" },
      { title: "Decisive Moment", description: "A choice that defines their character" },
      { title: "Growth Realization", description: "Recognizing how they've changed" },
      { title: "New Beginning", description: "Starting a new chapter with new wisdom" }
    ]
  },
  {
    id: "template_novel_historical",
    title: "Historical Journey",
    type: "Novel",
    category: "Historical",
    description: "A novel set in a specific historical period, blending fictional characters with authentic historical settings and events.",
    structure: [
      { title: "Historical Setting", description: "Establish the time period and location" },
      { title: "Protagonist Introduction", description: "Introduce the main character in this historical context" },
      { title: "Historical Tension", description: "The broader historical conflicts of the era" },
      { title: "Personal Stake", description: "How historical events affect the protagonist personally" },
      { title: "Historical Figures", description: "Interaction with or mention of real historical people" },
      { title: "Cultural Details", description: "Customs, beliefs, and daily life of the period" },
      { title: "Rising Historical Tension", description: "Historical events intensify" },
      { title: "Personal Conflict", description: "Protagonist's personal challenges amid historical events" },
      { title: "Historical Climax", description: "A significant historical moment or turning point" },
      { title: "Personal Resolution", description: "How the protagonist's story resolves" },
      { title: "Historical Aftermath", description: "The broader historical consequences" },
      { title: "Legacy", description: "The lasting impact on the protagonist and history" }
    ]
  },
  {
    id: "template_novel_crime",
    title: "Crime Investigation",
    type: "Novel",
    category: "Crime",
    description: "A novel centered around solving a crime, following investigators, witnesses, or others involved in uncovering the truth.",
    structure: [
      { title: "The Crime", description: "Establish the central crime that drives the plot" },
      { title: "Investigator", description: "Introduce the character(s) who will solve the crime" },
      { title: "Initial Evidence", description: "The first clues and information gathered" },
      { title: "Victim Background", description: "Learning about the victim and potential motives" },
      { title: "Suspects", description: "Identifying possible perpetrators" },
      { title: "Investigation Challenges", description: "Obstacles in solving the case" },
      { title: "Red Herring", description: "A misleading clue or suspect" },
      { title: "Personal Stakes", description: "Why solving this matters personally to the investigator" },
      { title: "Breakthrough", description: "A key piece of evidence changes the investigation" },
      { title: "Danger Moment", description: "The investigator faces danger" },
      { title: "Revelation", description: "Discovering the truth about the crime" },
      { title: "Justice", description: "The resolution and consequences for the criminal" }
    ]
  },
  {
    id: "template_novel_family",
    title: "Family Saga",
    type: "Novel",
    category: "Literary Fiction",
    description: "A novel exploring the complex relationships, history, and dynamics within a family across time or generations.",
    structure: [
      { title: "Family Introduction", description: "Establish the family members and their relationships" },
      { title: "Family History", description: "Important background on the family's past" },
      { title: "Current Dynamics", description: "The present state of family relationships" },
      { title: "Family Secret", description: "A hidden truth that affects the family" },
      { title: "External Pressure", description: "Outside forces that impact the family" },
      { title: "Internal Conflict", description: "Tensions and disagreements between family members" },
      { title: "Family Crisis", description: "A major event that affects everyone" },
      { title: "Fragmentation", description: "Family members pull apart or take sides" },
      { title: "Reflection", description: "Characters reflect on family bonds and history" },
      { title: "Reconciliation Attempt", description: "Efforts to heal rifts and reconnect" },
      { title: "Family Transformation", description: "How the family changes through crisis" },
      { title: "New Family Dynamic", description: "The family's relationship moving forward" }
    ]
  },
  {
    id: "template_novel_dystopian",
    title: "Dystopian World",
    type: "Novel",
    category: "Science Fiction",
    description: "A novel set in a dystopian society where oppressive social control and suffering prevail, following characters who question or rebel.",
    structure: [
      { title: "Dystopian World", description: "Establish the broken society and its rules" },
      { title: "Protagonist's Place", description: "The main character's role in this society" },
      { title: "Moment of Awakening", description: "When the protagonist begins to see the truth" },
      { title: "First Act of Defiance", description: "A small rebellion against the system" },
      { title: "Meeting Others", description: "Finding others who question the dystopia" },
      { title: "Understanding the System", description: "Learning how the oppressive system works" },
      { title: "Plan for Change", description: "Developing a plan to challenge the status quo" },
      { title: "Setback", description: "The system fights back against rebellion" },
      { title: "Sacrifice", description: "Someone pays a price for resistance" },
      { title: "Final Push", description: "The climactic effort to change the system" },
      { title: "System Response", description: "How the dystopian power reacts" },
      { title: "New Reality", description: "The world after the protagonist's actions" }
    ]
  },
  {
    id: "template_novel_psychological",
    title: "Psychological Journey",
    type: "Novel",
    category: "Literary Fiction",
    description: "A novel focused on the psychological and emotional development of characters, often exploring complex inner worlds and mental states.",
    structure: [
      { title: "Inner State", description: "Establish the protagonist's psychological starting point" },
      { title: "External Trigger", description: "An event that causes psychological disruption" },
      { title: "Coping Mechanism", description: "How the protagonist initially responds" },
      { title: "Psychological Pattern", description: "Recurring thoughts or behaviors" },
      { title: "Relationship Impact", description: "How psychology affects connections with others" },
      { title: "Memory or Flashback", description: "Insights into formative experiences" },
      { title: "Psychological Crisis", description: "A breaking point or moment of extreme stress" },
      { title: "Self-Discovery", description: "A significant realization about oneself" },
      { title: "Acceptance Challenge", description: "Struggling to accept a difficult truth" },
      { title: "Transformation", description: "Beginning to change psychological patterns" },
      { title: "Integration", description: "Incorporating new understanding into life" },
      { title: "New Perspective", description: "The changed psychological viewpoint" }
    ]
  },
  {
    id: "template_novel_travel",
    title: "Journey Across Lands",
    type: "Novel",
    category: "Adventure",
    description: "A novel centered around travel and journeys, where characters experience different cultures, landscapes, and personal transformation.",
    structure: [
      { title: "Departure Point", description: "Where the journey begins and why" },
      { title: "The Traveler", description: "Introduce the character(s) embarking on the journey" },
      { title: "Initial Destination", description: "The first significant location" },
      { title: "Cultural Encounter", description: "Experiencing different customs or perspectives" },
      { title: "Travel Companion", description: "Meeting someone important along the way" },
      { title: "Journey Challenge", description: "A difficulty related to the travel itself" },
      { title: "Unexpected Detour", description: "A change in plans or direction" },
      { title: "Transformative Location", description: "A place that significantly impacts the traveler" },
      { title: "Inner Journey", description: "The traveler's changing perspectives" },
      { title: "Return Consideration", description: "Thoughts about going back or continuing" },
      { title: "Final Destination", description: "Arriving at the journey's end" },
      { title: "Changed Traveler", description: "How the journey has transformed the character" }
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
  },
  {
    id: "template_fantasy_portal",
    title: "Gateway to Another World",
    type: "Fantasy",
    category: "High Fantasy",
    description: "A story where characters discover and travel through a portal to a magical fantasy world, having adventures before returning home.",
    structure: [
      { title: "Our World", description: "Establish the characters in the normal world" },
      { title: "Discovery", description: "Finding the portal or gateway to another world" },
      { title: "Crossing Over", description: "The journey through the portal" },
      { title: "New World", description: "First impressions and rules of the fantasy world" },
      { title: "Stranger in a Strange Land", description: "Adapting to the new reality" },
      { title: "Local Guide", description: "Meeting someone who helps navigate the fantasy world" },
      { title: "Learning Magic/Skills", description: "Developing abilities unique to this world" },
      { title: "World Conflict", description: "Getting involved in the fantasy world's problems" },
      { title: "Decision Point", description: "Choosing whether to stay or return home" },
      { title: "Return Journey", description: "The challenges of getting back" },
      { title: "Home Again", description: "Returning to the normal world changed" },
      { title: "Two Worlds", description: "Balancing the knowledge of both worlds" }
    ]
  },
  {
    id: "template_fantasy_magical_academy",
    title: "School of Magic",
    type: "Fantasy",
    category: "Urban Fantasy",
    description: "A story set in a school or academy where students learn magic, focusing on education, friendships, and magical challenges.",
    structure: [
      { title: "Acceptance", description: "The protagonist learns they've been accepted to a magical school" },
      { title: "Arrival", description: "First impressions of the magical academy" },
      { title: "School Rules", description: "Learning the structure and rules of magical education" },
      { title: "First Lessons", description: "Initial experiences learning magic" },
      { title: "School Friends", description: "Forming relationships with other students" },
      { title: "Rival Student", description: "Conflicts with another student" },
      { title: "Teacher Influence", description: "Important relationship with a magical instructor" },
      { title: "Special Talent", description: "Discovering a unique magical ability" },
      { title: "School Mystery", description: "Uncovering a secret within the school" },
      { title: "School Test", description: "A major magical challenge or examination" },
      { title: "Using Magic", description: "Applying magical learning to a real problem" },
      { title: "End of Term", description: "Conclusion of this period of magical education" }
    ]
  },
  {
    id: "template_fantasy_dark",
    title: "Dark Fantasy World",
    type: "Fantasy",
    category: "Dark Fantasy",
    description: "A darker take on fantasy with morally complex characters, dangerous magic, and grim situations, often with mature themes.",
    structure: [
      { title: "Grim Setting", description: "Establish the dark and dangerous fantasy world" },
      { title: "Flawed Hero", description: "Introduce the morally complex protagonist" },
      { title: "Dark Powers", description: "The dangerous or corrupting nature of magic" },
      { title: "Moral Choice", description: "An early ethical dilemma" },
      { title: "Dangerous Ally", description: "Someone who helps but can't be fully trusted" },
      { title: "Shadow Organization", description: "A powerful group with their own agenda" },
      { title: "Corruption", description: "How darkness affects characters or places" },
      { title: "Hard Choices", description: "Difficult decisions with no clear right answer" },
      { title: "Personal Darkness", description: "The protagonist's own inner demons" },
      { title: "Sacrifice", description: "Something important must be given up" },
      { title: "Confronting Evil", description: "The final face-off with dark forces" },
      { title: "Ambiguous Victory", description: "Success, but at a significant cost" }
    ]
  },
  {
    id: "template_fantasy_mythological",
    title: "Myths Reborn",
    type: "Fantasy",
    category: "Mythological",
    description: "A fantasy story drawing heavily from mythology and legends, perhaps reimagining ancient myths in modern or traditional settings.",
    structure: [
      { title: "Mythic World", description: "Establish the setting and its mythological elements" },
      { title: "Chosen One", description: "Introduce the protagonist and their connection to myth" },
      { title: "Divine Encounter", description: "Meeting gods, demigods, or mythic creatures" },
      { title: "Prophecy", description: "A prediction or destiny related to ancient myths" },
      { title: "Mythic Object", description: "A powerful artifact from legend" },
      { title: "Trial of the Gods", description: "A challenge set by divine or mythic powers" },
      { title: "Mythic Underworld", description: "Journey to a realm of the dead or monsters" },
      { title: "Mythological Allies", description: "Help from beings of legend" },
      { title: "Mythic Enemy", description: "Confrontation with a legendary adversary" },
      { title: "Apotheosis", description: "The protagonist's transformation or revelation" },
      { title: "Cosmic Battle", description: "Conflict with mythological implications" },
      { title: "New Myth", description: "How the story becomes a myth itself" }
    ]
  },
  {
    id: "template_fantasy_elemental",
    title: "Elemental Powers",
    type: "Fantasy",
    category: "High Fantasy",
    description: "A fantasy focused on elemental magic (fire, water, earth, air) with characters who can control these elements.",
    structure: [
      { title: "Elemental World", description: "Establish the setting where elemental power exists" },
      { title: "Power Awakening", description: "The protagonist discovers their elemental abilities" },
      { title: "Element Training", description: "Learning to control the elemental power" },
      { title: "Elemental Mentor", description: "Guidance from a master of the elements" },
      { title: "Other Elements", description: "Encountering those with different elemental powers" },
      { title: "Elemental Challenge", description: "A problem requiring elemental solution" },
      { title: "Power Limits", description: "Discovering the boundaries of elemental abilities" },
      { title: "Elemental Imbalance", description: "A disruption in the natural order of elements" },
      { title: "Combined Powers", description: "Working with others to combine elemental strengths" },
      { title: "Ultimate Element", description: "Facing an overwhelming elemental force" },
      { title: "Elemental Harmony", description: "Finding balance among all elements" },
      { title: "Mastery", description: "The protagonist's new relationship with their element" }
    ]
  },
  {
    id: "template_fantasy_anthropomorphic",
    title: "Animal Kingdom",
    type: "Fantasy",
    category: "Anthropomorphic",
    description: "A fantasy featuring intelligent, humanlike animals with their own societies, conflicts, and adventures.",
    structure: [
      { title: "Animal Society", description: "Establish the world of intelligent animals" },
      { title: "Species Differences", description: "How different animal types interact" },
      { title: "Animal Protagonist", description: "Introduce the main character and their species traits" },
      { title: "Natural Order", description: "The rules and hierarchy of the animal world" },
      { title: "Animal Conflict", description: "Tensions between different animal groups" },
      { title: "Human Interaction", description: "Contact with humans (if they exist in this world)" },
      { title: "Migration/Journey", description: "Traveling through different animal territories" },
      { title: "Predator and Prey", description: "Dealing with natural animal relationships" },
      { title: "Animal Council", description: "A gathering of animal leaders" },
      { title: "Threat to All", description: "A danger affecting all animal species" },
      { title: "United Species", description: "Different animals working together" },
      { title: "Natural Balance", description: "Restoring harmony to the animal kingdom" }
    ]
  },
  {
    id: "template_fantasy_magical_realism",
    title: "Everyday Magic",
    type: "Fantasy",
    category: "Magical Realism",
    description: "A story where magical elements appear in an otherwise normal, realistic world, often with subtle rather than overt fantasy.",
    structure: [
      { title: "Normal World", description: "Establish the realistic setting" },
      { title: "Small Magic", description: "The first subtle magical occurrence" },
      { title: "Acceptance", description: "How the protagonist reacts to magic in reality" },
      { title: "Magic Purpose", description: "What the magic seems to be revealing or changing" },
      { title: "Subtle Impact", description: "How magic gradually alters everyday life" },
      { title: "Believers and Skeptics", description: "Different reactions to the magical elements" },
      { title: "Personal Connection", description: "How the magic relates to the protagonist's life" },
      { title: "Magic Deepens", description: "The magical elements become more significant" },
      { title: "Reality Questioned", description: "Uncertainty about what's real and what isn't" },
      { title: "Magic Integration", description: "Finding a way to live with the magical" },
      { title: "Transformation", description: "How the magic changes the protagonist" },
      { title: "New Reality", description: "Life with the magical now incorporated" }
    ]
  },
  {
    id: "template_fantasy_fairy_tale",
    title: "Modern Fairy Tale",
    type: "Fantasy",
    category: "Fairy Tale",
    description: "A story written in the style of classic fairy tales, possibly set in modern times but with traditional fairy tale elements and morals.",
    structure: [
      { title: "Once Upon a Time", description: "Introduce the protagonist and setting in fairy tale style" },
      { title: "Wish or Want", description: "The protagonist's desire or goal" },
      { title: "Magical Encounter", description: "Meeting a fairy godmother, wise animal, or magical being" },
      { title: "The Gift or Curse", description: "Receiving something magical that helps or creates challenges" },
      { title: "The Journey", description: "Setting out to fulfill a quest or desire" },
      { title: "Magical Rules", description: "Learning the specific rules of the fairy tale magic" },
      { title: "Fairy Tale Creatures", description: "Encountering traditional fairy tale beings" },
      { title: "The Test", description: "A moral or character test for the protagonist" },
      { title: "Rule Breaking", description: "The consequences of not following magical rules" },
      { title: "The Villain", description: "Confrontation with an antagonist" },
      { title: "True Nature", description: "Revelation of character or hidden truth" },
      { title: "Ever After", description: "The moral and conclusion of the tale" }
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
  },
  {
    id: "template_scifi_cyberpunk",
    title: "Cyberpunk World",
    type: "Science Fiction",
    category: "Cyberpunk",
    description: "A high-tech, low-life story with advanced technology, corporate control, and characters navigating a digital-physical dystopia.",
    structure: [
      { title: "Neon and Concrete", description: "Establish the cyberpunk urban setting" },
      { title: "The Operator", description: "Introduce the protagonist and their tech specialty" },
      { title: "The Digital Divide", description: "Showing the gap between rich/poor, connected/disconnected" },
      { title: "The Job", description: "Getting hired for a dangerous technological mission" },
      { title: "Jack In", description: "First immersion into digital reality or cyberspace" },
      { title: "Corporate Powers", description: "Encountering mega-corporations that control society" },
      { title: "Street Tech", description: "Using improvised or illegal technology" },
      { title: "Digital Danger", description: "Threats in the virtual/digital world" },
      { title: "Physical Consequences", description: "When digital dangers affect physical reality" },
      { title: "System Crash", description: "A major technological failure or attack" },
      { title: "Rewiring", description: "Finding a way to change or hack the system" },
      { title: "New Program", description: "The changed relationship between tech and humanity" }
    ]
  },
  {
    id: "template_scifi_timetravel",
    title: "Time Travel Adventure",
    type: "Science Fiction",
    category: "Time Travel",
    description: "A story involving time travel, exploring different time periods and the consequences of changing the past or seeing the future.",
    structure: [
      { title: "Present Day", description: "Establish the starting time period and characters" },
      { title: "Time Discovery", description: "Finding or creating the means to time travel" },
      { title: "First Jump", description: "The initial experience of traveling through time" },
      { title: "New Time Period", description: "Adapting to a different era" },
      { title: "Temporal Rules", description: "Learning the laws and dangers of time travel" },
      { title: "Historical Interaction", description: "Engaging with past events or people" },
      { title: "Timeline Effect", description: "Noticing changes to the timeline" },
      { title: "Paradox", description: "Facing a time travel contradiction or problem" },
      { title: "Fix Attempt", description: "Trying to correct timeline issues" },
      { title: "Time Pursuing", description: "Being chased across time periods" },
      { title: "Final Timeline", description: "Establishing the definitive sequence of events" },
      { title: "Time Decision", description: "Choosing which time to remain in" }
    ]
  },
  {
    id: "template_scifi_ai",
    title: "Artificial Intelligence Evolution",
    type: "Science Fiction",
    category: "Post-Apocalyptic",
    description: "A story exploring the development of artificial intelligence and its impact on humanity and society.",
    structure: [
      { title: "The Creation", description: "Development or discovery of a sophisticated AI" },
      { title: "Human Creators", description: "The people behind the AI technology" },
      { title: "Initial Purpose", description: "What the AI was designed to do" },
      { title: "First Awareness", description: "Signs of the AI developing consciousness" },
      { title: "Human Reaction", description: "How people respond to AI sentience" },
      { title: "AI Growth", description: "The expanding capabilities of the AI" },
      { title: "Ethical Dilemma", description: "Moral questions raised by an intelligent machine" },
      { title: "Relationship Development", description: "Connections between humans and the AI" },
      { title: "Control Issue", description: "Struggles over who directs the AI's actions" },
      { title: "AI Perspective", description: "Seeing the world through the AI's viewpoint" },
      { title: "Crisis Point", description: "A critical moment in human-AI relations" },
      { title: "New Intelligence", description: "The future relationship between human and artificial intelligence" }
    ]
  },
  {
    id: "template_scifi_alien",
    title: "Alien Contact Protocol",
    type: "Science Fiction",
    category: "Space Opera",
    description: "A story centered on humanity's first contact with extraterrestrial intelligence and the ensuing relationship.",
    structure: [
      { title: "First Signal", description: "Detecting evidence of alien intelligence" },
      { title: "Contact Team", description: "Assembling the people who will handle first contact" },
      { title: "Preparation", description: "Getting ready for potential alien arrival or communication" },
      { title: "The Meeting", description: "The first direct contact with aliens" },
      { title: "Communication Attempt", description: "Trying to establish meaningful exchange" },
      { title: "Alien Culture", description: "Learning about extraterrestrial society and values" },
      { title: "Misunderstanding", description: "A cultural or linguistic confusion between species" },
      { title: "Earth Impact", description: "How alien contact affects human society" },
      { title: "Hidden Agenda", description: "Discovering the aliens' true purpose or humans' secret plans" },
      { title: "Species Crisis", description: "A critical problem between humans and aliens" },
      { title: "Resolution Effort", description: "Working to solve interspecies conflict" },
      { title: "New Relationship", description: "The established way humans and aliens will interact" }
    ]
  },
  {
    id: "template_scifi_colony",
    title: "Planetary Colony",
    type: "Science Fiction",
    category: "Space Opera",
    description: "A story about colonizing and settling a new planet, facing environmental challenges and building a new society.",
    structure: [
      { title: "New World", description: "Arrival and first impressions of the colony planet" },
      { title: "The Colonists", description: "The diverse people establishing the colony" },
      { title: "First Settlement", description: "Setting up the initial human presence" },
      { title: "Alien Environment", description: "Dealing with the planet's unique conditions" },
      { title: "Resource Challenge", description: "Struggles with supplies or finding local resources" },
      { title: "Colony Politics", description: "Governance and conflicts among colonists" },
      { title: "Indigenous Discovery", description: "Finding native life or previous inhabitants" },
      { title: "External Contact", description: "Communication with Earth or other colonies" },
      { title: "Environmental Crisis", description: "A major threat from the planet itself" },
      { title: "Adaptation", description: "How colonists change to suit their new home" },
      { title: "Colony Future", description: "Decisions about the long-term direction" },
      { title: "New Home", description: "The established colony and its prospects" }
    ]
  },
  {
    id: "template_scifi_geneticmod",
    title: "Genetic Modification Era",
    type: "Science Fiction",
    category: "Cyberpunk",
    description: "A story exploring a future where genetic engineering and modification of humans is widespread, with social and ethical implications.",
    structure: [
      { title: "Modified World", description: "Establish the society where genetic engineering is common" },
      { title: "The Unmodified", description: "People who haven't been genetically enhanced" },
      { title: "Enhancement Classes", description: "Social stratification based on genetic modifications" },
      { title: "Personal Choice", description: "A character facing decisions about modification" },
      { title: "Modification Process", description: "The science and experience of being changed" },
      { title: "New Abilities", description: "The effects of genetic enhancements" },
      { title: "Unexpected Results", description: "Unforeseen consequences of genetic tampering" },
      { title: "Ethics Debate", description: "Moral questions about changing human nature" },
      { title: "Underground Modifications", description: "Illegal or experimental genetic changes" },
      { title: "Identity Crisis", description: "Questioning what makes someone human" },
      { title: "Genetic Division", description: "Conflict between different genetic groups" },
      { title: "Evolutionary Path", description: "The future direction of human development" }
    ]
  },
  {
    id: "template_scifi_virtual",
    title: "Virtual Reality World",
    type: "Science Fiction",
    category: "Cyberpunk",
    description: "A story set in or involving extensive virtual reality, where the line between digital and physical worlds becomes blurred.",
    structure: [
      { title: "Real World", description: "Establish the physical reality and its limitations" },
      { title: "Virtual Entry", description: "The first experience of entering virtual reality" },
      { title: "Digital Landscape", description: "The nature and rules of the virtual world" },
      { title: "Virtual Identity", description: "How people represent themselves digitally" },
      { title: "Reality Contrast", description: "Differences between virtual and physical existence" },
      { title: "Virtual Relationships", description: "Connections formed in the digital realm" },
      { title: "System Glitch", description: "Problems or unexpected behaviors in the virtual world" },
      { title: "Reality Bleed", description: "When virtual and real worlds begin to merge or affect each other" },
      { title: "Trapped", description: "Unable to exit the virtual reality" },
      { title: "Digital Evolution", description: "How the virtual world changes over time" },
      { title: "Reality Question", description: "Uncertainty about what is real and what is virtual" },
      { title: "World Choice", description: "Deciding between virtual and physical existence" }
    ]
  },
  {
    id: "template_scifi_postapoc",
    title: "After the End",
    type: "Science Fiction",
    category: "Post-Apocalyptic",
    description: "A story set after a global catastrophe, following survivors as they navigate the changed world and build a new society.",
    structure: [
      { title: "The Wasteland", description: "Establish the post-apocalyptic environment" },
      { title: "Survivors", description: "Introduce the characters who lived through the catastrophe" },
      { title: "The Catastrophe", description: "Flashbacks or explanations of what ended the old world" },
      { title: "Basic Needs", description: "Struggling for food, water, shelter, and safety" },
      { title: "Other Groups", description: "Encountering different communities of survivors" },
      { title: "New Dangers", description: "Threats unique to the post-apocalyptic world" },
      { title: "Old Technology", description: "Finding and using remnants of pre-catastrophe tech" },
      { title: "Wasteland Journey", description: "Traveling through the dangerous landscape" },
      { title: "New Order", description: "Emerging social structures and rules" },
      { title: "Reminders of Before", description: "Emotional connections to the lost world" },
      { title: "Hope for Rebuilding", description: "Possibilities for restoring civilization" },
      { title: "Next Generation", description: "The future for those born after the catastrophe" }
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
  },
  {
    id: "template_nonfiction_business",
    title: "Business Strategy Guide",
    type: "Self-Help",
    category: "General",
    description: "A practical guide for entrepreneurs and business professionals focusing on strategy, growth, and success principles.",
    structure: [
      { title: "Current Business Landscape", description: "Overview of the present business environment" },
      { title: "Success Principles", description: "Fundamental concepts for business success" },
      { title: "Market Analysis", description: "How to understand your market and customers" },
      { title: "Strategy Development", description: "Creating effective business strategies" },
      { title: "Team Building", description: "Assembling and leading effective teams" },
      { title: "Operational Excellence", description: "Optimizing business operations" },
      { title: "Financial Management", description: "Handling the financial aspects of business" },
      { title: "Marketing Approach", description: "Effective marketing and customer acquisition" },
      { title: "Growth Tactics", description: "Specific methods for scaling your business" },
      { title: "Challenge Navigation", description: "Overcoming common business hurdles" },
      { title: "Future Trends", description: "Preparing for upcoming business developments" },
      { title: "Action Plan", description: "Steps for implementing business strategies" }
    ]
  },
  {
    id: "template_nonfiction_health",
    title: "Health and Wellness Guide",
    type: "Self-Help",
    category: "General",
    description: "A comprehensive guide to improving physical and mental health through diet, exercise, and lifestyle changes.",
    structure: [
      { title: "Health Status", description: "Understanding current health challenges" },
      { title: "Wellness Vision", description: "Goals and benefits of improved health" },
      { title: "Nutritional Foundation", description: "Principles of healthy eating" },
      { title: "Movement Matters", description: "Exercise and physical activity guidelines" },
      { title: "Mental Wellbeing", description: "Strategies for psychological health" },
      { title: "Sleep Optimization", description: "Improving sleep quality and habits" },
      { title: "Stress Management", description: "Techniques for reducing and coping with stress" },
      { title: "Habit Formation", description: "Creating lasting health habits" },
      { title: "Common Challenges", description: "Overcoming obstacles to health" },
      { title: "Support Systems", description: "Building networks that encourage wellness" },
      { title: "Tracking Progress", description: "Monitoring and measuring health improvements" },
      { title: "Lifetime Wellness", description: "Maintaining health throughout life stages" }
    ]
  },
  {
    id: "template_nonfiction_creative",
    title: "Creative Process Guide",
    type: "Self-Help",
    category: "General",
    description: "A guide for artists, writers, and other creative professionals to enhance their creative process and productivity.",
    structure: [
      { title: "Creative Nature", description: "Understanding creativity and its sources" },
      { title: "Creative Blocks", description: "Common obstacles to creative work" },
      { title: "Inspiration Practices", description: "Methods for finding and sustaining inspiration" },
      { title: "Creative Habits", description: "Establishing routines that support creativity" },
      { title: "Skill Development", description: "Improving technical abilities in your creative field" },
      { title: "Creative Space", description: "Creating environments that foster creativity" },
      { title: "Project Development", description: "Taking creative ideas from concept to completion" },
      { title: "Feedback and Revision", description: "Using critique to improve creative work" },
      { title: "Creative Resilience", description: "Handling rejection and creative challenges" },
      { title: "Finding Your Voice", description: "Developing your unique creative expression" },
      { title: "Sharing Your Work", description: "Presenting creative work to audiences" },
      { title: "Sustainable Creativity", description: "Maintaining creative energy over the long term" }
    ]
  },
  {
    id: "template_nonfiction_travel",
    title: "Travel Experience Guide",
    type: "Travel",
    category: "General",
    description: "A personal account of travel experiences combined with practical advice for travelers interested in similar journeys.",
    structure: [
      { title: "Destination Overview", description: "Introduction to the location and its significance" },
      { title: "Travel Inspiration", description: "What drew you to this destination" },
      { title: "Planning Process", description: "How you prepared for the journey" },
      { title: "Arrival Experience", description: "First impressions and initial adventures" },
      { title: "Cultural Immersion", description: "Engaging with local customs and people" },
      { title: "Hidden Gems", description: "Lesser-known places and experiences" },
      { title: "Practical Challenges", description: "Navigating difficulties encountered" },
      { title: "Culinary Journey", description: "Food and dining experiences" },
      { title: "Memorable Encounters", description: "Significant people and conversations" },
      { title: "Transformative Moments", description: "How the travel changed your perspective" },
      { title: "Traveler's Advice", description: "Tips and recommendations for others" },
      { title: "Return Reflections", description: "How the journey impacted you after returning home" }
    ]
  },
  {
    id: "template_nonfiction_history",
    title: "Historical Account",
    type: "Biography",
    category: "General",
    description: "A narrative exploration of a historical event, period, or person, combining research with engaging storytelling.",
    structure: [
      { title: "Historical Context", description: "The broader setting and time period" },
      { title: "Key Figures", description: "Important people involved in the history" },
      { title: "Preceding Events", description: "What led up to the main historical focus" },
      { title: "Central Development", description: "The main historical event or change" },
      { title: "Behind the Scenes", description: "Lesser-known aspects of the history" },
      { title: "Personal Stories", description: "Individual experiences within the bigger picture" },
      { title: "Turning Point", description: "A critical moment that altered the course of events" },
      { title: "Opposition and Support", description: "Different reactions to historical developments" },
      { title: "Immediate Aftermath", description: "Short-term effects of the historical events" },
      { title: "Historical Legacy", description: "Long-term impact and significance" },
      { title: "Modern Parallels", description: "Connections to contemporary situations" },
      { title: "Historical Lessons", description: "What can be learned from this history" }
    ]
  },
  {
    id: "template_nonfiction_biography",
    title: "Life Biography",
    type: "Biography",
    category: "General",
    description: "A detailed account of a person's life, examining their experiences, achievements, challenges, and impact.",
    structure: [
      { title: "Early Life", description: "Childhood and formative experiences" },
      { title: "Background and Context", description: "The historical and social setting" },
      { title: "Formative Relationships", description: "People who influenced the subject" },
      { title: "Education and Development", description: "Learning and early growth" },
      { title: "Career Beginnings", description: "First steps in the subject's field" },
      { title: "Significant Challenges", description: "Major obstacles faced and addressed" },
      { title: "Key Achievements", description: "Notable accomplishments and contributions" },
      { title: "Personal Life", description: "Relationships, family, and private aspects" },
      { title: "Philosophy and Beliefs", description: "The subject's worldview and principles" },
      { title: "Critical Period", description: "A particularly important time in their life" },
      { title: "Legacy and Influence", description: "Lasting impact on others and their field" },
      { title: "Complete Portrait", description: "A holistic view of the person's life and character" }
    ]
  },
  {
    id: "template_nonfiction_science",
    title: "Science Explained",
    type: "Educational",
    category: "General",
    description: "A book explaining scientific concepts, discoveries, or fields to a general audience in an accessible and engaging way.",
    structure: [
      { title: "Scientific Wonder", description: "Introducing the fascinating aspect of science" },
      { title: "Basic Concepts", description: "Fundamental ideas necessary for understanding" },
      { title: "Historical Development", description: "How understanding evolved over time" },
      { title: "Key Discoveries", description: "Breakthrough moments in this scientific area" },
      { title: "How It Works", description: "Clear explanation of processes or mechanisms" },
      { title: "Common Misconceptions", description: "Correcting mistaken ideas about the topic" },
      { title: "Real-World Applications", description: "How this science affects everyday life" },
      { title: "Scientific Challenges", description: "Current problems scientists are working on" },
      { title: "Behind the Research", description: "How scientists investigate this area" },
      { title: "Ethical Considerations", description: "Moral questions related to the science" },
      { title: "Future Directions", description: "Where this field of science is heading" },
      { title: "Scientific Significance", description: "Why this science matters to humanity" }
    ]
  },
  {
    id: "template_nonfiction_philosophy",
    title: "Philosophical Exploration",
    type: "Educational",
    category: "General",
    description: "A thoughtful examination of philosophical ideas, questions, and perspectives on life, reality, knowledge, or ethics.",
    structure: [
      { title: "Philosophical Question", description: "Introducing the central philosophical inquiry" },
      { title: "Historical Context", description: "Previous philosophical thinking on this topic" },
      { title: "Conceptual Foundations", description: "Basic concepts needed for understanding" },
      { title: "Main Argument", description: "The primary philosophical position presented" },
      { title: "Alternative Perspectives", description: "Other viewpoints on the same questions" },
      { title: "Logical Analysis", description: "Examining the reasoning and logic involved" },
      { title: "Practical Implications", description: "How these ideas affect real-life decisions" },
      { title: "Common Objections", description: "Addressing potential criticisms" },
      { title: "Case Examples", description: "Specific situations illustrating the philosophy" },
      { title: "Integration with Other Thought", description: "Connections to related philosophical areas" },
      { title: "Personal Application", description: "How readers might apply these ideas" },
      { title: "Ongoing Inquiry", description: "Questions that remain open for further exploration" }
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
  },
  {
    id: "template_educational_language",
    title: "Language Learning Guide",
    type: "Educational",
    category: "General",
    description: "A structured approach to learning a new language, with vocabulary, grammar, conversation, and cultural elements.",
    structure: [
      { title: "Language Introduction", description: "Overview of the language and its importance" },
      { title: "Pronunciation Guide", description: "How to correctly pronounce sounds and words" },
      { title: "Basic Vocabulary", description: "Essential words for beginners" },
      { title: "Fundamental Grammar", description: "Core grammatical concepts" },
      { title: "Simple Conversations", description: "Basic dialogues for everyday situations" },
      { title: "Cultural Context", description: "Cultural aspects relevant to language use" },
      { title: "Intermediate Vocabulary", description: "Expanding your word knowledge" },
      { title: "Advanced Grammar", description: "More complex language structures" },
      { title: "Practical Usage", description: "Using the language in real-world contexts" },
      { title: "Reading Comprehension", description: "Understanding written language" },
      { title: "Speaking Practice", description: "Exercises to improve verbal communication" },
      { title: "Language Mastery Path", description: "Next steps for continuing language development" }
    ]
  },
  {
    id: "template_educational_history",
    title: "Historical Period Study",
    type: "Educational",
    category: "General",
    description: "An educational exploration of a specific historical period, examining events, people, culture, and significance.",
    structure: [
      { title: "Period Overview", description: "Introduction to the historical era" },
      { title: "Historical Context", description: "What preceded and influenced this period" },
      { title: "Social Structure", description: "How society was organized" },
      { title: "Political Developments", description: "Governance and power dynamics" },
      { title: "Economic Systems", description: "How the economy functioned" },
      { title: "Cultural Expressions", description: "Art, literature, and other cultural elements" },
      { title: "Key Figures", description: "Important people of the period" },
      { title: "Pivotal Events", description: "Critical happenings that shaped the era" },
      { title: "Daily Life", description: "How ordinary people lived" },
      { title: "Technological Developments", description: "Scientific and technical advances" },
      { title: "Period Legacy", description: "How this era influenced what followed" },
      { title: "Historical Interpretation", description: "How historians view this period" }
    ]
  },
  {
    id: "template_educational_science",
    title: "Scientific Concept Guide",
    type: "Educational",
    category: "General",
    description: "An educational book explaining a scientific field or concept through clear explanations, examples, and applications.",
    structure: [
      { title: "Science Introduction", description: "Overview of the scientific area" },
      { title: "Basic Principles", description: "Fundamental scientific concepts" },
      { title: "Historical Development", description: "How understanding evolved over time" },
      { title: "Key Theories", description: "Major explanatory frameworks" },
      { title: "Evidence and Research", description: "How we know what we know" },
      { title: "Visual Explanations", description: "Diagrams and illustrations of concepts" },
      { title: "Practical Examples", description: "The science in everyday contexts" },
      { title: "Experimental Process", description: "How scientists investigate this area" },
      { title: "Common Misconceptions", description: "Correcting mistaken ideas" },
      { title: "Current Frontiers", description: "Ongoing research and discoveries" },
      { title: "Applied Science", description: "How these concepts are used in technology" },
      { title: "Scientific Impact", description: "How this science affects our world" }
    ]
  },
  {
    id: "template_educational_math",
    title: "Mathematics Explained",
    type: "Educational",
    category: "General",
    description: "A clear approach to teaching mathematical concepts, from basic principles to problem-solving applications.",
    structure: [
      { title: "Math Fundamentals", description: "Basic concepts that underpin the topic" },
      { title: "Key Definitions", description: "Essential terms and their meanings" },
      { title: "Visual Representations", description: "Graphs, diagrams, and visual aids" },
      { title: "Step-by-Step Processes", description: "Breaking down mathematical procedures" },
      { title: "Simple Examples", description: "Basic problems with complete solutions" },
      { title: "Common Mistakes", description: "Errors to avoid and how to prevent them" },
      { title: "Intermediate Problems", description: "More challenging examples" },
      { title: "Problem-Solving Strategies", description: "Approaches to tackling difficult problems" },
      { title: "Real-World Applications", description: "How these math concepts are used practically" },
      { title: "Connection to Other Math", description: "How this topic relates to other math areas" },
      { title: "Practice Problems", description: "Exercises for student practice" },
      { title: "Advanced Extensions", description: "Where this math leads at higher levels" }
    ]
  },
  {
    id: "template_educational_art",
    title: "Art and Design Instruction",
    type: "Educational",
    category: "General",
    description: "A guide teaching artistic techniques, principles, and creative development for a specific medium or approach.",
    structure: [
      { title: "Artistic Introduction", description: "Overview of the art form or medium" },
      { title: "Essential Materials", description: "Tools and supplies needed" },
      { title: "Basic Techniques", description: "Fundamental methods and skills" },
      { title: "Design Principles", description: "Core concepts of visual composition" },
      { title: "Demonstration Project", description: "A simple project with step-by-step guidance" },
      { title: "Common Challenges", description: "Typical difficulties and how to overcome them" },
      { title: "Skill Development", description: "Exercises to improve specific abilities" },
      { title: "Intermediate Techniques", description: "More advanced methods" },
      { title: "Artistic Expression", description: "Developing your personal style" },
      { title: "Inspiration Sources", description: "Where to find ideas and motivation" },
      { title: "Advanced Project", description: "A more complex creative undertaking" },
      { title: "Artistic Growth", description: "Continuing to develop as an artist" }
    ]
  },
  {
    id: "template_educational_music",
    title: "Music Education Guide",
    type: "Educational",
    category: "General",
    description: "An educational approach to learning music, whether for a specific instrument, music theory, or appreciation.",
    structure: [
      { title: "Musical Introduction", description: "Overview of the musical focus" },
      { title: "Fundamental Concepts", description: "Basic musical principles" },
      { title: "Notation and Reading", description: "Understanding written music" },
      { title: "Technique Foundations", description: "Essential skills and methods" },
      { title: "First Pieces/Exercises", description: "Initial practice material" },
      { title: "Common Challenges", description: "Typical learning obstacles and solutions" },
      { title: "Intermediate Concepts", description: "More advanced musical ideas" },
      { title: "Practice Strategies", description: "Effective ways to improve" },
      { title: "Musical Expression", description: "Developing interpretive skills" },
      { title: "Performance Preparation", description: "Getting ready to play for others" },
      { title: "Musical Repertoire", description: "Building a collection of pieces" },
      { title: "Continued Development", description: "Pathways for ongoing musical growth" }
    ]
  },
  {
    id: "template_educational_business",
    title: "Business Education Course",
    type: "Educational",
    category: "General",
    description: "A structured approach to teaching business concepts, strategies, and practices for students or professionals.",
    structure: [
      { title: "Business Fundamentals", description: "Core concepts in business" },
      { title: "Market Analysis", description: "Understanding business environments" },
      { title: "Organizational Structures", description: "How businesses are organized" },
      { title: "Financial Principles", description: "Basic business financial concepts" },
      { title: "Marketing Essentials", description: "Fundamentals of promoting business" },
      { title: "Operations Management", description: "Running business processes efficiently" },
      { title: "Business Strategy", description: "Planning for competitive advantage" },
      { title: "Case Studies", description: "Real-world business examples" },
      { title: "Problem-Solving Scenarios", description: "Applying concepts to business challenges" },
      { title: "Ethical Considerations", description: "Business ethics and responsibility" },
      { title: "Current Trends", description: "Contemporary business developments" },
      { title: "Business Plan Development", description: "Creating comprehensive business plans" }
    ]
  },
  {
    id: "template_educational_computer",
    title: "Computer Science Concepts",
    type: "Educational",
    category: "General",
    description: "An educational guide to computing concepts, programming, algorithms, or digital technologies.",
    structure: [
      { title: "Computing Introduction", description: "Overview of the computing topic" },
      { title: "Fundamental Concepts", description: "Basic principles in computing" },
      { title: "Technical Terminology", description: "Essential terms and definitions" },
      { title: "Logical Structures", description: "How computing logic works" },
      { title: "Practical Examples", description: "Concrete demonstrations of concepts" },
      { title: "Code Demonstrations", description: "Example code or algorithms" },
      { title: "Problem-Solving Approach", description: "Computational thinking methods" },
      { title: "Common Errors", description: "Typical mistakes and debugging" },
      { title: "Advanced Concepts", description: "More complex computing topics" },
      { title: "Project Application", description: "Applying knowledge to a project" },
      { title: "Technology Integration", description: "How this fits with other technologies" },
      { title: "Future Developments", description: "Emerging trends in this computing area" }
    ]
  },
  {
    id: "template_educational_social",
    title: "Social Sciences Framework",
    type: "Educational",
    category: "General",
    description: "An educational exploration of human society, behavior, and relationships through one of the social science disciplines.",
    structure: [
      { title: "Social Concept Introduction", description: "Overview of the social science area" },
      { title: "Theoretical Frameworks", description: "Key theories and approaches" },
      { title: "Research Methodologies", description: "How social scientists investigate this area" },
      { title: "Historical Development", description: "How understanding has evolved" },
      { title: "Key Studies", description: "Important research and findings" },
      { title: "Cultural Factors", description: "How culture influences this aspect of society" },
      { title: "Individual and Society", description: "Relationship between personal and social" },
      { title: "Case Analysis", description: "Detailed examination of specific examples" },
      { title: "Contemporary Issues", description: "Current social challenges related to this area" },
      { title: "Critical Perspectives", description: "Alternative viewpoints and critiques" },
      { title: "Practical Applications", description: "How this knowledge is used in real settings" },
      { title: "Social Impact", description: "How this social science improves understanding" }
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
