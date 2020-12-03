---
slug: "demo-post"
author: "Ben Doyle"
date: "2020-12-2"
title: "Demo post"
---

Demo Blog Post
==============

This is a demonstration of writing a **blog post** in [markdown][0].

Steps remaining
---------------

### Technical

1. Write a demo post --- here it is!
2. Add a submodule to the website repo, pointing at *this* repo
3. Figure out how to get Gatsby to build markdown files as blog posts. Someone's done this, surely?
4. Figure out how to create a github hook that pulls and rebuilds the website master repo whenever there's
   a new commit on the publish branch of the content repo

### Social
1. Test out the GUI on github for making new posts
2. Write some documentation
3. Give Katherine a walkthrough

Some notes on Markdown
----------------------
The Daring Fireball page is the easiest and most readable overview, but we actually want to use
[Pandoc-flavored Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown).

> Pandoc understands an extended and slightly revised version of John Gruber’s Markdown syntax. This document
> explains the syntax, noting differences from standard Markdown. Except where noted, these differences can be 
> suppressed by using the markdown_strict format instead of markdown. Extensions can be enabled or disabled to 
> specify the behavior more granularly. They are described in the following. See also Extensions above, for 
> extensions that work also on other formats.

Although --- actually that's a lie! We're using Gatsby, so we're using remark, so we're using whatever that 
understands.

[0]: https://daringfireball.net/projects/markdown/syntax
