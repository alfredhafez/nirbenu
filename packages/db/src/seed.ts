import { v4 as uuid } from 'uuid';

const BLOOD_GROUPS = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'] as const;
const DISTRICTS = ['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'] as const;
const AREAS: Record<string, string[]> = {
  Dhaka: ['Mirpur', 'Gulshan', 'Banani', 'Dhanmondi', 'Uttara', 'Mohammadpur', 'Bashundhara', 'Motijheel'],
  Chattogram: ['Agrabad', 'Nasirabad', 'GEC', 'Pahartali', 'Kotwali', 'Halishahar', 'Patenga'],
  Rajshahi: ['Shaheb Bazar', 'Uposhohor', 'Kazla', 'Padma', 'Binodpur'],
  Khulna: ['Sonadanga', 'Boyra', 'Khalishpur', 'Daulatpur', 'Fultala'],
  Barishal: ['Sadar Road', 'Nathullabad', 'Rupatali', 'Sagardi'],
  Sylhet: ['Zindabazar', 'Ambarkhana', 'Upashahar', 'Kumarpara', 'Subidbazar'],
  Rangpur: ['Dhap', 'Jahaj Company', 'Modern', 'Rail Station'],
  Mymensingh: ['Chorpara', 'Maskanda', 'Town Hall', 'Shombhuganj'],
};

const MALE_NAMES = [
  'Rafiq Islam', 'Tanvir Ahmed', 'Shakil Hasan', 'Masud Rana', 'Faisal Karim',
  'Arif Hossain', 'Kabir Uddin', 'Nayeem Rahman', 'Sajid Khan', 'Imran Chowdhury',
  'Rashedul Alam', 'Sifat Mahmud', 'Abir Talukder', 'Junaid Sarker', 'Mehedi Hassan',
];
const FEMALE_NAMES = [
  'Nusrat Jahan', 'Farzana Akter', 'Tasnim Rahman', 'Sadia Islam', 'Rafia Sultana',
  'Maliha Tabassum', 'Fabiha Noor', 'Samira Yasmin', 'Ayesha Siddiqua', 'Tahia Rahman',
  'Nazia Khanam', 'Arifa Jahan', 'Rodela Fatima', 'Humaira Ahmed', 'Zara Talukder',
];

const BLOG_CATEGORIES = [
  { name: 'Blood Awareness', slug: 'blood-awareness' },
  { name: 'Donation Stories', slug: 'donation-stories' },
  { name: 'Health Tips', slug: 'health-tips' },
  { name: 'Community', slug: 'community' },
  { name: 'Events', slug: 'events' },
];

const BLOG_POSTS_TEMPLATES = [
  {
    title: 'Why Blood Donation is a Gift of Life',
    slug: 'why-blood-donation-is-a-gift-of-life',
    content: `Blood donation is one of the most selfless acts a person can perform. Every few seconds, someone somewhere needs blood. It could be a mother giving birth, a child fighting cancer, or a victim of an accident. Your single donation can save up to three lives.

    In Bangladesh, the demand for blood is constant and growing. Hospitals need blood daily for surgeries, emergencies, and treatments. Yet, less than 1% of the eligible population donates blood. This gap between demand and supply is where community platforms like Nirbenu make a difference.

    When you donate blood, you're not just giving a biological substance — you're giving someone more time with their family, another birthday, another chance. Blood cannot be manufactured; it can only come from generous donors like you.`,
    excerpt: 'Discover how a single blood donation can save up to three lives and why community blood donation platforms are crucial for bridging the gap between demand and supply.',
    category: 'blood-awareness',
    tags: ['blood donation', 'life saving', 'awareness'],
    published: true,
  },
  {
    title: 'The Science Behind Blood Groups: A Complete Guide',
    slug: 'science-behind-blood-groups',
    content: `Understanding blood groups is essential for both donors and recipients. The ABO blood group system, discovered by Karl Landsteiner in 1901, categorizes blood into four main types: A, B, AB, and O. Each type can be either Rh-positive or Rh-negative, giving us the eight blood groups we recognize today.

    Blood group O-negative is known as the universal donor because it can be given to patients of any blood type in emergencies. On the other hand, AB-positive individuals are universal recipients.

    In Bangladesh, the most common blood groups are B-positive and O-positive, while AB-negative is the rarest. Knowing your blood type is the first step toward becoming an informed donor. Platforms like Nirbenu make it easy to connect donors with matching blood types to recipients in need.`,
    excerpt: 'Learn about the ABO blood group system, universal donors, common blood types in Bangladesh, and why knowing your blood type matters.',
    category: 'blood-awareness',
    tags: ['blood groups', 'science', 'education'],
    published: true,
  },
  {
    title: 'Rafiq\'s Story: How One Donation Saved a Mother of Three',
    slug: 'rafiqs-story-one-donation-saved-mother',
    content: `Last December, Rafiq Islam received an emergency notification on the Nirbenu app. A mother of three in Dhaka Medical College Hospital needed B-negative blood urgently — a rare blood type in Bangladesh. Without hesitation, Rafiq rushed to the hospital.

    "I didn't think twice," Rafiq recalls. "I saw the notification and knew I had to help. When I arrived, the family was desperate. The woman had complications during surgery and needed blood immediately."

    Rafiq donated one unit of blood. The surgery was successful, and the mother recovered fully. Today, Rafiq has donated blood 15 times and continues to be an active donor on the platform.

    Stories like these remind us why community blood donation platforms are vital. Every donor has the potential to be someone's hero.`,
    excerpt: 'Read how Rafiq Islam responded to an emergency notification and saved a mother of three with his rare B-negative blood donation.',
    category: 'donation-stories',
    tags: ['donor story', 'emergency', 'inspiration'],
    published: true,
  },
  {
    title: 'Nusrat\'s Journey: From First-Time Donor to Gold Rank',
    slug: 'nusrats-journey-first-time-to-gold',
    content: `When Nusrat Jahan first donated blood five years ago, she was nervous. "I was scared of needles," she admits. "But knowing someone needed my help gave me courage."

    That first donation sparked a commitment that has now seen Nusrat donate 28 times, earning her the Gold Donor rank on Nirbenu. She has also become an advocate for blood donation, regularly organizing awareness camps and encouraging her friends and colleagues to register as donors.

    "The ranking system on Nirbenu is a nice motivation," she says. "But the real reward is knowing that somewhere, someone is alive because of you."

    Nusrat's advice to first-time donors: "It's normal to feel nervous. The process is quick and safe. The feeling you get afterward — knowing you've done something truly meaningful — is indescribable."`,
    excerpt: 'Follow Nusrat Jahan\'s inspiring journey from a nervous first-time donor to a Gold-ranked donor who has saved countless lives.',
    category: 'donation-stories',
    tags: ['donor story', 'women donors', 'ranking'],
    published: true,
  },
  {
    title: 'What to Eat Before and After Donating Blood',
    slug: 'what-to-eat-before-after-blood-donation',
    content: `Proper nutrition is essential for a safe and comfortable blood donation experience. What you eat before and after donating can significantly impact how you feel during recovery.

    **Before Donation:**
    - Iron-rich foods: leafy greens, red meat, beans, lentils
    - Vitamin C foods (helps iron absorption): oranges, strawberries, bell peppers
    - Plenty of water (at least 500ml before donation)
    - Avoid fatty foods (can affect blood testing)

    **After Donation:**
    - Continue drinking extra fluids for 24-48 hours
    - Eat iron-rich meals for the next few days
    - Include complex carbs: rice, bread, potatoes
    - Avoid heavy exercise for 24 hours
    - Avoid alcohol for at least 24 hours

    Remember, your body replaces the plasma within 24 hours and red blood cells within 4-6 weeks. The 90-day recovery period ensures you're fully ready for your next donation.`,
    excerpt: 'A comprehensive guide on what to eat before and after blood donation, including iron-rich foods, hydration tips, and recovery nutrition advice.',
    category: 'health-tips',
    tags: ['nutrition', 'health', 'recovery', 'tips'],
    published: true,
  },
  {
    title: 'Building a Community of Life Savers in Bangladesh',
    slug: 'building-community-life-savers-bangladesh',
    content: `Nirbenu is more than just a blood donation platform — it's a growing community of life savers across Bangladesh. From Dhaka to Sylhet, from Chattogram to Rajshahi, thousands of donors have joined hands to ensure no one dies for lack of blood.

    Community-driven blood donation has several advantages:
    - **Faster Response**: Local donors can reach hospitals quickly
    - **Reliability**: Verified donors with track records
    - **Awareness**: Regular blood donation camps and events
    - **Trust**: Reviews and ranking systems ensure quality

    Our goal is to reach every district in Bangladesh with a network of active, willing donors. Whether you're a donor or a recipient, you're part of this community. Together, we can build a future where blood shortage is a thing of the past.`,
    excerpt: 'How Nirbenu is building a nationwide community of blood donors across Bangladesh, connecting local heroes with those in need.',
    category: 'community',
    tags: ['community', 'Bangladesh', 'social impact'],
    published: true,
  },
  {
    title: 'Myths and Facts About Blood Donation',
    slug: 'myths-facts-about-blood-donation',
    content: `There are many misconceptions about blood donation that prevent potential donors from stepping forward. Let's separate fact from fiction.

    **Myth 1: Donating blood is painful.**
    *Fact: You only feel a brief pinch when the needle is inserted. The actual donation is painless.*

    **Myth 2: I'm too old/young to donate.**
    *Fact: Anyone between 18-65 years who meets health criteria can donate.*

    **Myth 3: Donating blood will make me weak.**
    *Fact: Your body replaces the donated plasma within 24 hours. Most people resume normal activities immediately.*

    **Myth 4: Vegetarians can't donate.**
    *Fact: Vegetarians can absolutely donate! Just ensure adequate iron intake from plant sources.*

    **Myth 5: I can't donate if I have tattoos.**
    *Fact: You can donate 6 months after getting a tattoo from a licensed facility.*

    Don't let myths stop you from becoming a life saver. Consult with the Nirbenu platform or your nearest blood bank for accurate information.`,
    excerpt: 'Debunking common myths about blood donation — from pain concerns to eligibility questions — with evidence-based facts.',
    category: 'blood-awareness',
    tags: ['myths', 'facts', 'awareness', 'faq'],
    published: true,
  },
  {
    title: 'Upcoming Blood Donation Camp: Dhaka University 2026',
    slug: 'blood-donation-camp-dhaka-university-2026',
    content: `We're excited to announce our upcoming blood donation camp at Dhaka University!

    **Event Details:**
    - 📅 Date: June 15, 2026
    - ⏰ Time: 9:00 AM - 5:00 PM
    - 📍 Location: TSC Auditorium, Dhaka University
    - 🩸 Registration: Open to all eligible donors

    **What to Expect:**
    - Free health checkup for all donors
    - Professional medical staff and modern equipment
    - Refreshments and certificates for all participants
    - Special recognition for repeat donors

    Bring your student ID or NID. Walk-ins are welcome, but we encourage pre-registration through the Nirbenu platform to save time. Let's make this the biggest donation camp of the year!`,
    excerpt: 'Join us at Dhaka University on June 15, 2026 for a blood donation camp — free health checkups, certificates, and refreshments for all donors.',
    category: 'events',
    tags: ['blood camp', 'event', 'Dhaka University'],
    published: true,
  },
];

const REVIEW_COMMENTS = [
  'Very responsive and helpful donor. Came to the hospital within 30 minutes!',
  'Great person, donated blood for my father without any hesitation.',
  'Highly recommended donor. Very professional and caring.',
  'Responded quickly to our emergency request. Forever grateful.',
  'A true life saver. Donated blood for my sister during her surgery.',
  'Communication was smooth and the donor was very cooperative.',
  'Excellent donor, very punctual and helpful throughout the process.',
  'Blessed to have found this donor during our emergency.',
  'Very kind person, went above and beyond to help us.',
  'Reliable donor with a great attitude. Highly recommended.',
];

export function generateSeedData() {
  const now = new Date().toISOString();
  const userRows: string[] = [];
  const donorRows: string[] = [];
  const requestRows: string[] = [];
  const reviewRows: string[] = [];
  const blogCategoryRows: string[] = [];
  const blogPostRows: string[] = [];
  const settingRows: string[] = [];
  const favoriteRows: string[] = [];

  // Admin user
  const adminId = uuid();
  userRows.push(`INSERT INTO users (id, email, email_verified, name, phone, password_hash, role) VALUES ('${adminId}', 'admin@nirbenu.com', 1, 'Admin Nirbenu', '01710000001', '$2a$10$placeholder', 'admin');`);

  // Regular users + donors
  const allDonorData: { uid: string; name: string; blood: string; dist: string; area: string; gender: string; count: number; verified: boolean }[] = [];
  const allUserIds: string[] = [];

  // Create 30 donors with diverse data
  for (let i = 0; i < 15; i++) {
    const uid = uuid();
    const did = uid;
    const name = MALE_NAMES[i];
    const blood = BLOOD_GROUPS[i % BLOOD_GROUPS.length];
    const district = DISTRICTS[i % DISTRICTS.length];
    const area = AREAS[district][i % AREAS[district].length];
    const count = Math.floor(Math.random() * 30) + 1;
    const verified = i < 8;
    userRows.push(`INSERT INTO users (id, email, email_verified, name, phone, role) VALUES ('${uid}', 'donor${i + 1}@example.com', 1, '${name}', '0171${String(100000 + i * 111).slice(0, 8)}', 'donor');`);
    const lastDate = count > 0 ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 'NULL';
    const recoveryEnd = lastDate !== 'NULL'
      ? `'${new Date(new Date(lastDate).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}'`
      : 'NULL';
    const isRecovery = recoveryEnd !== 'NULL' && new Date(recoveryEnd.replace(/'/g, '')) > new Date() ? 'recovery' : 'available';

    donorRows.push(`INSERT INTO donors (id, blood_group, district, area, gender, last_donation_date, recovery_end_date, availability, donation_count, verified, ranking, response_rate, bio) VALUES ('${did}', '${blood}', '${district}', '${area}', 'male', ${lastDate === 'NULL' ? 'NULL' : `'${lastDate}'`}, ${recoveryEnd}, '${isRecovery}', ${count}, ${verified ? 1 : 0}, '${getRanking(count)}', ${Math.floor(Math.random() * 20) + 80}, 'Regular blood donor from ${area}, ${district}.');`);
    allDonorData.push({ uid, name, blood, dist: district, area, gender: 'male', count, verified });
    allUserIds.push(uid);
  }

  for (let i = 0; i < 15; i++) {
    const uid = uuid();
    const did = uid;
    const name = FEMALE_NAMES[i];
    const blood = BLOOD_GROUPS[(i + 3) % BLOOD_GROUPS.length];
    const district = DISTRICTS[(i + 2) % DISTRICTS.length];
    const area = AREAS[district][(i + 2) % AREAS[district].length];
    const count = Math.floor(Math.random() * 20) + 1;
    const verified = i < 6;
    userRows.push(`INSERT INTO users (id, email, email_verified, name, phone, role) VALUES ('${uid}', 'donorf${i + 1}@example.com', 1, '${name}', '0172${String(200000 + i * 111).slice(0, 8)}', 'donor');`);
    const lastDate = count > 0 ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 'NULL';
    const recoveryEnd = lastDate !== 'NULL'
      ? `'${new Date(new Date(lastDate).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}'`
      : 'NULL';
    const isRecovery = recoveryEnd !== 'NULL' && new Date(recoveryEnd.replace(/'/g, '')) > new Date() ? 'recovery' : 'available';

    donorRows.push(`INSERT INTO donors (id, blood_group, district, area, gender, last_donation_date, recovery_end_date, availability, donation_count, verified, ranking, response_rate, bio) VALUES ('${did}', '${blood}', '${district}', '${area}', 'female', ${lastDate === 'NULL' ? 'NULL' : `'${lastDate}'`}, ${recoveryEnd}, '${isRecovery}', ${count}, ${verified ? 1 : 0}, '${getRanking(count)}', ${Math.floor(Math.random() * 20) + 80}, 'Passionate about helping others through blood donation.');`);
    allDonorData.push({ uid, name, blood, dist: district, area, gender: 'female', count, verified });
    allUserIds.push(uid);
  }

  // Create 10 regular users (receivers)
  const regularUsers: string[] = [];
  for (let i = 0; i < 10; i++) {
    const uid = uuid();
    userRows.push(`INSERT INTO users (id, email, email_verified, name, phone, role) VALUES ('${uid}', 'user${i + 1}@example.com', 1, 'User ${100 + i}', '0173${String(300000 + i * 111).slice(0, 8)}', 'user');`);
    regularUsers.push(uid);
    allUserIds.push(uid);
  }

  // Blood requests
  for (let i = 0; i < 15; i++) {
    const rid = uuid();
    const requesterId = regularUsers[i % regularUsers.length];
    const bg = BLOOD_GROUPS[i % BLOOD_GROUPS.length];
    const urg = ['normal', 'urgent', 'emergency'][i % 3];
    const status = i < 8 ? ['active', 'fulfilled', 'pending'][i % 3] : 'pending';
    requestRows.push(`INSERT INTO blood_requests (id, requester_id, blood_group, hospital_name, location, urgency, status) VALUES ('${rid}', '${requesterId}', '${bg}', '${['Dhaka Medical College', 'Square Hospital', 'Apollo Hospital', 'LabAid', 'Birdem'][i % 5]}', '${['Dhaka', 'Chattogram', 'Rajshahi'][i % 3]}', '${urg}', '${status}');`);
  }

  // Reviews
  let reviewIdx = 0;
  for (const donor of allDonorData.slice(0, 20)) {
    const numReviews = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numReviews; j++) {
      const revId = uuid();
      const reviewerId = [...regularUsers, ...allUserIds.filter(u => u !== donor.uid)][reviewIdx % (regularUsers.length + allUserIds.length - 1)];
      reviewRows.push(`INSERT INTO donor_reviews (id, donor_id, user_id, rating, comment) VALUES ('${revId}', '${donor.uid}', '${reviewerId}', ${Math.floor(Math.random() * 2) + 4}, '${REVIEW_COMMENTS[reviewIdx % REVIEW_COMMENTS.length]}');`);
      reviewIdx++;
    }
  }

  // Blog categories
  const categoryIds: Record<string, string> = {};
  for (const cat of BLOG_CATEGORIES) {
    const cid = uuid();
    categoryIds[cat.slug] = cid;
    blogCategoryRows.push(`INSERT INTO blog_categories (id, name, slug) VALUES ('${cid}', '${cat.name}', '${cat.slug}');`);
  }

  // Blog posts
  for (const post of BLOG_POSTS_TEMPLATES) {
    const pid = uuid();
    const catId = post.category ? categoryIds[post.category] : 'NULL';
    const tags = JSON.stringify(post.tags);
    blogPostRows.push(`INSERT INTO blog_posts (id, author_id, title, slug, content, excerpt, category_id, tags, published, published_at) VALUES ('${pid}', '${adminId}', '${post.title.replace(/'/g, "''")}', '${post.slug}', '${post.content.replace(/'/g, "''")}', '${post.excerpt.replace(/'/g, "''")}', ${catId === 'NULL' ? 'NULL' : `'${catId}'`}, '${tags}', ${post.published ? 1 : 0}, '${now}');`);
  }

  // Site settings
  const settings: Record<string, string> = {
    site_name: 'Nirbenu',
    site_description: 'Modern Community Blood Donation Ecosystem — Connecting life savers across Bangladesh',
    site_logo: '/logo.svg',
    site_favicon: '/favicon.ico',
    primary_color: '#2563eb',
    accent_color: '#3b82f6',
    hero_title: 'Every Drop Saves a Life',
    hero_subtitle: 'Join Bangladesh\'s largest community of blood donors. Find donors near you or register to become a life saver.',
    about_text: 'Nirbenu is a community-driven blood donation platform connecting donors and recipients across Bangladesh.',
    contact_email: 'support@nirbenu.com',
    contact_phone: '+880 1710-000000',
    facebook_url: 'https://facebook.com/nirbenu',
    twitter_url: 'https://twitter.com/nirbenu',
    instagram_url: 'https://instagram.com/nirbenu',
    footer_text: '© 2026 Nirbenu. All rights reserved. Made with ❤️ in Bangladesh.',
    emergency_hotline: '+880 1710-000999',
    max_donors_per_page: '12',
    enable_google_oauth: 'true',
    enable_email_auth: 'true',
  };

  for (const [key, value] of Object.entries(settings)) {
    settingRows.push(`INSERT INTO site_settings (id, key, value) VALUES ('${uuid()}', '${key}', '${value.replace(/'/g, "''")}');`);
  }

  // Favorites (some users favorite some donors)
  for (let i = 0; i < 10; i++) {
    const fid = uuid();
    const uid = regularUsers[i % regularUsers.length];
    const donor = allDonorData[i];
    favoriteRows.push(`INSERT INTO favorites (id, user_id, donor_id) VALUES ('${fid}', '${uid}', '${donor.uid}');`);
  }

  return {
    users: userRows.join('\n'),
    donors: donorRows.join('\n'),
    requests: requestRows.join('\n'),
    reviews: reviewRows.join('\n'),
    blogCategories: blogCategoryRows.join('\n'),
    blogPosts: blogPostRows.join('\n'),
    settings: settingRows.join('\n'),
    favorites: favoriteRows.join('\n'),
  };
}

function getRanking(count: number): string {
  if (count >= 20) return 'life_saver';
  if (count >= 15) return 'hero';
  if (count >= 10) return 'gold';
  if (count >= 5) return 'silver';
  if (count >= 2) return 'bronze';
  return 'new';
}

// If run directly, output SQL
const data = generateSeedData();
const allSql = [
  '-- Nirbenu Seed Data',
  '',
  '-- Users (30 donors + 10 regular + 1 admin = 41 total)',
  data.users,
  '',
  '-- Donors',
  data.donors,
  '',
  '-- Blood Requests',
  data.requests,
  '',
  '-- Reviews',
  data.reviews,
  '',
  '-- Blog Categories',
  data.blogCategories,
  '',
  '-- Blog Posts',
  data.blogPosts,
  '',
  '-- Site Settings',
  data.settings,
  '',
  '-- Favorites',
  data.favorites,
].join('\n');

console.log(allSql);
