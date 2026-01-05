export interface Testimonial {
	id: number;
	name: string;
	role: string;
	company: string;
	content: string;
	rating: number;
	date: string;
}

export const testimonialsData: Testimonial[] = [
	{
		id: 1,
		name: 'Seyfeddine Beroual',
		role: 'CEO',
		company: 'Lamsa Studio',
		content:
			'I needed to complete the programming of a React website, and while some might find the task unclear or difficult, Ramzy made my problem easy, simple, and very clear. The key reason I choose Ramzy for every programming project is his tight deadlines, high-quality work, and exceptional professionalism. Therefore, I recommend Ramzy if you want to work with peace of mind with an expert who knows their field well.',
		rating: 5,
		date: '2024-11'
	},
	{
		id: 2,
		name: 'Younes Feradji',
		role: 'Fullstack Instructor',
		company: 'Code213',
		content:
			'I had the pleasure of working alongside Ramzy both as a developer and as an instructor. I can confidently say that he is a highly skilled and collaborative person who consistently brings value to every project he’s part of.',
		rating: 5,
		date: '2024-10'
	},
	{
		id: 3,
		name: 'Massinissa Mouhoub',
		role: 'Senior Developer',
		company: 'YAY Global',
		content:
			'I had the pleasure of working with Ramzy at Slick Pay, a startup where we collaborated closely as part of the same team. I led the mobile development while Ramzy focused on the backend side of the application. Throughout our time working together, Ramzy proved to be dependable, professional, and highly committed to meeting deadlines. Our teamwork was seamless and effective, even when tackling real-world features under tight constraints.',
		rating: 5,
		date: '2025-05'
	}
];

export const testimonialsCode = `export interface Testimonial {
	id: number;
	name: string;
	role: string;
	company: string;
	avatar: string;
	content: string;
	rating: number;
	date: string;
}

export const testimonialsData: Testimonial[] = [
	{
		id: 1,
		name: 'Seyfeddine Beroual',
		role: 'CEO',
		company: 'Lamsa Studio',
		avatar:
			'https://media.licdn.com/dms/image/v2/C4E03AQEFIPQpSoMVtQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516989694227?e=1768435200&v=beta&t=gKoeV7BHyDhodP0w7YpBntrYo11MaBqDZ9wddydSFJI',
		content:
			'I needed to complete the programming of a React website, and while some might find the task unclear or difficult, Ramzy made my problem easy, simple, and very clear. The key reason I choose Ramzy for every programming project is his tight deadlines, high-quality work, and exceptional professionalism. Therefore, I recommend Ramzy if you want to work with peace of mind with an expert who knows their field well.',
		rating: 5,
		date: '2024-11'
	},
	{
		id: 2,
		name: 'Younes Feradji',
		role: 'Fullstack Instructor',
		company: 'Code213',
		avatar:
			'https://media.licdn.com/dms/image/v2/D4D03AQHlkUA04QTU6w/profile-displayphoto-shrink_800_800/B4DZOTStBxG0Ac-/0/1733342975732?e=1768435200&v=beta&t=h7POZSnOUY-UaGLgPZTcpH2_hBnEwW2-JFQ8lL7A4aE',
		content:
			'I had the pleasure of working alongside Ramzy both as a developer and as an instructor. I can confidently say that he is a highly skilled and collaborative person who consistently brings value to every project he’s part of.',
		rating: 5,
		date: '2024-10'
	},
	{
		id: 3,
		name: 'Massinissa Mouhoub',
		role: 'Senior Developer',
		company: 'YAY Global',
		avatar:
			'https://media.licdn.com/dms/image/v2/D4E03AQFBy-1oz67xIg/profile-displayphoto-shrink_800_800/B4EZV2fTtsGYAc-/0/1741449674113?e=1768435200&v=beta&t=iuYVs2h6UY8VX2zOmBX4SZMhXc9fM3Ft_6gxmvoueEY',
		content:
			'I had the pleasure of working with Ramzy at Slick Pay, a startup where we collaborated closely as part of the same team. I led the mobile development while Ramzy focused on the backend side of the application. Throughout our time working together, Ramzy proved to be dependable, professional, and highly committed to meeting deadlines. Our teamwork was seamless and effective, even when tackling real-world features under tight constraints.',
		rating: 5,
		date: '2025-05'
	}
];`;
