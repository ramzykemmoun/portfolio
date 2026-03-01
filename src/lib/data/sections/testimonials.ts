export interface Testimonial {
	id: number;
	name: string;
	role: string;
	company: string;
	content: string;
	rating: number;
}

export const testimonialsData: Testimonial[] = [
	{
		id: 0,
		name: 'Achraf Saidi',
		role: 'CTO',
		company: 'Novalis AI',
		content:
			'I worked with Ramzy on a web development project and was extremely satisfied. He is professional, reliable, proactive, and communicates clearly. The final website exceeded our expectations in design, performance, and user experience, I highly recommend him and look forward to working with him again.',
		rating: 5,
	}, {
		id: 1,
		name: 'Seyfeddine Beroual',
		role: 'CEO',
		company: 'Lamsa Studio',
		content:
			'I needed to complete the programming of a React website, and while some might find the task unclear or difficult, Ramzy made my problem easy, simple, and very clear. The key reason I choose Ramzy for every programming project is his tight deadlines, high-quality work, and exceptional professionalism. Therefore, I recommend Ramzy if you want to work with peace of mind with an expert who knows their field well.',
		rating: 5,
	},
	{
		id: 2,
		name: 'Assem Zerreg',
		role: 'Tech Lead',
		company: 'Mizaniya Pay',
		content:
			'As Ramzy’s tech lead, I can confidently say he is a hard-working and highly performative developer. He consistently delivers quality work, shows strong ownership, and has great potential. I would highly recommend working with him, both professionally and personally, as he is also a genuinely good and reliable person.',
		rating: 5,
	},
	{
		id: 3,
		name: 'Younes Feradji',
		role: 'Fullstack Instructor',
		company: 'Code213',
		content:
			'I had the pleasure of working alongside Ramzy both as a developer and as an instructor. I can confidently say that he is a highly skilled and collaborative person who consistently brings value to every project he’s part of.',
		rating: 5,
	},
	{
		id: 4,
		name: 'Massinissa Mouhoub',
		role: 'Senior Developer',
		company: 'YAY Global',
		content:
			'I had the pleasure of working with Ramzy at Slick Pay, a startup where we collaborated closely as part of the same team. I led the mobile development while Ramzy focused on the backend side of the application. Throughout our time working together, Ramzy proved to be dependable, professional, and highly committed to meeting deadlines. Our teamwork was seamless and effective, even when tackling real-world features under tight constraints.',
		rating: 5,
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
		id: 0,
		name: 'Achraf Saidi',
		role: 'CTO',
		company: 'Novalis AI',
		content:
		'I worked with Ramzy on a web development project and was extremely satisfied. He is professional, reliable, proactive, and communicates clearly. The final website exceeded our expectations in design, performance, and user experience, I highly recommend him and look forward to working with him again.',
 		rating: 5,
	}, {
		id: 1,
		name: 'Seyfeddine Beroual',
		role: 'CEO',
		company: 'Lamsa Studio',
		content:
			'I needed to complete the programming of a React website, and while some might find the task unclear or difficult, Ramzy made my problem easy, simple, and very clear. The key reason I choose Ramzy for every programming project is his tight deadlines, high-quality work, and exceptional professionalism. Therefore, I recommend Ramzy if you want to work with peace of mind with an expert who knows their field well.',
		rating: 5,
	},
	{
		id: 2,
		name: 'Assem Zerreg',
		role: 'Tech Lead',
		company: 'Mizaniya Pay',
		content:
			'As Ramzy’s tech lead, I can confidently say he is a hard-working and highly performative developer. He consistently delivers quality work, shows strong ownership, and has great potential. I would highly recommend working with him, both professionally and personally, as he is also a genuinely good and reliable person.',
		rating: 5,
	},
	{
		id: 3,
		name: 'Younes Feradji',
		role: 'Fullstack Instructor',
		company: 'Code213',
		content:
			'I had the pleasure of working alongside Ramzy both as a developer and as an instructor. I can confidently say that he is a highly skilled and collaborative person who consistently brings value to every project he’s part of.',
		rating: 5,
	},
	{
		id: 4,
		name: 'Massinissa Mouhoub',
		role: 'Senior Developer',
		company: 'YAY Global',
		content:
			'I had the pleasure of working with Ramzy at Slick Pay, a startup where we collaborated closely as part of the same team. I led the mobile development while Ramzy focused on the backend side of the application. Throughout our time working together, Ramzy proved to be dependable, professional, and highly committed to meeting deadlines. Our teamwork was seamless and effective, even when tackling real-world features under tight constraints.',
		rating: 5,
	}
];`;
