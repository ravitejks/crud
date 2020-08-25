@echo Initializing Git Repo...
git init
@echo Adding files...
git add -A
@echo Committing files...
git commit -am "Committing the project files"



@echo Pushing files...
git remote add origin git@github.com:ravitejks/crud.git
git pull https://ravitejks:Mygit124@github.com/ravitejks/crud.git master --allow-unrelated-histories
git push https://ravitejks:Mygit124@github.com/ravitejks/crud.git master
@echo Done
pause