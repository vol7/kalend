---
sidebar_position: 1
---

# Tips

Kalend should have no problem processing few hundred events loaded at once, but if you experience any performance issues, you can try more two more advanced methods described here.

**1. Pre-calculating layouts on server**

For layout calculations, Kalend uses separate package "kalend-layout", which can be used to pre-calculate layouts directly on the server. This could offset some load from your app, which could just load event layouts directly. Using this technic, you can even cache pages in advance.

Read more with examples  [here](pre-calculations)

**2. Using web worker**

_Web worker is currently in testing phase and will be released soon in one of the next versions._

Calculating event layouts for hundred of events could be resource heavy especially on slower hardware. This could result in "browser freeze" until calculations are finished. With moving calculations to web worker you can free render thread.

It won't mean that events will processed faster, but user won't be blocked waiting for the result and could for example navigate without problems across calendar pages.
