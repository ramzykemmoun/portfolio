<script lang="ts">
	import react from '$lib/assets/icons/react.svg';
	import ts from '$lib/assets/icons/typescript.svg';
	import js from '$lib/assets/icons/javascript.svg';
	import css from '$lib/assets/icons/css.svg';
	import reactTs from '$lib/assets/icons/react_ts.svg';
	import json from '$lib/assets/icons/json.svg';
	import git from '$lib/assets/icons/git.svg';
	import html from '$lib/assets/icons/html.svg';
	import java from '$lib/assets/icons/java.svg';
	import svelte from '$lib/assets/icons/svelte.svg';
	import dart from '$lib/assets/icons/dart.svg';
	import md from '$lib/assets/icons/markdown.svg';
	import nodejs from '$lib/assets/icons/nodejs.svg';
	import nextjs from '$lib/assets/icons/next.svg';
	import settings from '$lib/assets/icons/settings.svg';
	import folderComponent from '$lib/assets/icons/folder-components.svg';
	import folderNodeModules from '$lib/assets/icons/folder-node.svg';
	import folderSrc from '$lib/assets/icons/folder-src.svg';
	import folderAssets from '$lib/assets/icons/folder-config.svg';
	import folderPublic from '$lib/assets/icons/folder-public.svg';
	import fastapi from '$lib/assets/icons/fastapi.svg';
	import python from '$lib/assets/icons/python.svg';
	import cpp from '$lib/assets/icons/cpp.svg';
	import langchain from '$lib/assets/icons/langchain.svg';
	import psql from '$lib/assets/icons/psql.svg';
	import mysql from '$lib/assets/icons/mysql.svg';
	import mongodb from '$lib/assets/icons/mongodb.svg';
	import redis from '$lib/assets/icons/redis.svg';
	import supabase from '$lib/assets/icons/supabase.svg';
	import prisma from '$lib/assets/icons/prisma.svg';
	import graphql from '$lib/assets/icons/graphql.svg';
	import tailwindcss from '$lib/assets/icons/tailwindcss.svg';
	import instagram from '$lib/assets/icons/instagram.svg';
	import llms from '$lib/assets/icons/llms.svg';
	import teaching from '$lib/assets/icons/teaching.svg';
	import flutter from '$lib/assets/icons/flutter.svg';
	import scikitLearn from '$lib/assets/icons/scikit-learn.svg';
	import pandas from '$lib/assets/icons/pandas.svg';
	import tensorflow from '$lib/assets/icons/tensorflow.svg';
	import aiAutomation from '$lib/assets/icons/ai-automation.svg';
	import agenticAi from '$lib/assets/icons/agentic-ai.svg';
	import github from '$lib/assets/icons/github.svg';
	import copilot from '$lib/assets/icons/copilot.svg';
	import cursor from '$lib/assets/icons/cursor.svg';
	import elm from '$lib/assets/icons/elm.svg';
	import drone from '$lib/assets/icons/drone.svg';
	import modernizr from '$lib/assets/icons/modernizr.svg';
	import shellcheck_light from '$lib/assets/icons/shellcheck_light.svg';
	import semantic_release from '$lib/assets/icons/semantic-release.svg';
	import xmake from '$lib/assets/icons/xmake.svg';
	import karma from '$lib/assets/icons/karma.svg';
	import kcl from '$lib/assets/icons/kcl.svg';
	import prettier from '$lib/assets/icons/prettier.svg';
	import eslint from '$lib/assets/icons/eslint.svg';

	let { icon, size = 18 }: { icon: string; size?: number } = $props();

	function getIcon(ext: string): string {
		switch (ext) {
			case 'jsx':
				return react;
			case 'tsx':
				return reactTs;
			case 'json':
				return json;
			case 'ts':
				return ts;
			case 'js':
			case 'mjs':
				return js;
			case 'git':
				return git;
			case 'css':
				return css;
			case 'md':
				return md;
			case 'nodejs':
				return nodejs;
			case 'nextjs':
				return nextjs;
			case 'env':
				return settings;
			case 'folder-component':
				return folderComponent;
			case 'folder-node_modules':
				return folderNodeModules;
			case 'folder-src':
				return folderSrc;
			case 'folder-assets':
				return folderAssets;
			case 'folder-public':
				return folderPublic;
			case 'python':
				return python;
			case 'cpp':
				return cpp;
			case 'java':
				return java;
			case 'dart':
				return dart;
			case 'svelte':
				return svelte;
			case 'fastapi':
				return fastapi;
			case 'langchain':
				return langchain;
			case 'psql':
				return psql;
			case 'mysql':
				return mysql;
			case 'mongodb':
				return mongodb;
			case 'redis':
				return redis;
			case 'supabase':
				return supabase;
			case 'prisma':
				return prisma;
			case 'tailwindcss':
				return tailwindcss;
			case 'graphql':
				return graphql;
			case 'copilot':
				return copilot;
			case 'github':
				return github;
			case 'cursor':
				return cursor;
			case 'html':
				return html;
			case 'instagram':
				return instagram;
			case 'llms':
				return llms;
			case 'elm':
				return elm;
			case 'drone':
				return drone;
			case 'modernizr':
				return modernizr;
			case 'shellcheck_light':
				return shellcheck_light;
			case 'xmake':
				return xmake;
			case 'karma':
				return karma;
			case 'kcl':
				return kcl;
			case 'semantic_release':
				return semantic_release;
			case 'teaching':
				return teaching;
			case 'flutter':
				return flutter;
			case 'scikit-learn':
				return scikitLearn;
			case 'pandas':
				return pandas;
			case 'tensorflow':
				return tensorflow;
			case 'ai-automation':
				return aiAutomation;
			case 'agentic-ai':
				return agenticAi;
			case 'prettier':
				return prettier;
			case 'eslint':
				return eslint;
			default:
				return react;
		}
	}
	let src = $derived(getIcon(icon));
</script>

<div>
	<img {src} alt={icon} width={size} height={size} />
</div>
