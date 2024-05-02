#!/usr/bin/env bash
# sed -i -r "s/(<\/?[A-Z][a-z]*)([A-Z])/\1.\2/g"  apps/website/src/routes/docs/headless/select/examples/hero.tsx ; git status ; git diff ; git restore .
FILES=$(find apps/website/src/routes/docs/headless)
JSX=$(grep "tsx" <<< $FILES)
PREFIX=$(cut -d "/" -f 7 <<< $JSX)
UNIQS=$(uniq <<< $PREFIX)
for dir in $UNIQS; do
  FORMATTED=${dir^}
  COMPONENT=$(find  "apps/website/src/routes/docs/headless/$dir" | grep "tsx")
  OPENING="s/<($FORMATTED)$/<\1.Root/g"
  $(xargs sed -i -r $OPENING <<< $COMPONENT)
done
# echo $(xargs sed -i -r "s/(<\/?[A-Z][a-z]*)([A-Z])/\1.\2/g" <<< $JSX)
#

# JSX=$(find "packages/kit-headless/src/components/" -type f | grep "tsx")
# echo "$JSX"

