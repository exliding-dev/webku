"use client";

import { useMemo } from "react";

interface LexicalNode {
  type: string;
  tag?: string;
  format?: number | string;
  text?: string;
  children?: LexicalNode[];
  listType?: string;
  value?: number;
  url?: string;
  newTab?: boolean;
  fields?: {
    url?: string;
    newTab?: boolean;
    linkType?: string;
  };
  direction?: string;
  indent?: number;
  version?: number;
}

interface LexicalContent {
  root?: {
    children?: LexicalNode[];
  };
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  if (node.type === "text") {
    let content: React.ReactNode = node.text || "";

    // Handle text formatting (bold, italic, etc.)
    const format = typeof node.format === "number" ? node.format : 0;
    if (format & 1) content = <strong key={`b-${index}`}>{content}</strong>;
    if (format & 2) content = <em key={`i-${index}`}>{content}</em>;
    if (format & 8) content = <u key={`u-${index}`}>{content}</u>;
    if (format & 4)
      content = (
        <s key={`s-${index}`}>{content}</s>
      );
    if (format & 16)
      content = (
        <code
          key={`c-${index}`}
          className="bg-brutal-accent/30 px-1.5 py-0.5 brutal-border text-sm font-mono"
        >
          {content}
        </code>
      );

    return content;
  }

  const children = node.children?.map((child, i) => renderNode(child, i));

  switch (node.type) {
    case "paragraph":
      return <p key={index}>{children}</p>;

    case "heading": {
      const tag = node.tag || "h2";
      if (tag === "h1") return <h1 key={index}>{children}</h1>;
      if (tag === "h3") return <h3 key={index}>{children}</h3>;
      if (tag === "h4") return <h4 key={index}>{children}</h4>;
      if (tag === "h5") return <h5 key={index}>{children}</h5>;
      if (tag === "h6") return <h6 key={index}>{children}</h6>;
      return <h2 key={index}>{children}</h2>;
    }

    case "list":
      if (node.listType === "number") {
        return <ol key={index}>{children}</ol>;
      }
      return <ul key={index}>{children}</ul>;

    case "listitem":
      return <li key={index}>{children}</li>;

    case "link":
    case "autolink": {
      const url = node.fields?.url || node.url || "#";
      const isNewTab = node.fields?.newTab ?? node.newTab ?? false;
      return (
        <a
          key={index}
          href={url}
          target={isNewTab ? "_blank" : undefined}
          rel={isNewTab ? "noopener noreferrer" : undefined}
          className="text-primary font-bold underline decoration-2 underline-offset-4 hover:bg-primary hover:text-primary-foreground transition-colors px-0.5"
        >
          {children}
        </a>
      );
    }

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-primary pl-4 italic font-bold text-foreground/70"
        >
          {children}
        </blockquote>
      );

    case "horizontalrule":
      return (
        <hr
          key={index}
          className="border-t-4 border-brutal-border my-8"
        />
      );

    case "linebreak":
      return <br key={index} />;

    default:
      // Fallback: render children if any
      if (children && children.length > 0) {
        return <div key={index}>{children}</div>;
      }
      return null;
  }
}

export default function PayloadRichText({ content }: { content: string }) {
  const rendered = useMemo(() => {
    if (!content) return null;

    try {
      const parsed: LexicalContent = JSON.parse(content);
      const rootChildren = parsed.root?.children;

      if (!rootChildren || !Array.isArray(rootChildren)) {
        return <p>{content}</p>;
      }

      return rootChildren.map((node, index) => renderNode(node, index));
    } catch {
      // If it's not valid JSON, render as plain text
      return <p>{content}</p>;
    }
  }, [content]);

  return <div className="prose-brutal">{rendered}</div>;
}
