document.addEventListener("DOMContentLoaded", () => {
    const dateElement = document.querySelector(".date span");
    const options = { weekday: "long", month: "long", day: "numeric" };
    const currentDate = new Date();
  
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
  
    const day = currentDate.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
  

    const correctedDate = formattedDate.replace(",", "") + suffix;

    dateElement.textContent = correctedDate;
  });
  