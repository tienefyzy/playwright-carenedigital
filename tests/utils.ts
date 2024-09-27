export async function loadModule(templatePath: string) {
    try {
        const module = await import(templatePath);
        const { sharedTest, Test } = module;
        return { sharedTest, Test };
    } catch (error) {
        console.error("Error loading module:", error);
        throw error;
    }
}