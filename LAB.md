# מעבדה 5: Events ו-Triggers מתקדמים ב-GitHub Actions

## מטרה

במעבדה זו תכתבו workflow ב-GitHub Actions שמדגים שימוש מתקדם ב-events ו-triggers.
תלמדו כיצד לשלוט בדיוק *מתי* ו-*על מה* ה-pipeline שלכם יופעל — לפי branch, לפי path, לפי סוג האירוע, ועוד.

בסיום המעבדה, ה-workflow שלכם יתמוך ב:
- הפעלה אוטומטית על push ועל pull_request עם סינון מדויק
- הפעלה ידנית עם `workflow_dispatch`
- ביטול ריצות מקבילות (`concurrency`)
- דילוג על ריצות עם `[skip ci]`
- matrix של גרסאות Node.js

---

## רקע תיאורטי

### push event

האירוע `push` מופעל כאשר קוד נדחף (push) ל-repository.  
ניתן לסנן לפי branches ו-paths:

```yaml
on:
  push:
    branches:
      - main
      - develop
    paths:
      - 'src/**'
      - 'tests/**'
```

> **שימו לב:** אם `paths` מוגדר — הריצה תופעל **רק** אם לפחות קובץ אחד מהנתיבים שצוינו השתנה.

---

### pull_request event

האירוע `pull_request` מופעל בעת פתיחת PR, עדכון שלו, או sync.  
ניתן לסנן לפי ה-branch שאליו מכוון ה-PR (`base branch`):

```yaml
on:
  pull_request:
    branches:
      - main
```

---

### workflow_dispatch event

מאפשר הפעלה ידנית של ה-workflow דרך ה-UI של GitHub או דרך ה-API.  
ניתן להוסיף `inputs` שהמשתמש ממלא לפני ההפעלה:

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Target environment'
        required: true
        default: 'staging'
```

---

### סינון לפי branches ו-paths

| סינון | מה הוא עושה |
|-------|------------|
| `branches` | מגביל ל-branches ספציפיים בלבד |
| `branches-ignore` | מוציא branches ספציפיים |
| `paths` | מפעיל רק אם קבצים בנתיב זה השתנו |
| `paths-ignore` | מדלג אם רק קבצים אלו השתנו |

---

### concurrency וביטול ריצות

`concurrency` מאפשר לשלוט בריצות מקבילות של אותו workflow.  
שימוש ב-`cancel-in-progress: true` מבטל ריצה ישנה כשמגיעה חדשה:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

---

### דילוג על ריצות עם [skip ci]

GitHub מזהה אוטומטית את המחרוזת `[skip ci]` (או `[ci skip]`) בהודעת ה-commit.  
אם היא קיימת, ה-workflow **לא יופעל כלל** — גם אם ה-trigger אחר אמור לפעול.

```bash
git commit -m "fix typo in README [skip ci]"
```

---

## מה יש לכם

פרויקט Node.js פשוט עם:

```
src/
  calculator.js   — פונקציות: add, subtract, multiply, divide
  validator.js    — עזרי ולידציה: isNumber, isNonZero
tests/
  calculator.test.js  — בדיקות Jest לכל הפונקציות
package.json        — "test": "jest"
```

הרצה מקומית:

```bash
npm install
npm test
```

כל הבדיקות אמורות לעבור ✅

---

## הוראות המעבדה

1. **צרו את תיקיית ה-workflow:**
   ```
   .github/workflows/ci.yml
   ```

2. **הגדירו את ה-triggers** — ה-workflow יופעל על:
   - `push` ל-`main` ו-`develop` בלבד
   - `pull_request` שמכוון ל-`main`
   - `workflow_dispatch` עם input בשם `environment`
   
3. **הוסיפו סינון paths** — הפעילו את ה-workflow רק כשקבצים ב-`src/**` או `tests/**` השתנו

4. **הוסיפו concurrency** — בטלו ריצות ישנות כשמגיעה ריצה חדשה על אותו branch

5. **הגדירו job עם matrix** על גרסאות Node.js 18 ו-20

6. **ב-steps של ה-job:**
   - Checkout קוד
   - Setup Node.js (עם הגרסה מה-matrix)
   - `npm ci`
   - `npm test`

7. **בדקו skip CI** — צרו commit עם `[skip ci]` בהודעה ווידאו שה-workflow לא הופעל

---

## קריטריוני הצלחה

ה-workflow שתכתבו חייב לעמוד בכל הדרישות הבאות:

- [ ] מופעל על `push` ל-`main` ו-`develop` בלבד (branch filter)
- [ ] מופעל על `pull_request` שמכוון ל-`main`
- [ ] מכיל `workflow_dispatch` עם input בשם `environment` (required, default: `staging`)
- [ ] מסנן paths — מופעל רק כשקבצים ב-`src/**` או `tests/**` השתנו
- [ ] משתמש ב-`actions/setup-node@v4` (גרסה pinned)
- [ ] מריץ `npm ci` ואז `npm test`
- [ ] מגדיר `concurrency` עם `cancel-in-progress: true`
- [ ] commit עם `[skip ci]` — ה-workflow לא מופעל
- [ ] matrix של Node.js גרסאות 18 ו-20

---

## רמזים (Hints)

**Hint 1 — מבנה ה-`on:` block:**  
אפשר לרשום מספר events תחת `on:`. לכל event יכולים להיות filters שונים. בדקו אם `paths` תחת `push` ו-`pull_request` יכולים להיות זהים.

**Hint 2 — concurrency group:**  
שדה `group` צריך לזהות ריצות על אותו branch. השתמשו ב-`github.workflow` ו-`github.ref` — `${{ github.workflow }}-${{ github.ref }}` נותן מזהה ייחודי לכל workflow+branch.

**Hint 3 — matrix + setup-node:**  
כשמגדירים matrix, ניתן לגשת לערך הנוכחי בתוך step בעזרת `${{ matrix.<name> }}`. העבירו את גרסת Node.js ל-`actions/setup-node@v4` דרך `with.node-version`.

**Hint 4 — npm ci vs npm install:**  
`npm ci` דורש קובץ `package-lock.json`. אם הוא לא קיים ב-repo, צרו אותו מקומית עם `npm install` ועשו commit.

---

## משאבים

- [GitHub Docs: Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
- [GitHub Docs: Workflow syntax — on](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on)
- [GitHub Docs: Using concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency)
- [actions/setup-node](https://github.com/actions/setup-node)
- [Skipping workflow runs](https://docs.github.com/en/actions/managing-workflow-runs/skipping-workflow-runs)
