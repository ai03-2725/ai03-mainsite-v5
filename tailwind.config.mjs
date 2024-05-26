/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'"Inter Variable", sans-serif',
					{
						// fontFeatureSettings: '"cv11", "ss01"',
						// fontVariationSettings: '"opsz" 32'
					},
				],
			}
		},
	},
	plugins: [require('@tailwindcss/typography'),],
}
