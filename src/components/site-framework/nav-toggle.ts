export {};

declare global {
  interface Window {
    NavToggleData: {
      triggerElements: NodeListOf<Element>;
      activeDropdowns: HTMLElement[];
      collapseTargetsList: HTMLElement[];
      desktopMode: boolean;
      toggleCollapse: (e: HTMLElement) => void;
      handleWindowResize: () => void;
      handleWindowClickCollapse: (event: MouseEvent) => void;
    };
  }
}

window.NavToggleData = {

  triggerElements: document.querySelectorAll("[data-collapse-target-id]"),
  
  activeDropdowns: [],
  collapseTargetsList: [],
  desktopMode: (window.matchMedia('(min-width: 768px)').matches) ? true : false,

  toggleCollapse: (e) => {
    
    // Handle expanding
    if (e.classList.contains("grid-rows-[0fr]")) {
      window.NavToggleData.activeDropdowns.push(e)
      e.classList.replace("grid-rows-[0fr]", "grid-rows-[1fr]")
    } 
    
    // Handle collapsing
    else if (e.classList.contains("grid-rows-[1fr]")) { 
      const index = window.NavToggleData.activeDropdowns.indexOf(e);
      if (index > -1) { 
        window.NavToggleData.activeDropdowns.splice(index, 1); 
      }
      e.classList.replace("grid-rows-[1fr]", "grid-rows-[0fr]")
    } 
    
  },

  handleWindowResize: () => {
    const newDesktopMode = (window.matchMedia('(min-width: 768px)').matches) ? true : false;
    // If transitioning to desktop mode, close open collapses
    if (newDesktopMode && !window.NavToggleData.desktopMode) {
      for (const activeDropdown of window.NavToggleData.activeDropdowns) {
        window.NavToggleData.toggleCollapse(activeDropdown)
      }
    }
    window.NavToggleData.desktopMode = newDesktopMode
  },

  handleWindowClickCollapse: (event: MouseEvent) => {
    const composedPath = event.composedPath()

    // Check through all open collapses
    for (const openCollapse of window.NavToggleData.activeDropdowns) {

      let closeCollapse = false;

      // If the open collapse is marked for closing
      if ( (window.NavToggleData.desktopMode && openCollapse.hasAttribute('data-clickout-close-desktop')) ||
        ((!window.NavToggleData.desktopMode) && openCollapse.hasAttribute('data-clickout-close-mobile')) ) {
        closeCollapse = true;
      }

      // If the collapse is in the composedPath, don't close it
      if (composedPath.includes(openCollapse)) {
        continue;
      }

      // Check to see if the composedPath includes the trigger button for the collapse
      for (const triggerElement of window.NavToggleData.triggerElements) {

        if (composedPath.includes(triggerElement)) {
          const collapseTargetId = triggerElement.getAttribute('data-collapse-target-id')
          const collapseTarget = document.getElementById(collapseTargetId)
          if (openCollapse === collapseTarget) {
            closeCollapse = false;
            break;
          }
        }
      }

      // At this point, the collapse should be closed
      closeCollapse && window.NavToggleData.toggleCollapse(openCollapse)
      
    }
  }

};

// Add window resize handler
addEventListener("resize", window.NavToggleData.handleWindowResize);
window.addEventListener("click", window.NavToggleData.handleWindowClickCollapse);


// Apply function to all toggle elements
for (const triggerElement of window.NavToggleData.triggerElements) {
  const collapseTargetId = triggerElement.getAttribute('data-collapse-target-id')
  const collapseTarget = document.getElementById(collapseTargetId)
  if (collapseTarget) {
    window.NavToggleData.collapseTargetsList.push(collapseTarget)
    triggerElement.addEventListener("click", () => window.NavToggleData.toggleCollapse(collapseTarget));
  }
}