const titles = {
    fc1: "예다함FC(공제회)",
    fc2: "예다함FC(일반)",
    employee: "예다함 임직원",
    director: "장례지도사",
    assistant: "장례도우미",
    thek: "The-K가족",
    lotte: "롯데백화점",
    
  };

  const params = new URLSearchParams(window.location.search);
  const type = params.get("prod");

  const title = document.getElementById("page-title");

  title.textContent = titles[type] || "예다함";