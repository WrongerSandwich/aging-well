const filterButtons = document.querySelectorAll(".filter");
const findings = document.querySelectorAll(".finding");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    findings.forEach((finding) => {
      const visible = button.dataset.filter === "all" || finding.dataset.category === button.dataset.filter;
      finding.classList.toggle("hidden", !visible);
    });
  });
});

document.querySelectorAll(".detail-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const finding = button.closest(".finding");
    const isOpen = finding.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.firstChild.textContent = isOpen ? "Hide evidence " : "View evidence ";
  });
});
