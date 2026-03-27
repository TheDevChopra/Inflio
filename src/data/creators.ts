export type Platform = "Instagram" | "YouTube" | "X";
export type Niche = "Fitness" | "Skincare" | "Finance" | "Tech" | "Fashion" | "Food" | "Comedy";

export interface Creator {
  id: string;
  name: string;
  username: string;
  platform: Platform;
  niche: Niche;
  followers: number;
  engagementRate: number;
  weeklyGrowth: number;
  recentViralPosts: number;
  profileImage: string;
  location: string;
  isRealCreator?: boolean;
}

export const creators: Creator[] = [
  // FITNESS
  { id: "fit1", name: "Jitendra Chouksey", username: "fittrwithsquats", platform: "Instagram", niche: "Fitness", followers: 152000, engagementRate: 3.2, weeklyGrowth: 4.5, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg", location: "India", isRealCreator: true },
  { id: "fit2", name: "Yash Sharma", username: "yashsharmaphysique", platform: "YouTube", niche: "Fitness", followers: 45000, engagementRate: 9.5, weeklyGrowth: 15.2, recentViralPosts: 4, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg", location: "India", isRealCreator: true },
  { id: "fit3", name: "Sahil Khan", username: "sahil_khan", platform: "Instagram", niche: "Fitness", followers: 185000, engagementRate: 2.1, weeklyGrowth: 2.3, recentViralPosts: 0, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg", location: "India", isRealCreator: true },
  { id: "fit4", name: "Neha Fitness", username: "fitwithneha", platform: "Instagram", niche: "Fitness", followers: 12500, engagementRate: 14.2, weeklyGrowth: 21.0, recentViralPosts: 6, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg", location: "India", isRealCreator: true },
  { id: "fit5", name: "Coach Avinash", username: "coach_avinash", platform: "Instagram", niche: "Fitness", followers: 32000, engagementRate: 11.5, weeklyGrowth: 12.4, recentViralPosts: 3, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/4.jpg", location: "India", isRealCreator: true },
  { id: "fit6", name: "The Urban Fight", username: "theurbanfight", platform: "YouTube", niche: "Fitness", followers: 140000, engagementRate: 4.5, weeklyGrowth: 5.2, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg", location: "India", isRealCreator: true },
  { id: "fit7", name: "Gunjan Fitness", username: "gunjanfitness", platform: "Instagram", niche: "Fitness", followers: 28000, engagementRate: 13.0, weeklyGrowth: 18.5, recentViralPosts: 5, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/3.jpg", location: "India", isRealCreator: true },
  { id: "fit8", name: "Rishabh Info", username: "rishabhfitnessofficial", platform: "Instagram", niche: "Fitness", followers: 48000, engagementRate: 8.8, weeklyGrowth: 9.1, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg", location: "India", isRealCreator: true },

  // SKINCARE / BEAUTY
  { id: "ski1", name: "Nivedita", username: "skincarebynive", platform: "Instagram", niche: "Skincare", followers: 15000, engagementRate: 15.2, weeklyGrowth: 24.5, recentViralPosts: 8, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/4.jpg", location: "India", isRealCreator: true },
  { id: "ski2", name: "Anindita Chatterjee", username: "aninditachatterjee", platform: "Instagram", niche: "Skincare", followers: 85000, engagementRate: 5.2, weeklyGrowth: 6.8, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/5.jpg", location: "India", isRealCreator: true },
  { id: "ski3", name: "Arshia Beauty", username: "beautybyarshia", platform: "YouTube", niche: "Skincare", followers: 110000, engagementRate: 3.8, weeklyGrowth: 4.1, recentViralPosts: 0, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/6.jpg", location: "India", isRealCreator: true },
  { id: "ski4", name: "Riya Glow", username: "glowwithriya", platform: "Instagram", niche: "Skincare", followers: 22000, engagementRate: 12.5, weeklyGrowth: 16.0, recentViralPosts: 4, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/7.jpg", location: "India", isRealCreator: true },
  { id: "ski5", name: "Nitika Makeup", username: "makeupbynitika", platform: "Instagram", niche: "Skincare", followers: 42000, engagementRate: 9.2, weeklyGrowth: 11.5, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/8.jpg", location: "India", isRealCreator: true },
  { id: "ski6", name: "Lipstick Diaries", username: "thelipstickdiaries", platform: "Instagram", niche: "Skincare", followers: 165000, engagementRate: 2.8, weeklyGrowth: 3.5, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/9.jpg", location: "India", isRealCreator: true },
  { id: "ski7", name: "Dr G", username: "skinbydrg", platform: "Instagram", niche: "Skincare", followers: 155000, engagementRate: 3.0, weeklyGrowth: 3.8, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/6.jpg", location: "India", isRealCreator: true },
  { id: "ski8", name: "Sana Beauty", username: "beautywithsana", platform: "Instagram", niche: "Skincare", followers: 31000, engagementRate: 10.5, weeklyGrowth: 14.1, recentViralPosts: 3, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/10.jpg", location: "India", isRealCreator: true },

  // FINANCE / EDUCATION
  { id: "fin1", name: "Pranjal Kamra", username: "pranjalkamra", platform: "YouTube", niche: "Finance", followers: 195000, engagementRate: 4.1, weeklyGrowth: 5.5, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/7.jpg", location: "India", isRealCreator: true },
  { id: "fin2", name: "Sharan Hegde", username: "financewithsharan", platform: "Instagram", niche: "Finance", followers: 180000, engagementRate: 5.5, weeklyGrowth: 8.2, recentViralPosts: 4, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/8.jpg", location: "India", isRealCreator: true },
  { id: "fin3", name: "Ankur Warikoo", username: "warikoo", platform: "Instagram", niche: "Finance", followers: 198000, engagementRate: 3.5, weeklyGrowth: 4.5, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/9.jpg", location: "India", isRealCreator: true },
  { id: "fin4", name: "Rishabh Jain", username: "ca_rishabhjain", platform: "X", niche: "Finance", followers: 24000, engagementRate: 11.2, weeklyGrowth: 17.5, recentViralPosts: 5, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/10.jpg", location: "India", isRealCreator: true },
  { id: "fin5", name: "Asset Yogi", username: "assetyogi", platform: "YouTube", niche: "Finance", followers: 165000, engagementRate: 5.0, weeklyGrowth: 6.8, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/11.jpg", location: "India", isRealCreator: true },
  { id: "fin6", name: "Sid Invests", username: "investwithsid", platform: "Instagram", niche: "Finance", followers: 14000, engagementRate: 14.8, weeklyGrowth: 22.1, recentViralPosts: 7, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/12.jpg", location: "India", isRealCreator: true },
  { id: "fin7", name: "Monika Halan", username: "moneywithmonika", platform: "X", niche: "Finance", followers: 65000, engagementRate: 7.2, weeklyGrowth: 8.5, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/11.jpg", location: "India", isRealCreator: true },

  // TECH / AI
  { id: "tech1", name: "Tech Burner", username: "techburner", platform: "YouTube", niche: "Tech", followers: 195000, engagementRate: 6.2, weeklyGrowth: 7.5, recentViralPosts: 4, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/13.jpg", location: "India", isRealCreator: true },
  { id: "tech2", name: "Gadget Byte", username: "gadgetbyte", platform: "YouTube", niche: "Tech", followers: 85000, engagementRate: 5.8, weeklyGrowth: 8.1, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/14.jpg", location: "India", isRealCreator: true },
  { id: "tech3", name: "Tech Bar", username: "techbar", platform: "Instagram", niche: "Tech", followers: 110000, engagementRate: 4.5, weeklyGrowth: 5.2, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/15.jpg", location: "India", isRealCreator: true },
  { id: "tech4", name: "Trakin Tech", username: "trakintech", platform: "YouTube", niche: "Tech", followers: 175000, engagementRate: 5.1, weeklyGrowth: 6.4, recentViralPosts: 3, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/16.jpg", location: "India", isRealCreator: true },
  { id: "tech5", name: "Beebom", username: "beebomco", platform: "Instagram", niche: "Tech", followers: 190000, engagementRate: 4.8, weeklyGrowth: 5.5, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/17.jpg", location: "India", isRealCreator: true },
  { id: "tech6", name: "Tech YTs", username: "techyoutubers", platform: "Instagram", niche: "Tech", followers: 12000, engagementRate: 13.5, weeklyGrowth: 20.0, recentViralPosts: 5, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/18.jpg", location: "India", isRealCreator: true },
  { id: "tech7", name: "Raj Tech", username: "techwithraj", platform: "YouTube", niche: "Tech", followers: 34000, engagementRate: 10.2, weeklyGrowth: 13.5, recentViralPosts: 3, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/19.jpg", location: "India", isRealCreator: true },

  // FASHION / LIFESTYLE
  { id: "fash1", name: "Kritika Khurana", username: "kritikakhurana", platform: "Instagram", niche: "Fashion", followers: 185000, engagementRate: 3.8, weeklyGrowth: 4.1, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/12.jpg", location: "India", isRealCreator: true },
  { id: "fash2", name: "Boho Girl", username: "thatbohogirl", platform: "Instagram", niche: "Fashion", followers: 190000, engagementRate: 4.2, weeklyGrowth: 5.0, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/13.jpg", location: "India", isRealCreator: true },
  { id: "fash3", name: "Komal Pandey", username: "komalpandeyofficial", platform: "Instagram", niche: "Fashion", followers: 195000, engagementRate: 5.5, weeklyGrowth: 6.2, recentViralPosts: 4, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/14.jpg", location: "India", isRealCreator: true },
  { id: "fash4", name: "Sakshi Sindwani", username: "sakshisindwani", platform: "Instagram", niche: "Fashion", followers: 120000, engagementRate: 5.1, weeklyGrowth: 7.2, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/15.jpg", location: "India", isRealCreator: true },
  { id: "fash5", name: "House of Misu", username: "houseofmisu", platform: "Instagram", niche: "Fashion", followers: 155000, engagementRate: 3.5, weeklyGrowth: 4.0, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/16.jpg", location: "India", isRealCreator: true },
  { id: "fash6", name: "Aashna Shroff", username: "aashnashroff", platform: "Instagram", niche: "Fashion", followers: 170000, engagementRate: 4.0, weeklyGrowth: 5.1, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/17.jpg", location: "India", isRealCreator: true },
  { id: "fash7", name: "Juhi Godambe", username: "juhi.godambe", platform: "Instagram", niche: "Fashion", followers: 145000, engagementRate: 4.5, weeklyGrowth: 5.5, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/18.jpg", location: "India", isRealCreator: true },

  // FOOD
  { id: "food1", name: "Your Food Lab", username: "yourfoodlab", platform: "YouTube", niche: "Food", followers: 195000, engagementRate: 6.5, weeklyGrowth: 7.2, recentViralPosts: 5, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/20.jpg", location: "India", isRealCreator: true },
  { id: "food2", name: "Chef Kunal", username: "chefkunal", platform: "Instagram", niche: "Food", followers: 180000, engagementRate: 5.2, weeklyGrowth: 6.0, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/21.jpg", location: "India", isRealCreator: true },
  { id: "food3", name: "Street Food India", username: "streetfoodofindia", platform: "YouTube", niche: "Food", followers: 150000, engagementRate: 7.5, weeklyGrowth: 9.1, recentViralPosts: 4, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/22.jpg", location: "India", isRealCreator: true },
  { id: "food4", name: "Foodie Incarnate", username: "foodie_incarnate", platform: "Instagram", niche: "Food", followers: 165000, engagementRate: 6.8, weeklyGrowth: 8.5, recentViralPosts: 3, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/23.jpg", location: "India", isRealCreator: true },
  { id: "food5", name: "Zingy Zest", username: "zingyzest", platform: "Instagram", niche: "Food", followers: 125000, engagementRate: 5.5, weeklyGrowth: 6.5, recentViralPosts: 1, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/19.jpg", location: "India", isRealCreator: true },
  { id: "food6", name: "Dilse Foodie", username: "dilsefoodie", platform: "YouTube", niche: "Food", followers: 140000, engagementRate: 7.1, weeklyGrowth: 8.2, recentViralPosts: 3, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/24.jpg", location: "India", isRealCreator: true },

  // COMEDY / CONTENT
  { id: "com1", name: "Bhuvan Bam", username: "bhuvan.bam22", platform: "YouTube", niche: "Comedy", followers: 198000, engagementRate: 8.5, weeklyGrowth: 9.2, recentViralPosts: 6, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/25.jpg", location: "India", isRealCreator: true },
  { id: "com2", name: "Ashish Chanchlani", username: "ashishchanchlani", platform: "YouTube", niche: "Comedy", followers: 195000, engagementRate: 8.0, weeklyGrowth: 8.5, recentViralPosts: 5, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/26.jpg", location: "India", isRealCreator: true },
  { id: "com3", name: "Harsh Beniwal", username: "harshbeniwal", platform: "YouTube", niche: "Comedy", followers: 185000, engagementRate: 7.5, weeklyGrowth: 8.0, recentViralPosts: 4, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/27.jpg", location: "India", isRealCreator: true },
  { id: "com4", name: "Zakir Khan", username: "zakirkhan_208", platform: "Instagram", niche: "Comedy", followers: 190000, engagementRate: 6.8, weeklyGrowth: 7.1, recentViralPosts: 3, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/28.jpg", location: "India", isRealCreator: true },
  { id: "com5", name: "Tanmay Bhat", username: "tanmaybhat", platform: "YouTube", niche: "Comedy", followers: 188000, engagementRate: 7.8, weeklyGrowth: 9.5, recentViralPosts: 5, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/29.jpg", location: "India", isRealCreator: true },
  { id: "com6", name: "Prajakta Koli", username: "mostlysane", platform: "Instagram", niche: "Comedy", followers: 175000, engagementRate: 5.5, weeklyGrowth: 6.2, recentViralPosts: 2, profileImage: "https://xsgames.co/randomusers/assets/avatars/female/20.jpg", location: "India", isRealCreator: true },
  { id: "com7", name: "Funny Indian", username: "funnyindian", platform: "Instagram", niche: "Comedy", followers: 25000, engagementRate: 14.2, weeklyGrowth: 22.5, recentViralPosts: 8, profileImage: "https://xsgames.co/randomusers/assets/avatars/male/30.jpg", location: "India", isRealCreator: true },
];
