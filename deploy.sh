#! /bin/sh
 
# if [ -n "$GITHUB_TOKEN" ]; then
  mkdir web
  cd web
  git init
  cp -r ../public/* ./
  git add .
  git -c user.name='travis' -c user.email='travis' commit -m "`date +%c` deploy by Travis"
  git push -f -q https://xiguaxigua:$GITHUB_TOKEN@github.com/xiguaxigua/xiguaxigua.github.io master
# fi
