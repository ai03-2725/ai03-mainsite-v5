export type NavEntry = {
  type: "LEAF";
  title: string;
  url: string;
} | {
  type: "LIST";
  title: string;
  children: NavEntry[];
}

// For desktop, truncate at 4 first entries at top + rest as a dropdown under "Other"
export const NAV_ENTRIES_ROOT: NavEntry = {

  type: "LIST",
  title: "",
  children: [

    // Projects
    // -> Portfolio, single link
    {
      type: "LEAF",
      title: "Projects",
      url: "/collections/",
    },
    // Info
    // - Project Status and Updates
    // - Build Guides, Resources, and Downloads
    {
      type: "LIST",
      title: "Info",
      children: [
        {
          type: "LEAF",
          title: "Project updates",
          url: "/status/"
        },
        {
          type: "LEAF",
          title: "Build guides, downloads",
          url: "/resources/"
        },
      ]
    },
    // News
    // - Announcements
    // - Blog
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
        }
      ]
    },
    // Social
    {
      type: "LEAF",
      title: "Social",
      url: "/social/"
    },
    // Other
    // - Designer Resources
    //   - Atelier
    //   - Plate Generator
    {
      type: "LIST",
      title: "Other",
      children: [
        {
          type: "LIST",
          title: "Designer Resources",
          children: [
            {
              type: "LEAF",
              title: "Atelier",
              url: "https://kbatelier.org/"
            },
            {
              type: "LEAF",
              title: "Plate Generator",
              url: "https://kbplate.ai03.com/"
            }
          ]
        },
        // - Contact
        //   - Commissions
        //   - Contact Form
        {
          type: "LIST",
          title: "Contact",
          children: [
            {
              type: "LEAF",
              title: "Commissions",
              url: "/commissions/"
            },
            {
              type: "LEAF",
              title: "Contact Form",
              url: "/contact/"
            }
          ]
        },
        // - About
        {
          type: "LEAF",
          title: "About",
          url: "/about/"
        }
      ]
    },
  ]
}