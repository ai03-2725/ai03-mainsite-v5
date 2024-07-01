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
      type: "LEAF",
      title: "Projects",
      url: "/collections/"
    },

    // Blog
    {
      type: "LEAF",
      title: "Blog",
      url: "/blog/"
    },

    // Social
    {
      type: "LEAF",
      title: "Social",
      url: "/social/"
    },

    // Info
    {
      type: "LIST",
      title: "Info",
      children: [
        {
          type: "LEAF",
          title: "Project Updates",
          url: "/updates/",
        },
        {
          type: "LEAF",
          title: "Downloads and Manuals",
          url: "/downloads/",
        },
        {
          type: "DIVIDER",
        },
        {
          type: "LEAF",
          title: "Guides and FAQ",
          url: "/info/",
        },
        {
          type: "DIVIDER"
        },
        {
          type: "LEAF",
          title: "Designer Resources and Utilities",
          url: "/designer-resources/",
        }
      ]
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