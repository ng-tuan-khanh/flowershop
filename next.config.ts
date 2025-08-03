module.exports = {
	images: {
		remotePatterns: [new URL("https://images.pexels.com/**")],
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
};
