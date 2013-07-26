install:
	git clone git://github.com/docpad/twitter-bootstrap.docpad.git;
	cd twitter-bootstrap.docpad;
	npm install;
update:
	cd twitter-bootstrap.docpad;
	git pull;
test:
	echo "uh-oh, there are no tests!"
start:
	docpad run;
	#echo "If you are on Mac OS, right click and select Open URL: http://localhost:9778/"
