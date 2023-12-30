async function updateCategory(categoryId, categoryName) {
    try {
        console.log("function called")
        const response = await fetch(`/updatecat?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Error updating category");
        }

        console.log("Category updated successfully");
    } catch (error) {
        console.error(error);
    }
}