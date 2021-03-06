echo "<BODY>" > index.html
for i in testimages/*.JPG
do
    echo $i
    basename $i
    base=`basename $i`
    exiftool $i | tee output/$base.txt | fgrep "Subject  " | echo `sed "s/.*: //"` ":" $i | tee keytmp$$ >>output/KeywordDB
    exiftool -b -IgnoreMinorErrors -PreviewImage $i | ./rmleadingzeros  >output/preview-$base
    exiftool -b -ThumbnailImage $i >output/thumb-$base
    echo "<IMG src='output/thumb-$base'><BR>" `cat keytmp$$` "<BR>" >> index.html
    echo "<A HREF='output/preview-$base'>Preview</A>" >>index.html
    echo "- <A HREF='output/$base.txt'>EXIF info</A><P>" >> index.html
done

echo "</BODY>" >> index.html


