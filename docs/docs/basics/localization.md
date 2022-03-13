---
sidebar_position: 5
---


# Localization

Support for languages:
- english (en)
- deutsch (de)
- spanish (es)
- french (fr)
- portuguese Brazil (ptBR)
- russian (ru)
- chinese (zh)

Usage:
Pass prop language to Kalend
```
<Kalend
...
language={'de'}
/>
```
You can include your own translation with prop customLanguage. Create json locale file and import it to Kalend

```
import cz from 'cz.json'

<Kalend
...
customLanguage={cz}
/>
```
