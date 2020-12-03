---
slug: blog/gui-demo.md
title: Writing with the Github GUI
author: Ben Doyle
---

Writing with the github GUI
===========================

Testing out what it looks like to write with the Github GUI, for people who might not feel like going all the
way to a more developer-esque workflow.

This is a worse writing experience, but it avoids:
- Needing to set up git on one's local machine
- Any command-line knowledge
- worrying about how to clone repos and all that
- needing a nice text editor, explaining that stuff like word doesn't qualify

One thing I'm intentionally doing wrong here: I'm commiting directly to the `publish` branch. Once
we get rolling, we'll want to never do that --- commits to `publish` will fire off the auto-rebuild
machinery that updates the actual physical site, so we'll almost always want things to go to somewhere like `drafts` first.
