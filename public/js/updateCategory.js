async function updateCategory(categoryId, categoryname) {

    const categoryName = categoryname.toLowerCase()
    console.log(categoryName);

    try {
        console.log("function called")
        const response = await fetch(`/updatecat?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`, {
            method: "GET",
        });

        if (!response) {
            throw new Error("Error updating category");
        }
        const message = await response.json({});
        console.log(message)
        if(message.message == "alreadyexist"){
            Swal.fire({
                icon:"Error",
                title:"product already exists"
            })
        }else{
            console.log("Category updated successfully");
            

        }
            
            

        
    } catch (error) {
        console.error(error);
    }
}