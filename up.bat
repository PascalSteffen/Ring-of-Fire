git add .
git commit -m "%*"
git push
git config git-ftp.syncroot dist/ring-of-fire/
git ftp push
