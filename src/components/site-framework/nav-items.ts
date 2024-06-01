export type NavEntry = {
  type: "LEAF";
  title: string;
  url: string;
} | {
  type: "LIST";
  title: string;
  children: NavEntry[];
} | {
  type: "DIVIDER";
}

// For desktop, truncate at 4 first entries at top + rest as a dropdown under "Other"
export const NAV_ENTRIES_ROOT: NavEntry = {

  type: "LIST",
  title: "",
  children: [

    // Projects
    {
      type: "LIST",
      title: "Projects",
      children: [
        {
          type: "LEAF",
          title: "Portfolio",
          url: "/collections/",
        },
        {
          type: "DIVIDER",
        },
        {
          type: "LEAF",
          title: "Project Updates",
          url: "/updates/"
        },
        {
          type: "LEAF",
          title: "Downloads and Manuals",
          url: "/resources/"
        },
        {
          type: "DIVIDER",
        },
        {
          type: "LEAF",
          title: "Designer Tools and Resources",
          url: "/designer-resources/",
        }
      ]
    },
    // Info
    {
      type: "LIST",
      title: "News",
      children: [
        {
          type: "LEAF",
          title: "Announcements",
          url: "/news/"
        },
        {
          type: "LEAF",
          title: "Blog",
          url: "/blog/"
        },
      ]
    },
    // Discord
    {
      type: "LEAF",
      title: "Discord",
      url: "/discord/"
    },
    // Social
    {
      type: "LEAF",
      title: "Social",
      url: "/social/"
    },
    // About
    {
      type: "LIST",
      title: "About",
      children: [
        {
          type: "LEAF",
          title: "About",
          url: "/about/"
        },
        {
          type: "LEAF",
          title: "Contact",
          url: "/contact/"
        }
      ]
    },
  ]
}