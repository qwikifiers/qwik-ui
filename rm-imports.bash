#!/usr/bin/env bash
# sed -i -r "s/(<\/?[A-Z][a-z]*)([A-Z])/\1.\2/g"  apps/website/src/routes/docs/headless/select/examples/hero.tsx ; git status ; git diff ; git restore .
FILES=$(find apps/website/src/routes/docs/headless | grep "tsx")
for FILE in $FILES; do
  # LOL=$(grep -n "@qwik-ui/headless" $file )
END=$(grep -n "@qwik-ui/headless" $FILE | cut -d ":" -f 1 )
if [ -z $END ]; then
  # echo "yay $END"
  continue
fi
# echo $END $FILE
HEADER=$(head -n $END $FILE)
STARTS=$(grep -n "import"<<< $HEADER | cut -d ":" -f 1)
LSTART=""
for number in $STARTS; do
  LSTART=$number
done
PREFIX=$(cut -d "/" -f 7 <<< $FILE)
FORMATTED=${PREFIX^}
# ex $FILE << EOT
# $LSTART,${END}d
# 1r import { $FORMATTED } from '@qwik-ui/headless'
# w
# EOT
HELL="${LSTART},${END}d"
HELL2="${LSTART}i import { $FORMATTED } from '@qwik-ui/headless'"
$(xargs sed  -i "$HELL" <<< $FILE)
$(xargs sed -i "$HELL2" <<< $FILE)
 # echo "$HELL2"

done
# echo $(xargs sed -i -r "s/(<\/?[A-Z][a-z]*)([A-Z])/\1.\2/g" <<< $JSX)
#

# JSX=$(find "packages/kit-headless/src/components/" -type f | grep "tsx")
# echo "$JSX"

