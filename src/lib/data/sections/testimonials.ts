export interface Testimonial {
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
		name: 'Sophie Martin',
		role: 'Product Manager',
		company: 'TechCorp',
		avatar: 'https://i.pravatar.cc/150?img=1',
		content:
			'Ramzy is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving skills are remarkable. He transformed our project vision into reality with impressive efficiency.',
		rating: 5,
		date: '2024-11'
	},
	{
		id: 2,
		name: 'Alexandre Dubois',
		role: 'CTO',
		company: 'StartupFlow',
		avatar: 'https://i.pravatar.cc/150?img=3',
		content:
			'Working with Ramzy was a game-changer for our startup. His technical expertise and creative approach helped us build a scalable architecture from scratch. Highly recommended!',
		rating: 5,
		date: '2024-10'
	},
	{
		id: 3,
		name: 'Emma Bernard',
		role: 'Design Lead',
		company: 'CreativeHub',
		avatar: 'https://i.pravatar.cc/150?img=5',
		content:
			'Ramzy bridges the gap between design and development beautifully. He understands UI/UX principles and translates designs into pixel-perfect implementations. A pleasure to collaborate with!',
		rating: 5,
		date: '2024-09'
	},
	{
		id: 4,
		name: 'Lucas Moreau',
		role: 'Senior Developer',
		company: 'CodeFactory',
		avatar: 'https://i.pravatar.cc/150?img=8',
		content:
			'I had the pleasure of mentoring Ramzy early in his career. His growth has been phenomenal - he now leads complex projects with confidence and delivers outstanding results consistently.',
		rating: 5,
		date: '2024-08'
	},
	{
		id: 5,
		name: 'Camille Laurent',
		role: 'Project Director',
		company: 'DigitalAgency',
		avatar: 'https://i.pravatar.cc/150?img=9',
		content:
			"Ramzy's communication skills and technical prowess make him an invaluable team member. He meets deadlines, handles feedback gracefully, and always goes the extra mile.",
		rating: 5,
		date: '2024-07'
	}
];

export const testimonialsCode = `// testimonials.json
{
  "totalReviews": ${testimonialsData.length},
  "averageRating": 5.0,
  "clients": [
${testimonialsData.map((t) => `    "${t.company}"`).join(',\n')}
  ],
  "status": "trusted_by_many"
}`;
