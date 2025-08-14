"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Theme for syntax highlighting

// Import PrismJS Language Support
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

// Import PrismJS Plugins for Copy Button
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/toolbar/prism-toolbar.css";

const RichText = ({ htmlContent }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [htmlContent]);

  return <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default RichText;
