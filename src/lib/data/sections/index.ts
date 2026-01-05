import { skillsCode } from './skills';
import { aboutMeCode } from './about-me';
import { educationCode } from './education';
import { experiencesCode } from './experience';
import { projectsCode } from './projects';
import { testimonialsCode } from './testimonials';
import {
	envCode,
	nextConfig,
	readme,
	jsonPackage,
	packageLockJson,
	tsconfigJson,
	tailwindConfig,
	postcssConfig,
	gitignore,
	globalCss
} from '../codes';

export const sectionCodes = {
	skills: skillsCode,
	aboutMe: aboutMeCode,
	education: educationCode,
	experiences: experiencesCode,
	projects: projectsCode,
	testimonials: testimonialsCode,
	env: envCode,
	readme,
	nextConfig,
	jsonPackage,
	packageLockJson,
	tsconfigJson,
	tailwindConfig,
	postcssConfig,
	gitignore,
	'src/global.css': globalCss
};
