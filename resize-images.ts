import sharp from "sharp";
import path from "path";
import fs from "fs";

// Input image path
const inputImage = "src/assets/hero-background.webp";

// Output directory
const outputDir = "public";

// Sizes to generate
const sizes: number[] = [640, 960, 1280, 1920];

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

async function generateImages() {
	try {
		await Promise.all(
			sizes.map(async (size) => {
				const outputPath = path.join(outputDir, `poster-${size}.webp`);

				await sharp(inputImage)
					.resize({ width: size })
					.toFormat("webp", { quality: 70 })
					.toFile(outputPath);

				console.log(`✅ Generated: ${outputPath}`);
			}),
		);

		console.log("🎉 All images generated successfully!");
	} catch (error) {
		console.error("❌ Error generating images:", error);
	}
}

generateImages();
