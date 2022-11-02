const commentEl = document.getElementById("comment-input"); // grab comment text input
const commentBtn = document.getElementById("post-btn"); // reference post comment button
const cardEl = document.getElementById("card-div-main");

commentBtn.addEventListener("click", async (event) => {
  const commentText = commentEl.value;
  const blogId = cardEl.dataset.blogid;
  // user_id from req, blog_id from fetch
  console.log(commentText, blogId);
  // send comment to route to upload into database
  const response = await fetch("/api/blog/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blogId: blogId, comment: commentText }),
  });

  if (response.ok) {
    console.log(`Comment added to blog ${blogId}`);
    document.location.reload();
  } else {
    alert(response.statusText);
  }
});
