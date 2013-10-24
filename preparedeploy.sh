if [ ! -d "/Volumes/guld" ]; then
  # Control will enter here if $DIRECTORY exists.
  mkdir "/volumes/guld"
  echo "Created directory"
else
	echo "Directory exists"
fi

if mount | grep /Volumes/guld > /dev/null; then
    echo "Already mounted"
else
    mount -t smbfs //guld.iteam.local/wwwroot /volumes/guld
    echo "Mount complete"
fi