(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3085],{5380:function(e){function n(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}n.keys=function(){return[]},n.resolve=n,n.id=5380,e.exports=n},7642:function(e,n,t){"use strict";t.d(n,{Z:function(){return _}});var a=t(7462),l=t(3366),r=t(7294),i=t(5742),c=t(9960),s=t(2536),o=t.n(s),m=t(6010),u=t(5999),d=t(3725),f="anchorWithStickyNavbar_mojV",h="anchorWithHideOnScrollNavbar_R0VQ",v=["as","id"],p=["as"];function g(e){var n,t=e.as,i=e.id,c=(0,l.Z)(e,v),s=(0,d.useThemeConfig)().navbar.hideOnScroll;return i?r.createElement(t,(0,a.Z)({},c,{className:(0,m.Z)("anchor",(n={},n[h]=s,n[f]=!s,n)),id:i}),c.children,r.createElement("a",{className:"hash-link",href:"#"+i,title:(0,u.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):r.createElement(t,c)}function E(e){var n=e.as,t=(0,l.Z)(e,p);return"h1"===n?r.createElement("h1",(0,a.Z)({},t,{id:void 0}),t.children):r.createElement(g,(0,a.Z)({as:n},t))}var N="details_BAp3";function C(e){var n=Object.assign({},e);return r.createElement(d.Details,(0,a.Z)({},n,{className:(0,m.Z)("alert alert--info",N,n.className)}))}var Z=["mdxType","originalType"];var _={head:function(e){var n=r.Children.map(e.children,(function(e){return function(e){var n,t;if(null!=e&&null!=(n=e.props)&&n.mdxType&&null!=e&&null!=(t=e.props)&&t.originalType){var a=e.props,i=(a.mdxType,a.originalType,(0,l.Z)(a,Z));return r.createElement(e.props.originalType,i)}return e}(e)}));return r.createElement(i.Z,e,n)},code:function(e){var n=["a","b","big","i","span","em","strong","sup","sub","small"];return r.Children.toArray(e.children).every((function(e){return"string"==typeof e&&!e.includes("\n")||r.isValidElement(e)&&n.includes(e.props.mdxType)}))?r.createElement("code",e):r.createElement(o(),e)},a:function(e){return r.createElement(c.Z,e)},pre:function(e){var n;return r.createElement(o(),(0,r.isValidElement)(e.children)&&"code"===e.children.props.originalType?null==(n=e.children)?void 0:n.props:Object.assign({},e))},details:function(e){var n=r.Children.toArray(e.children),t=n.find((function(e){var n;return"summary"===(null==e||null==(n=e.props)?void 0:n.mdxType)})),l=r.createElement(r.Fragment,null,n.filter((function(e){return e!==t})));return r.createElement(C,(0,a.Z)({},e,{summary:t}),l)},h1:function(e){return r.createElement(E,(0,a.Z)({as:"h1"},e))},h2:function(e){return r.createElement(E,(0,a.Z)({as:"h2"},e))},h3:function(e){return r.createElement(E,(0,a.Z)({as:"h3"},e))},h4:function(e){return r.createElement(E,(0,a.Z)({as:"h4"},e))},h5:function(e){return r.createElement(E,(0,a.Z)({as:"h5"},e))},h6:function(e){return r.createElement(E,(0,a.Z)({as:"h6"},e))}}},6416:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return u}});var a=t(7294),l=t(6010),r=t(7014),i=t(3905),c=t(7642),s=t(4853),o=t(3725),m="mdxPageWrapper_zHyg";function u(e){var n=e.content,t=n.metadata,u=t.title,d=t.description,f=t.permalink,h=t.frontMatter,v=h.wrapperClassName,p=h.hide_table_of_contents;return a.createElement(r.Z,{title:u,description:d,permalink:f,wrapperClassName:null!=v?v:o.ThemeClassNames.wrapper.mdxPages,pageClassName:o.ThemeClassNames.page.mdxPage},a.createElement("main",{className:"container container--fluid margin-vert--lg"},a.createElement("div",{className:(0,l.Z)("row",m)},a.createElement("div",{className:(0,l.Z)("col",!p&&"col--8")},a.createElement(i.Zo,{components:c.Z},a.createElement(n,null))),!p&&n.toc&&a.createElement("div",{className:"col col--2"},a.createElement(s.Z,{toc:n.toc,minHeadingLevel:h.toc_min_heading_level,maxHeadingLevel:h.toc_max_heading_level})))))}},4853:function(e,n,t){"use strict";t.d(n,{Z:function(){return f}});var a=t(7462),l=t(3366),r=t(7294),i=t(6010),c=t(3725),s=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function o(e){var n=e.toc,t=e.className,a=e.linkClassName,l=e.isChild;return n.length?r.createElement("ul",{className:l?void 0:t},n.map((function(e){return r.createElement("li",{key:e.id},r.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),r.createElement(o,{isChild:!0,toc:e.children,className:t,linkClassName:a}))}))):null}function m(e){var n=e.toc,t=e.className,i=void 0===t?"table-of-contents table-of-contents__left-border":t,m=e.linkClassName,u=void 0===m?"table-of-contents__link":m,d=e.linkActiveClassName,f=void 0===d?void 0:d,h=e.minHeadingLevel,v=e.maxHeadingLevel,p=(0,l.Z)(e,s),g=(0,c.useThemeConfig)(),E=null!=h?h:g.tableOfContents.minHeadingLevel,N=null!=v?v:g.tableOfContents.maxHeadingLevel,C=(0,c.useFilteredAndTreeifiedTOC)({toc:n,minHeadingLevel:E,maxHeadingLevel:N}),Z=(0,r.useMemo)((function(){if(u&&f)return{linkClassName:u,linkActiveClassName:f,minHeadingLevel:E,maxHeadingLevel:N}}),[u,f,E,N]);return(0,c.useTOCHighlight)(Z),r.createElement(o,(0,a.Z)({toc:C,className:i,linkClassName:u},p))}var u="tableOfContents_cNA8",d=["className"];function f(e){var n=e.className,t=(0,l.Z)(e,d);return r.createElement("div",{className:(0,i.Z)(u,"thin-scrollbar",n)},r.createElement(m,(0,a.Z)({},t,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}}}]);