//Client side front-end file for home
$(document).ready(()=>{
    //get posts from database
    $.get("/api/posts", (results)=>{
        outputPosts(results,$(".postsContainer"))
    })
})

function outputPosts(results,container){
    container.html("")

    results.forEach(result => {
        var html = createPostHtml(result)
        container.append(html)
    });

    if(results.length == 0){
        container.append("<span class='noResults'>Nothing Here.</span>")
    }
}