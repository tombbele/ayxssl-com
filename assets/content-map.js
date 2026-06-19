// assets/content-map.js

const contentRegistry = {
  site: "https://ayxssl.com",
  sections: [
    {
      id: "home",
      title: "首页",
      tags: ["ayx", "首页", "导航"],
      items: [
        { title: "欢迎页", link: "/", keywords: ["ayx", "welcome"] },
        { title: "最新公告", link: "/news", keywords: ["ayx", "news"] }
      ]
    },
    {
      id: "docs",
      title: "文档中心",
      tags: ["ayx", "文档", "指南"],
      items: [
        { title: "快速入门", link: "/docs/quickstart", keywords: ["ayx", "start"] },
        { title: "API参考", link: "/docs/api", keywords: ["ayx", "api"] },
        { title: "常见问题", link: "/docs/faq", keywords: ["ayx", "faq", "help"] }
      ]
    },
    {
      id: "blog",
      title: "博客",
      tags: ["ayx", "博客", "技术"],
      items: [
        { title: "JavaScript技巧", link: "/blog/js-tips", keywords: ["ayx", "js"] },
        { title: "CSS布局", link: "/blog/css-layout", keywords: ["ayx", "css"] },
        { title: "性能优化", link: "/blog/perf", keywords: ["ayx", "perf"] }
      ]
    },
    {
      id: "community",
      title: "社区",
      tags: ["ayx", "社区", "讨论"],
      items: [
        { title: "论坛", link: "/community/forum", keywords: ["ayx", "forum"] },
        { title: "贡献指南", link: "/community/contribute", keywords: ["ayx", "contribute"] }
      ]
    }
  ],

  getAllTags: function() {
    const tagSet = new Set();
    this.sections.forEach(section => {
      section.tags.forEach(tag => tagSet.add(tag));
      section.items.forEach(item => {
        item.keywords.forEach(kw => tagSet.add(kw));
      });
    });
    return Array.from(tagSet);
  },

  searchByKeyword: function(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results = [];
    this.sections.forEach(section => {
      section.items.forEach(item => {
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchKeywords = item.keywords.some(kw => kw.toLowerCase().includes(q));
        const matchSection = section.title.toLowerCase().includes(q);
        if (matchTitle || matchKeywords || matchSection) {
          results.push({
            section: section.title,
            title: item.title,
            link: item.link,
            matched: q
          });
        }
      });
    });
    return results;
  },

  filterByTag: function(tag) {
    const t = tag.toLowerCase();
    return this.sections
      .filter(s => s.tags.some(st => st.toLowerCase() === t))
      .flatMap(s => s.items.map(item => ({
        section: s.title,
        title: item.title,
        link: item.link
      })));
  },

  getSectionById: function(id) {
    return this.sections.find(s => s.id === id) || null;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = contentRegistry;
}