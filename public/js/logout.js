const logoutBtn = document.getElementById("logout-btn");

// This method is called when user click on logout button
const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
};

logoutBtn.addEventListener("click", logout);
