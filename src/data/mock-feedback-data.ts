export interface PostStatus {
  id: string;
  name: string;
  color: string;
  position: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  is_admin?: boolean;
  avatar_url?: string;
}

export interface FeedbackPost {
  id: string;
  title: string;
  description: string;
  status: PostStatus;
  category: Category;
  tags: Tag[];
  vote_count: number;
  comment_count: number;
  created_at: string;
  author_name: string;
  author_email: string; // for avatar generation
  comments?: Comment[];
}

export const MOCK_STATUSES: PostStatus[] = [
  { id: 's1', name: 'Open', color: '#6B7280', position: 1 },       // Gray
  { id: 's2', name: 'Under Review', color: '#3B82F6', position: 2 }, // Blue
  { id: 's3', name: 'Planned', color: '#8B5CF6', position: 3 },     // Purple
  { id: 's4', name: 'In Progress', color: '#F59E0B', position: 4 }, // Amber
  { id: 's5', name: 'Complete', color: '#10B981', position: 5 },    // Green
  { id: 's6', name: 'Closed', color: '#EF4444', position: 6 },      // Red
];

export const MOCK_TAGS: Tag[] = [
  { id: 't1', name: 'Feature', color: 'blue' },
  { id: 't2', name: 'Bug', color: 'red' },
  { id: 't3', name: 'Improvement', color: 'green' },
  { id: 't4', name: 'UI/UX', color: 'purple' },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Dashboard' },
  { id: 'c2', name: 'Reports' },
  { id: 'c3', name: 'Integrations' },
  { id: 'c4', name: 'Account' },
  { id: 'c5', name: 'Mobile App' },
];

export const MOCK_POSTS: FeedbackPost[] = [
  {
    id: '1',
    title: 'Add dark mode support',
    description: 'It would be great to have a dark mode for late night work sessions. The current white theme is too bright.',
    status: MOCK_STATUSES[2], // Planned
    category: MOCK_CATEGORIES[0], // Dashboard
    tags: [MOCK_TAGS[0], MOCK_TAGS[3]], // Feature, UI/UX
    vote_count: 47,
    comment_count: 12,
    created_at: '2023-10-25T10:00:00Z',
    author_name: 'Sarah Johnson',
    author_email: 'sarah@example.com',
    comments: [
        { id: 'cm1', author_name: 'Admin', author_email: 'admin@scalerbox.com', content: 'Great idea! We are adding this to our roadmap.', created_at: '2023-10-26T09:00:00Z', is_admin: true },
        { id: 'cm2', author_name: 'Mike', author_email: 'mike@test.com', content: '+1 for this. My eyes hurt.', created_at: '2023-10-26T10:30:00Z' }
    ]
  },
  {
    id: '2',
    title: 'Export to CSV',
    description: 'We need to export our monthly reports to CSV to import them into Excel for further analysis.',
    status: MOCK_STATUSES[0], // Open
    category: MOCK_CATEGORIES[1], // Reports
    tags: [MOCK_TAGS[0]], // Feature
    vote_count: 34,
    comment_count: 8,
    created_at: '2023-10-20T14:30:00Z',
    author_name: 'John Smith',
    author_email: 'john@example.com'
  },
  {
    id: '3',
    title: 'Slack Integration',
    description: 'Notify a Slack channel when a new lead is generated. This is critical for our sales team response time.',
    status: MOCK_STATUSES[3], // In Progress
    category: MOCK_CATEGORIES[2], // Integrations
    tags: [MOCK_TAGS[0], MOCK_TAGS[2]], // Feature, Improvement
    vote_count: 89,
    comment_count: 24,
    created_at: '2023-09-15T09:15:00Z',
    author_name: 'Emily Davis',
    author_email: 'emily@techcorp.com'
  },
  {
    id: '4',
    title: 'Fix mobile layout on iPhone 14',
    description: 'The sidebar overlaps with the content on smaller screens. Screenshot attached.',
    status: MOCK_STATUSES[4], // Complete
    category: MOCK_CATEGORIES[4], // Mobile App
    tags: [MOCK_TAGS[1]], // Bug
    vote_count: 15,
    comment_count: 3,
    created_at: '2023-10-28T11:20:00Z',
    author_name: 'David Wilson',
    author_email: 'david@mobile.com'
  },
  {
    id: '5',
    title: 'Two-Factor Authentication (2FA)',
    description: 'Please add 2FA support using Google Authenticator for better security.',
    status: MOCK_STATUSES[1], // Under Review
    category: MOCK_CATEGORIES[3], // Account
    tags: [MOCK_TAGS[0]], // Feature
    vote_count: 56,
    comment_count: 10,
    created_at: '2023-10-05T16:45:00Z',
    author_name: 'Security Team',
    author_email: 'sec@bank.com'
  },
  {
    id: '6',
    title: 'Bulk delete users',
    description: 'I have to delete spam users one by one. Please allow bulk selection.',
    status: MOCK_STATUSES[0], // Open
    category: MOCK_CATEGORIES[0], // Dashboard
    tags: [MOCK_TAGS[2]], // Improvement
    vote_count: 22,
    comment_count: 5,
    created_at: '2023-10-29T08:00:00Z',
    author_name: 'Admin User',
    author_email: 'admin@corp.com'
  },
  {
    id: '7',
    title: 'Zapier Integration',
    description: 'Would love to connect this to Zapier to automate workflows.',
    status: MOCK_STATUSES[2], // Planned
    category: MOCK_CATEGORIES[2], // Integrations
    tags: [MOCK_TAGS[0]], // Feature
    vote_count: 41,
    comment_count: 7,
    created_at: '2023-09-20T13:10:00Z',
    author_name: 'Automation Pro',
    author_email: 'auto@zap.com'
  },
  {
    id: '8',
    title: 'PDF Invoice Download',
    description: 'Currently invoices are only sent via email. I need to download them from the dashboard.',
    status: MOCK_STATUSES[4], // Complete
    category: MOCK_CATEGORIES[3], // Account
    tags: [MOCK_TAGS[2]], // Improvement
    vote_count: 18,
    comment_count: 2,
    created_at: '2023-08-10T10:00:00Z',
    author_name: 'Finance Dept',
    author_email: 'finance@money.com'
  },
  {
    id: '9',
    title: 'Custom Domain Support',
    description: 'Allow us to use our own domain (CNAME) for the public portal.',
    status: MOCK_STATUSES[3], // In Progress
    category: MOCK_CATEGORIES[3], // Account
    tags: [MOCK_TAGS[0]], // Feature
    vote_count: 105,
    comment_count: 45,
    created_at: '2023-07-01T09:00:00Z',
    author_name: 'SaaS Founder',
    author_email: 'founder@saas.com'
  },
  {
    id: '10',
    title: 'API Documentation',
    description: 'The current API docs are outdated. Please update them.',
    status: MOCK_STATUSES[0], // Open
    category: MOCK_CATEGORIES[2], // Integrations
    tags: [MOCK_TAGS[2]], // Improvement
    vote_count: 9,
    comment_count: 1,
    created_at: '2023-11-01T15:30:00Z',
    author_name: 'Dev Guy',
    author_email: 'dev@code.com'
  },
  {
    id: '11',
    title: 'Search functionality is slow',
    description: 'Searching for users takes over 5 seconds when you have > 1000 users.',
    status: MOCK_STATUSES[1], // Under Review
    category: MOCK_CATEGORIES[0], // Dashboard
    tags: [MOCK_TAGS[1]], // Bug
    vote_count: 28,
    comment_count: 6,
    created_at: '2023-10-15T11:00:00Z',
    author_name: 'Performance Tester',
    author_email: 'qa@test.com'
  },
  {
    id: '12',
    title: 'Add French Language',
    description: 'We have many customers in France. Need localization.',
    status: MOCK_STATUSES[2], // Planned
    category: MOCK_CATEGORIES[3], // Account
    tags: [MOCK_TAGS[0]], // Feature
    vote_count: 14,
    comment_count: 2,
    created_at: '2023-09-05T14:00:00Z',
    author_name: 'Pierre',
    author_email: 'pierre@france.com'
  },
  {
    id: '13',
    title: 'Webhook for "New Comment"',
    description: 'I want to be notified via webhook when someone comments on a post.',
    status: MOCK_STATUSES[0], // Open
    category: MOCK_CATEGORIES[2], // Integrations
    tags: [MOCK_TAGS[0]], // Feature
    vote_count: 7,
    comment_count: 0,
    created_at: '2023-11-02T10:00:00Z',
    author_name: 'Hook Master',
    author_email: 'hook@web.com'
  },
  {
    id: '14',
    title: 'Login page styling issue',
    description: 'The logo is stretched on Safari browser.',
    status: MOCK_STATUSES[5], // Closed (won't fix or duplicate)
    category: MOCK_CATEGORIES[3], // Account
    tags: [MOCK_TAGS[1]], // Bug
    vote_count: 3,
    comment_count: 1,
    created_at: '2023-10-12T09:00:00Z',
    author_name: 'Designer',
    author_email: 'design@creative.com'
  },
  {
    id: '15',
    title: 'Kanban view for tasks',
    description: 'List view is boring. Give us a Trello-like board.',
    status: MOCK_STATUSES[3], // In Progress
    category: MOCK_CATEGORIES[0], // Dashboard
    tags: [MOCK_TAGS[0], MOCK_TAGS[3]], // Feature, UI/UX
    vote_count: 67,
    comment_count: 19,
    created_at: '2023-08-20T16:00:00Z',
    author_name: 'Project Manager',
    author_email: 'pm@agile.com'
  }
];

export const MOCK_BOARD_SETTINGS = {
  name: 'Product Feedback',
  description: 'Help us build the best product for you. Vote on features you want to see next.',
  privacy: 'public',
  allow_anonymous: false,
  require_email_voting: true,
  show_vote_count: true,
  show_voter_list: true,
  show_timestamps: true,
  allow_comments_public: true,
  allow_create_post: true,
  anonymize_users: false,
  index_in_search: true,
  show_on_homepage: true,
  allowed_domains: [],
  notifications: {
    email_on_submission: true,
    email_threshold_10: false,
    email_threshold_25: true,
    email_on_comment: true,
    user_status_change: true,
    user_admin_reply: true,
  }
};
