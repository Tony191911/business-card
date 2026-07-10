# Project Agent Commands

## gitcommit

當使用者在 Codex 聊天室輸入 `gitcommit`、`/gitcommit` 或 `@gitcommit` 時，請執行以下流程。

請只分析目前 Git working tree，不要修改檔案，不要執行 git add，不要執行 git commit。

請查看：

- git status
- git diff --stat
- git diff
- git ls-files --others --exclude-standard

請根據目前 diff 產生 commit 摘要。

輸出格式：

## 變更摘要

用 3～6 點條列說明這次主要改了什麼。

## 建議 commit 拆分

如果適合拆成多個 commit，請拆分。
如果不需要拆，請說明建議一個 commit 即可。

每個 commit 請包含：

1. 目的
2. 包含檔案
3. commit message
4. 對應指令

commit message 請使用 Conventional Commits 格式，例如：

- feat: 新增 XXX
- fix: 修正 XXX
- refactor: 重構 XXX
- style: 調整 XXX 樣式
- chore: 更新 XXX 設定
- docs: 更新 XXX 文件

限制：

- 不要修改任何檔案
- 不要執行 git add
- 不要執行 git commit
- 只產生摘要與建議指令