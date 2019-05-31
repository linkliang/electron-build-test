import sys
import os

branch = sys.argv[1]

#git_pull_command = 'git pull origin '+branch
git_clone_command = f"git clone --branch {branch} https://github.com/linkliang/electron-quick-start.git"
os.system(git_clone_command)

with open('package.template.json', 'r') as file:
    data = file.read().replace('{{branch_name}}', branch)
with open('package.json', 'w') as file:
    file.write(data)
    file.close()

build_command = 'npm run publish'
os.system(build_command)