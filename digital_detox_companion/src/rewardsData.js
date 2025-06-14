//
// Rewards data for Digital Detox Companion
// Central source of truth for all motivational, playful, and milestone rewards.
//

/**
 * Digital detox rewards reflecting achievements, milestones, and playful moments.
 * - Variety: Experiential, habit, physical, social, creative, just-for-fun, and lifestyle rewards.
 * - Each has: id, name, unlock criteria, icon
 * - Add more by expanding the array below.
 */
export const rewardsList = [
  // Early basics & streak starters
  { id: 1, name: "Coffee Voucher", unlocked: true, desc: "Earned at 3-day streak", icon: "☕" },
  { id: 2, name: "Gift Card", unlocked: false, desc: "7 days offline streak", icon: "🎟️" },
  { id: 3, name: "Outdoor Yoga Pass", unlocked: false, desc: "Try 2 off-grid activities", icon: "🧘" },
  { id: 4, name: "Sunset Picnic Kit", unlocked: false, desc: "10 check-ins before sunset", icon: "🧺" },
  { id: 5, name: "Bookstore Credit", unlocked: false, desc: "Finish a week of reduced screen time", icon: "📚" },

  // Playful/creative
  { id: 6, name: "Art Supply Bundle", unlocked: false, desc: "Create an offline hobby entry", icon: "🎨" },
  { id: 7, name: "Movie Night Pass", unlocked: false, desc: "Host a device-free night", icon: "🍿" },
  { id: 8, name: "Nature Escape Guide", unlocked: true, desc: "Check-in at 3 outdoor locations", icon: "🌲" },
  { id: 9, name: "Spa Day At Home", unlocked: false, desc: "Log 5 journal reflections", icon: "🛁" },
  { id: 10, name: "Buddy High-Five Badge", unlocked: true, desc: "5-day mutual streak with buddy", icon: "🖐️" },

  // Social, gratitude, encouragement
  { id: 11, name: "Handwritten Postcard", unlocked: false, desc: "Send a gratitude message offline", icon: "💌" },
  { id: 12, name: "DIY Craft Kit", unlocked: false, desc: "Win a mini detox game", icon: "✂️" },
  { id: 13, name: "Personalized Playlist", unlocked: false, desc: "Try 3 new offline activities", icon: "🎶" },
  { id: 14, name: "\"Offline Chef\" Apron", unlocked: false, desc: "Cook a meal with friends", icon: "👩‍🍳" },
  { id: 15, name: "Confetti Celebration!", unlocked: true, desc: "Complete any journey milestone", icon: "🎊" },

  // Motivational and achievement-based
  { id: 16, name: "Screen-Free Sunrise", unlocked: false, desc: "Start your day device-free 5 times", icon: "🌅" },
  { id: 17, name: "90 Minutes for Nature", unlocked: false, desc: "90 min outside with phone off", icon: "🌻" },
  { id: 18, name: "Detox Legend Trophy", unlocked: false, desc: "All milestones for a month", icon: "🏆" },
  { id: 19, name: "Offline Game Night", unlocked: false, desc: "Organize a board game night", icon: "🎲" },
  { id: 20, name: "Photo Scavenger Hunt", unlocked: false, desc: "Capture 7 real moments, no filters", icon: "📷" },

  // Mindfulness & habit rewards
  { id: 21, name: "Gratitude Shout-out", unlocked: false, desc: "Thank 3 people in person", icon: "🙏" },
  { id: 22, name: "Zen Master Badge", unlocked: false, desc: "Meditate 5 days, screen-free", icon: "🧘‍♂️" },
  { id: 23, name: "Analog Artist", unlocked: false, desc: "Complete a painting/sketch offline", icon: "🎨" },
  { id: 24, name: "Buddy Uplifter Award", unlocked: false, desc: "Send 3 buddy encouragements", icon: "🥇" },
  { id: 25, name: "Sleep Champion", unlocked: false, desc: "No screens 1 hr before bed, 7 days", icon: "😴" },

  // Local/social adventure, milestone triggers
  { id: 26, name: "Backyard Explorer", unlocked: false, desc: "Try a new neighborhood activity", icon: "🧭" },
  { id: 27, name: "Tech-Free Adventure", unlocked: false, desc: "Spend a full day offline!", icon: "🚴" },
  { id: 28, name: "Thank Yourself Badge", unlocked: false, desc: "Reflect on progress in journal", icon: "🎖️" },
  { id: 29, name: "Offline Socialite", unlocked: false, desc: "Host a meetup, no devices", icon: "🤗" },
  { id: 30, name: "Streak Starter", unlocked: false, desc: "First day without social media", icon: "🌱" },

  // Playful, hands-on, variety
  { id: 31, name: "Joyful Juggler", unlocked: false, desc: "Try a hands-on skill (juggle/sculpt)", icon: "🤹" },
  { id: 32, name: "Tea Time", unlocked: false, desc: "Unplugged tea (or coffee) break", icon: "🫖" },
  { id: 33, name: "Boardwalk Walker", unlocked: false, desc: "Walk in silence, phone at home", icon: "🚶" },
  { id: 34, name: "Offline Explorer Patch", unlocked: false, desc: "Visit a new local spot", icon: "🗺️" },
  { id: 35, name: "Stargazing Night", unlocked: false, desc: "15m outdoors after dark, no phone", icon: "🌠" },

  // Connection and creative memory
  { id: 36, name: "Pen Pal", unlocked: false, desc: "Write and mail a real letter", icon: "✉️" },
  { id: 37, name: "Puzzle Pro", unlocked: false, desc: "Complete a 50+ piece puzzle, unplugged", icon: "🧩" },
  { id: 38, name: "Mindful Breather", unlocked: false, desc: "Breathing exercise (screen-free)", icon: "🫁" },
  { id: 39, name: "Sun Salutation", unlocked: false, desc: "Wake up & stretch, screens off", icon: "☀️" },
  { id: 40, name: "Detox Duo", unlocked: false, desc: "Complete a challenge with a buddy", icon: "👯" },

  // Cooking, kindness/mentorship, variety
  { id: 41, name: "Offline Chef Star", unlocked: false, desc: "Cook an entire meal, recipe offline", icon: "🍜" },
  { id: 42, name: "Kindness Champion", unlocked: false, desc: "5 random acts of kindness", icon: "💝" },
  { id: 43, name: "Detox Mentor", unlocked: false, desc: "Share detox tips with someone", icon: "🤓" },
  { id: 44, name: "Confetti Spark!", unlocked: true, desc: "Unlock any 10 rewards", icon: "✨" },
  { id: 45, name: "Memory Maker", unlocked: false, desc: "Create a scrapbook/photo album", icon: "📔" },
  { id: 46, name: "Cloud Watcher", unlocked: false, desc: "Cloud gazing, device-free", icon: "☁️" },
  { id: 47, name: "Urban Hiker", unlocked: false, desc: "10,000+ steps in a day—offline!", icon: "🥾" },
  { id: 48, name: "Offline Plant Parent", unlocked: false, desc: "Plant & care for something living", icon: "🪴" },
  { id: 49, name: "Silent Observer", unlocked: false, desc: "Nature time 15+ min, no devices", icon: "🦋" },
  { id: 50, name: "Celebration Parade!", unlocked: true, desc: "Reach a major milestone! 🎉", icon: "🥳" },

  // Further expansion: new themes for future proofing
  { id: 51, name: "Analog Alarmist", unlocked: false, desc: "Wake up using a real alarm", icon: "⏰" },
  { id: 52, name: "Bookworm Night", unlocked: false, desc: "Read a book, no screens for 2 hrs", icon: "🏕️" },
  { id: 53, name: "Device-Free Explorer", unlocked: false, desc: "Go out for a trip with no device", icon: "🚌" },
  { id: 54, name: "Zen Garden Moment", unlocked: false, desc: "Do gardening unplugged", icon: "🌱" },
  { id: 55, name: "Offline Comedian", unlocked: false, desc: "Host or attend a joke-telling night", icon: "😂" },
  { id: 56, name: "Secret Kindness Agent", unlocked: false, desc: "Do an anonymous good deed", icon: "🕵️" },
  { id: 57, name: "Board Game Completionist", unlocked: false, desc: "Complete 3 offline games", icon: "🎲" },
  { id: 58, name: "Offline Artist’s Date", unlocked: false, desc: "Dedicate a day for offline art", icon: "🎭" },
  { id: 59, name: "Digital Detox Guru", unlocked: false, desc: "Help 2 others start their journey", icon: "🧑‍🏫" },
  { id: 60, name: "Bucket List Break", unlocked: false, desc: "Try a bucket list activity offline", icon: "🪂" },
];
