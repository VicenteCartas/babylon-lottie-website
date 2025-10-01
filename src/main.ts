import { LocalPlayer } from "@babylonjs/lottie-player/localPlayer";
import type { RawLottieAnimation } from "@babylonjs/lottie-player/parsing/rawTypes";
import { DecodeQspStringToObject } from "./utils";

/**
 * Main entry point for the default scene for lottie-player
 */
export async function main(): Promise<void> {
    const rawParams = new URLSearchParams(window.location.search);
    const searchParams = new URLSearchParams();
    rawParams.forEach((value, key) => searchParams.set(key.toLowerCase(), value));

    const div = document.getElementById("main-div") as HTMLDivElement; // The player will be inside this div

    // File to render
    const filename = searchParams.get("file") || "./triangles_noParents_noCross.json";
    const fileUrl = `./${filename}`;

    // Whether to use the file URL for the data or to parse the data in the devhost, defaults to true (use the file URL)
    const useUrlParam = searchParams.get("useurl");
    const useUrl = useUrlParam !== "false"; // Default to true if not specified

    // Whether variables are present in the URL to be used for the animation
    const urlVariables = searchParams.get("variables");
    const variables = new Map<string, string>();
    if (urlVariables) {
        const parsedVariables = DecodeQspStringToObject(urlVariables);
        for (const [key, value] of Object.entries(parsedVariables)) {
            variables.set(key, value as string);
        }
    }

    let animationData: RawLottieAnimation | undefined = undefined;
    if (!useUrl) {
        const data = await (await fetch(fileUrl)).text();
        animationData = JSON.parse(data) as RawLottieAnimation;
    }

    // This is the configuration for the player, you can pass as much or as little as you want, the rest will be defaulted
    const configuration = {
        loopAnimation: false, // By default do not loop animations
        backgroundColor: { r: 0, g: 0, b: 0, a: 0 }, // Background color for the animation canvas
        devicePixelRatio: Math.ceil(window.devicePixelRatio), // Scale factor,
    };

    // Create the player and play the animation
    const player = new LocalPlayer();
    await player.playAnimationAsync({ container: div, animationSource: useUrl ? fileUrl : (animationData as RawLottieAnimation), variables, configuration });
}

// Automatically run the main entry point when the module loads
// (Vite loads this file via index.html script tag)
void main();
