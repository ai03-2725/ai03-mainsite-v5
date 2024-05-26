window.NavToggleData = {};

NavToggleData.activeDropdown = null
NavToggleData.collapseTargetsList = []

// Toggle function
NavToggleData.toggleMobileNavbar = (e) => {
  if (e.classList.contains("grid-rows-[0fr]")) {
    e.classList.replace("grid-rows-[0fr]", "grid-rows-[1fr]")
  } else if (e.classList.contains("grid-rows-[1fr]")) { 
    e.classList.replace("grid-rows-[1fr]", "grid-rows-[0fr]")
  } else {
    console.error(`Collapse target element has neither 0fr or 1fr set`)
  }
}

// Handle window resizes
NavToggleData.handleWindowResize = () => {
  NavToggleData.desktopMode = (window.matchMedia('(min-width: 768px)').matches) ? true : false;
  console.log(NavToggleData.desktopMode)
}

// Add window resize handler
addEventListener("resize", NavToggleData.handleWindowResize);


// Apply function to all toggle elements
const triggerElements = document.querySelectorAll("[data-collapse-target-id]")
for (const triggerElement of triggerElements) {
  const collapseTargetId = triggerElement.getAttribute('data-collapse-target-id')
  const collapseTarget = document.getElementById(collapseTargetId)
  if (collapseTarget) {
    NavToggleData.collapseTargetsList.push(collapseTarget)
    triggerElement.addEventListener("click", () => NavToggleData.toggleMobileNavbar(collapseTarget));
    console.log(`Trigger registered for collapse target ${collapseTargetId}`)
  } else {
    console.error(`Couldn't find collapse target ${collapseTargetId}`)
  }
}