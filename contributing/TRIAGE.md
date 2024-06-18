# Triage Guide

Welcome aboard! In this project, we take on bugs and grow enhancements with the expertise of seasoned repo medics.

Our goal is to keep Qwik UI in top shape, ensure the project runs seamlessly, and have a blast while doing it.

## Note about tags prefixes:

1. **STATUS-1**: The initial `needs triage` gets automatically added to newly created issues
2. **STATUS-2**: A "waiting for someone/something" status.
3. **STATUS-3**: The final state of an issue. This is a "resolution" status.

---

👇 _Inspiration for the diagrams below came from the Vite project_

## Bug Triaging Process

Our bug triaging process ensures that every reported issue gets the proper attention it needs. We sort, prioritize, and assign bugs to the right team members for swift resolution.

Here's how we handle bug reports in the Qwik UI repository:

```mermaid
flowchart TD
    start{Missing information?}
    start --YES--> close1[Tag with\n'STATUS-2: missing info'\n\nBot will auto close if\n no update for 14 days]
    start --NO--> dupe{Is duplicate?}
    dupe --YES--> close2[Close, point to duplicate\n and tag with\n'STATUS-3: duplication']
    dupe --NO--> repro{Has proper\nreproduction?}
    repro --NO--> close3[Tag with\n 'STATUS-2: needs reproduction'\nBot will auto close if \nno update for 14 days]
    repro --YES--> real{Is actually a bug?}
    real --NO--> intended{Is the intended\nbehaviour?}
    intended --YES--> explain[Explain and close.\nPoint to docs if needed.\nTag with\n'STATUS-3: works as expected']
    intended --NO--> open[Tag with\n'STATUS-2: requires discussion'\nand either\n'WAITING FOR: team'\n'WAITING FOR: user']
    real --YES--> real2["1. Tag with 'STATUS-2: team is working on this'\n2. Add related feature label if\napplicable (e.g. 'PKG: headless')\n3. Add priority labels (see below)"]
    real2 --> unusable{Does the\nbug make Qwik UI\nunusable?}
    unusable --YES--> maj{Does the bug\naffect the majority\nof Qwik UI users?}
    maj --YES--> P4[P4: urgent]
    maj --NO--> P3[P3: important]
    unusable --NO--> workarounds{Are there\nworkarounds for\nthe bug?}
    workarounds --NO--> P2[P2: minor]
    workarounds --YES--> P1[P1: nice to have / fix]
```

---

## Enhancement Triaging Process

Got a fantastic new feature idea or a brilliant improvement to enhance Qwik UI?

We're here to ensure these enhancements are thoroughly evaluated, prioritized, and brought to life.

The team prioritizes work based on the number of 👍 votes from the community on each issue.

Now, let's dive into how we manage enhancement requests in the Qwik UI repository:

```mermaid
flowchart TD
    start{Missing information?}
    start --YES--> close1[Tag with\n'STATUS-2: missing info'\n\nBot will auto close if\n no update for 14 days]
    start --NO--> dupe{Is duplicate?}
    dupe --YES--> close2[Close, point to duplicate\n and tag with\n'STATUS-3: duplication']
    dupe --NO--> discussion{Requires further\ndiscussion?}
    discussion --YES--> close3[Tag with\n 'STATUS-2: requires discussion'\nand 'WAITING FOR: team'\nor 'WAITING FOR: user']
    discussion --NO--> implement{Should it be\nimplemented by core?}
    implement --NO--> community{Should it be implemented\nby the community?}
    community --YES--> incubate[Close and tag with either\n'STATUS-3: incubation'\nor 'STATUS-2: waiting for community PR'\nand 'COMMUNITY: PR is welcomed']
    community --NO--> wontfix[Close and tag with\n'STATUS-3: won't be worked on']
    implement --YES--> doimplement["1. Tag with 'STATUS-2: team is working on this'\n2. Add related feature label if\napplicable (e.g. 'COMP: runtime')\n3. Add version \nlabels (e.g. 'VERSION: upcoming major')"]
```

## Thank You!

To all our incredible contributors, thank you! Your enthusiasm and hard work keep Qwik UI moving forward with fresh ideas and improvements. We're grateful for every bit of effort you put in 🫶

Together, we're building something special. Let's keep up the momentum and continue making Qwik UI better every day!
