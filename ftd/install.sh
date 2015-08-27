mkdir /usr/local/lib
mkdir /usr/local/include
cp D2XX/bin/10.6/libftd2xx.0.1.7.dylib /usr/local/lib/libftd2xx.0.1.7.dylib
ln -sf /usr/local/lib/libftd2xx.0.1.7.dylib /usr/local/lib/libftd2xx.dylib
cp D2XX/Samples/ftd2xx.h /usr/local/include/ftd2xx.h
cp D2XX/Samples/WinTypes.h /usr/local/include/WinTypes.h
